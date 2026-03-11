import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:201';

const InstagramSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/feed?limit=6`);
                const data = await res.json();
                if (data.success && data.data) {
                    setPosts(data.data);
                }
            } catch (err) {
                console.error('Instagram feed error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();

        // Auto-refresh every 5 minutes
        const interval = setInterval(fetchFeed, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <section className="py-20 px-4 bg-white dark:bg-gray-950">
                <div className="flex justify-center">
                    <div className="w-10 h-10 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
                </div>
            </section>
        );
    }

    if (posts.length === 0) return null;

    return (
        <section className="relative py-24 md:py-32 px-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-pink-500/5 dark:from-pink-500/3 to-transparent rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            {/* Instagram gradient icon */}
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                                </svg>
                            </div>
                            <span className="text-pink-500 font-mono tracking-[0.2em] uppercase text-[11px]">Live Feed</span>

                            {/* Pulsing live indicator */}
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                            From My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">Instagram</span>
                        </h2>
                    </div>

                    <Link
                        to="/instagram"
                        className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium hover:text-pink-500 dark:hover:text-pink-400 transition-colors text-sm"
                    >
                        <span>Instagram</span>
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </div>

                {/* Posts Grid — 3 columns, showing latest 6 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
                >
                    {posts.slice(0, 6).map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -4 }}
                            className="group relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200/50 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 transition-all duration-500"
                        >
                            <img
                                src={post.media_url}
                                alt={post.caption || 'Instagram post'}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Media type indicator */}
                            {post.media_type === 'VIDEO' && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21" /></svg>
                                </div>
                            )}
                            {post.media_type === 'CAROUSEL_ALBUM' && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="2" width="14" height="14" rx="1" /><rect x="8" y="8" width="14" height="14" rx="1" /></svg>
                                </div>
                            )}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Follow CTA */}
                <div className="flex justify-center mt-12">
                    <a
                        href="https://instagram.com/dheerajj.x"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-medium text-sm hover:shadow-xl hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                        </svg>
                        Follow on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
