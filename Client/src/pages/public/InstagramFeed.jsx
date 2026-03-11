import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSEO from '../../utils/useSEO';

const API_BASE = 'http://localhost:201';

// Lightbox Modal
const InstagramLightbox = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-[120] w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full flex flex-col md:flex-row bg-gray-950 rounded-2xl overflow-hidden border border-white/10 max-h-[90vh]"
            >
                {/* Image */}
                <div className="md:w-2/3 bg-black flex items-center justify-center">
                    <img
                        src={post.media_url}
                        alt={post.caption || 'Instagram post'}
                        className="w-full h-full object-contain max-h-[80vh]"
                    />
                </div>

                {/* Details */}
                <div className="md:w-1/3 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                    <div>
                        {/* Instagram Logo */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <span className="text-white/70 text-sm font-medium">@dheerajj.x</span>
                        </div>

                        {/* Caption */}
                        {post.caption && (
                            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                                {post.caption}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                        {/* Timestamp */}
                        <p className="text-white/30 text-xs font-mono">
                            {new Date(post.timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>

                        {/* View on Instagram */}
                        <a
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                        >
                            View on Instagram
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.aside>
    );
};

const InstagramFeed = () => {
    useSEO(
        "Instagram Feed Integration | Live Updates by Dheerajj.x",
        "Experience the real-time visual updates from Dheerajj.x. A seamlessly synced Instagram feed displaying the latest moments, dark vibes, and photography.",
        {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Live Instagram Feed | Dheerajj.x",
            "description": "Experience the real-time visual updates from Dheerajj.x. A seamlessly synced Instagram feed displaying the latest moments, dark vibes, and photography."
        }
    );
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);
    const [activeTab, setActiveTab] = useState('All');
    const limit = 12;

    const fetchFeed = useCallback(async (currentOffset = 0) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/api/feed?limit=${limit}&offset=${currentOffset}`);
            const data = await res.json();

            if (data.success) {
                if (currentOffset === 0) {
                    setPosts(data.data);
                } else {
                    setPosts(prev => [...prev, ...data.data]);
                }
                setTotal(data.meta.total);
                setError(null);
            } else {
                setError('Failed to load Instagram feed');
            }
        } catch (err) {
            console.error('Feed fetch error:', err);
            setError('Unable to connect to the server');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeed(0);

        // Auto-refresh every 5 minutes (SRS: FR-FE-01)
        const refreshInterval = setInterval(() => {
            fetchFeed(0);
        }, 5 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [fetchFeed]);

    const loadMore = () => {
        const newOffset = offset + limit;
        setOffset(newOffset);
        fetchFeed(newOffset);
    };

    const formatTimeAgo = (dateStr) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const truncateCaption = (text, maxLen = 120) => {
        if (!text) return '';
        if (text.length <= maxLen) return text;
        return text.substring(0, maxLen).trim() + '...';
    };

    const tabs = ['All', 'Photos', 'Videos', 'Carousels'];
    const filteredPosts = posts.filter(post => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Photos') return post.media_type === 'IMAGE';
        if (activeTab === 'Videos') return post.media_type === 'VIDEO';
        if (activeTab === 'Carousels') return post.media_type === 'CAROUSEL_ALBUM';
        return true;
    });

    return (
        <article className="min-h-screen bg-gray-50 dark:bg-[#030303] text-gray-900 dark:text-white pt-28 pb-32 overflow-hidden selection:bg-pink-500/30">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-gradient-to-br from-pink-500/8 to-purple-500/8 dark:from-pink-500/5 dark:to-purple-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[40%] bg-gradient-to-tr from-orange-400/8 to-yellow-400/8 dark:from-orange-400/5 dark:to-yellow-400/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-24"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 dark:border-white/10 pb-10">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: '40px' }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-[2px] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
                            />
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                                <span className="text-gray-900 dark:text-white">Insta</span>
                                <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
                                    gram.
                                </span>
                            </h1>
                        </div>

                        <div className="max-w-sm">
                            <p className="text-gray-500 dark:text-gray-400 md:text-right font-light leading-relaxed mb-4">
                                Welcome to my fully synced, real-time visual journal. This is not just another social media feed; it is a meticulously curated digital window into my daily creative process. Every single post, story, and visual experiment is automatically synchronized directly from my active Instagram profile. I designed this specific integration to break down the barrier between my personal social channels and my professional portfolio. 
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 md:text-right font-light leading-relaxed">
                                Here, you will find an unfiltered look at my aesthetic evolution. From moody, dark-mode architectural shots to candid glimpses of my workspace, this feed serves as a dynamic, ever-changing mood board. It reflects my ongoing dedication to mastering visual composition, understanding complex lighting dynamics, and capturing the fleeting essence of modern life. I invite you to explore these squares not just as isolated photographs, but as connected pieces of a much larger, ongoing narrative. Social media is often criticized for its superficiality, but when used intentionally, it becomes a incredibly powerful medium for genuine artistic expression and honest global connection.
                            </p>
                            <div className="md:text-right mt-4">
                                <a
                                    href="https://instagram.com/dheerajj.x"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors text-sm font-medium"
                                >
                                    <span>@dheerajj.x</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Animated Instagram Categories Tabs */}
                {posts.length > 0 && (
                    <nav aria-label="Instagram Tabs" className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-12 p-1.5 rounded-full bg-gray-200/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 w-fit mx-auto md:mx-0 shadow-inner">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-6 py-2.5 outline-none rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                                    activeTab === tab
                                        ? 'text-white'
                                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="insta-tab"
                                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-md shadow-pink-500/30"
                                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </nav>
                )}

                {/* Error State */}
                {error && !loading && posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-32"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-pink-500/10 flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-pink-500">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="text-gray-400 dark:text-white/40 text-lg font-medium mb-2">Feed Not Available</p>
                        <p className="text-gray-400 dark:text-white/30 text-sm max-w-md mx-auto">
                            The Instagram feed is being set up. Posts will appear here automatically once the connection is configured.
                        </p>
                    </motion.div>
                )}

                {/* Loading State */}
                {loading && posts.length === 0 && (
                    <div className="flex justify-center items-center py-32">
                        <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
                    </div>
                )}

                {/* Feed Grid Responsive */}
                {posts.length > 0 && (
                    <motion.section
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post, index) => (
                                <motion.article
                                    layout
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => setSelectedPost(post)}
                                    className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-pink-500/10 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-white/5">
                                        <img
                                            src={post.media_url}
                                            alt={post.caption || 'Instagram post'}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                            loading="lazy"
                                        />

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Media type badge */}
                                        {post.media_type === 'VIDEO' && (
                                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-black/40">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            </div>
                                        )}
                                        {post.media_type === 'CAROUSEL_ALBUM' && (
                                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-black/40">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                    <rect x="2" y="2" width="16" height="16" rx="2" />
                                                    <rect x="6" y="6" width="16" height="16" rx="2" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Hover info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
                                                {truncateCaption(post.caption, 100) || 'View post'}
                                            </p>
                                        </div>

                                        {/* Center expand icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-300">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Caption + Meta */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        {post.caption && (
                                            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                                                {truncateCaption(post.caption, 160)}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded border border-gray-200 dark:border-white/10 text-gray-400 dark:text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase bg-gray-50 dark:bg-white/5">
                                                {formatTimeAgo(post.timestamp)}
                                            </span>
                                            <a
                                                href={post.permalink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-10 h-10 rounded-full bg-pink-50 dark:bg-white/5 border border-pink-100 dark:border-white/10 flex items-center justify-center text-pink-500 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all shadow-sm"
                                                title="View on Instagram"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Outer Hover Glow effect */}
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/5 group-hover:ring-pink-500/30 transition-all duration-500 pointer-events-none" />
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.section>
                )}

                {/* Load More */}
                {posts.length > 0 && posts.length < total && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center mt-16"
                    >
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className="group relative px-10 py-4 rounded-full bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:bg-gray-900/10 dark:hover:bg-white/10 text-gray-700 dark:text-white/80 font-medium text-sm tracking-wider uppercase transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
                                    Loading...
                                </span>
                            ) : (
                                `Load More (${total - posts.length} remaining)`
                            )}
                        </button>
                    </motion.div>
                )}

                {/* Post count */}
                {posts.length > 0 && (
                    <div className="text-center mt-8">
                        <span className="text-gray-400 dark:text-white/20 text-xs font-mono tracking-wider">
                            {posts.length} of {total} posts
                        </span>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPost && (
                    <InstagramLightbox
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                )}
            </AnimatePresence>
        </article>
    );
};

export default InstagramFeed;
