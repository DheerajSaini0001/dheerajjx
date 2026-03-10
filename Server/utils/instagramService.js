const axios = require('axios');
const InstagramPost = require('../models/InstagramPost');

const API_VERSION = process.env.INSTAGRAM_API_VERSION || 'v18.0';
const BASE_URL = `https://graph.instagram.com/${API_VERSION}`;
const FIELDS = 'id,caption,media_url,media_type,permalink,timestamp,thumbnail_url';
const MAX_POSTS = parseInt(process.env.MAX_POSTS_PER_POLL) || 25;

// In-memory cache for the feed API
let feedCache = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

// Track last sync time
let lastSyncTime = null;
let lastSyncStatus = 'idle';

/**
 * Fetch media from the Instagram Graph API
 */
const fetchInstagramMedia = async () => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!token) {
        console.error('[Instagram] No access token configured. Set INSTAGRAM_ACCESS_TOKEN in .env');
        return [];
    }

    try {
        const url = `${BASE_URL}/me/media`;
        const response = await axios.get(url, {
            params: {
                fields: FIELDS,
                limit: MAX_POSTS,
                access_token: token
            },
            timeout: 15000
        });

        if (response.data && response.data.data) {
            return response.data.data;
        }

        console.warn('[Instagram] Unexpected API response structure:', JSON.stringify(response.data).substring(0, 200));
        return [];
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const errData = error.response.data?.error || {};

            if (status === 429) {
                console.error('[Instagram] Rate limited (HTTP 429). Will retry with backoff.');
                throw new Error('RATE_LIMITED');
            }

            if (status === 190 || errData.code === 190) {
                console.error('[Instagram] Access token expired or invalid. Please refresh the token.');
                throw new Error('TOKEN_EXPIRED');
            }

            console.error(`[Instagram] API Error ${status}:`, errData.message || error.message);
        } else {
            console.error('[Instagram] Network error:', error.message);
        }
        throw error;
    }
};

/**
 * Sync Instagram posts to the database (upsert logic)
 * Returns: { newPosts: number, totalFetched: number }
 */
const syncInstagramPosts = async () => {
    console.log(`[Instagram Sync] Starting poll at ${new Date().toISOString()}`);
    lastSyncStatus = 'running';

    try {
        const mediaPosts = await fetchInstagramMedia();

        if (!mediaPosts.length) {
            console.log('[Instagram Sync] No posts returned from API.');
            lastSyncTime = new Date();
            lastSyncStatus = 'synced';
            return { newPosts: 0, totalFetched: 0 };
        }

        let newPostCount = 0;

        for (const post of mediaPosts) {
            try {
                const result = await InstagramPost.findOneAndUpdate(
                    { instagramId: post.id },
                    {
                        $setOnInsert: {
                            instagramId: post.id,
                            fetchedAt: new Date(),
                            isDisplayed: true,
                            syncStatus: 'synced'
                        },
                        $set: {
                            caption: post.caption || null,
                            mediaUrl: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
                            mediaType: post.media_type,
                            permalink: post.permalink,
                            timestamp: new Date(post.timestamp)
                        }
                    },
                    { upsert: true, new: true, rawResult: true }
                );

                if (result.lastErrorObject && !result.lastErrorObject.updatedExisting) {
                    newPostCount++;
                    console.log(`[Instagram Sync] New post detected: ${post.id} — "${(post.caption || '').substring(0, 50)}"`);
                }
            } catch (dbError) {
                console.error(`[Instagram Sync] DB error for post ${post.id}:`, dbError.message);
            }
        }

        // Invalidate cache when new posts arrive
        if (newPostCount > 0) {
            feedCache = null;
            cacheTimestamp = 0;
        }

        lastSyncTime = new Date();
        lastSyncStatus = 'synced';

        console.log(`[Instagram Sync] Completed — ${newPostCount} new, ${mediaPosts.length} total fetched.`);
        return { newPosts: newPostCount, totalFetched: mediaPosts.length };

    } catch (error) {
        lastSyncStatus = 'error';
        lastSyncTime = new Date();

        if (error.message === 'RATE_LIMITED') {
            console.error('[Instagram Sync] Rate limited. Will retry next cycle with backoff.');
        } else if (error.message === 'TOKEN_EXPIRED') {
            console.error('[Instagram Sync] Token expired. Automatic refresh needed.');
        }

        return { newPosts: 0, totalFetched: 0, error: error.message };
    }
};

/**
 * Refresh the long-lived access token
 * Should be called periodically (every ~45 days) to prevent token expiry
 */
const refreshAccessToken = async () => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!token) {
        console.error('[Instagram Token] No access token to refresh.');
        return null;
    }

    try {
        const response = await axios.get(`${BASE_URL}/refresh_access_token`, {
            params: {
                grant_type: 'ig_refresh_token',
                access_token: token
            },
            timeout: 15000
        });

        if (response.data && response.data.access_token) {
            console.log('[Instagram Token] Token refreshed successfully. Expires in:', response.data.expires_in, 'seconds');
            // Note: In production, persist this to a secrets manager or DB
            // For now, log for manual update
            console.log('[Instagram Token] NEW TOKEN (update .env):', response.data.access_token.substring(0, 20) + '...');
            return response.data;
        }
    } catch (error) {
        console.error('[Instagram Token] Refresh failed:', error.response?.data || error.message);
        return null;
    }
};

/**
 * Get feed data with in-memory caching
 */
const getCachedFeed = async (limit = 12, offset = 0, type = null) => {
    const now = Date.now();

    // Check cache validity
    if (feedCache && (now - cacheTimestamp) < CACHE_TTL_MS && !type && offset === 0 && limit <= 12) {
        return feedCache;
    }

    // Build query
    const query = { isDisplayed: true };
    if (type) {
        query.mediaType = type;
    }

    const [posts, total] = await Promise.all([
        InstagramPost.find(query)
            .sort({ timestamp: -1 })
            .skip(offset)
            .limit(limit)
            .lean(),
        InstagramPost.countDocuments(query)
    ]);

    const result = {
        success: true,
        data: posts.map(p => ({
            id: p.instagramId,
            caption: p.caption,
            media_url: p.mediaUrl,
            media_type: p.mediaType,
            permalink: p.permalink,
            timestamp: p.timestamp
        })),
        meta: {
            total,
            limit,
            offset
        }
    };

    // Cache only default queries
    if (!type && offset === 0 && limit <= 12) {
        feedCache = result;
        cacheTimestamp = now;
    }

    return result;
};

/**
 * Get health/status info
 */
const getHealthInfo = async () => {
    const postsCount = await InstagramPost.countDocuments();

    return {
        status: lastSyncStatus === 'error' ? 'degraded' : 'ok',
        last_sync: lastSyncTime ? lastSyncTime.toISOString() : null,
        sync_status: lastSyncStatus,
        posts_count: postsCount,
        cache_active: feedCache !== null,
        poll_interval_minutes: parseInt(process.env.POLL_INTERVAL_MINUTES) || 5
    };
};

module.exports = {
    fetchInstagramMedia,
    syncInstagramPosts,
    refreshAccessToken,
    getCachedFeed,
    getHealthInfo
};
