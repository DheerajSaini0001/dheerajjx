import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedMemories = ({ memories }) => {
    const [hoveredId, setHoveredId] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60, rotateX: 15 },
        visible: {
            opacity: 1, y: 0, rotateX: 0,
            transition: { type: "spring", stiffness: 80, damping: 20 }
        }
    };

    if (!memories) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (memories.length === 0) {
        return null;
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <section className="relative py-28 md:py-36 px-4 bg-gray-50 dark:bg-[#030303] overflow-hidden transition-colors duration-500">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-400/10 dark:bg-pink-600/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-400/10 dark:bg-violet-600/8 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-300/8 dark:bg-blue-600/5 rounded-full blur-[200px]" />
            </div>

            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`
            }} />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-20">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: 48 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-[2px] bg-gradient-to-r from-pink-500 to-violet-500"
                        />
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="block text-pink-500 font-mono tracking-[0.3em] uppercase text-[11px]"
                        >
                            Life in Frames
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight"
                        >
                            Captured<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-violet-500">
                                Moments
                            </span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            to="/gallery"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 dark:from-pink-500/20 dark:to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 text-sm font-medium tracking-wider uppercase">View Gallery</span>
                            <motion.span
                                className="relative z-10"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>

                {/* Gallery Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {memories.map((photo, index) => (
                        <motion.div
                            key={photo._id || index}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredId(photo._id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`relative group ${index === 1 ? 'lg:mt-12' : index === 2 ? 'lg:mt-6' : ''}`}
                            style={{ perspective: '1200px' }}
                        >
                            <motion.div
                                whileHover={{ y: -12, rotateY: -2, rotateX: 2 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="relative rounded-2xl overflow-hidden cursor-pointer"
                            >
                                {/* Main Image Container */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-200 dark:bg-gray-900">
                                    <img
                                        src={photo.imageUrl}
                                        alt={photo.title}
                                        className="w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110 filter brightness-[0.95] dark:brightness-[0.85] group-hover:brightness-100"
                                        loading="lazy"
                                    />

                                    {/* Cinematic Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-black/90 via-black/10 dark:via-black/20 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 dark:from-pink-500/10 via-transparent to-violet-500/5 dark:to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Scan Line Effect on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
                                        }}
                                    />

                                    {/* Top-left corner accent */}
                                    <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                                        <div className="absolute top-4 left-4 w-6 h-[1px] bg-gray-400/30 dark:bg-white/30 group-hover:bg-pink-400/80 group-hover:w-8 transition-all duration-500" />
                                        <div className="absolute top-4 left-4 h-6 w-[1px] bg-gray-400/30 dark:bg-white/30 group-hover:bg-pink-400/80 group-hover:h-8 transition-all duration-500" />
                                    </div>

                                    {/* Bottom-right corner accent */}
                                    <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                                        <div className="absolute bottom-4 right-4 w-6 h-[1px] bg-gray-400/30 dark:bg-white/30 group-hover:bg-violet-400/80 group-hover:w-8 transition-all duration-500" />
                                        <div className="absolute bottom-4 right-4 h-6 w-[1px] bg-gray-400/30 dark:bg-white/30 group-hover:bg-violet-400/80 group-hover:h-8 transition-all duration-500" />
                                    </div>

                                    {/* Category Badge - Floating Pill */}
                                    {photo.category && (
                                        <div className="absolute top-5 right-5 z-20">
                                            <motion.div
                                                initial={false}
                                                animate={hoveredId === photo._id ? { scale: 1.05, y: 0 } : { scale: 1, y: 0 }}
                                                className="px-3 py-1.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 group-hover:border-pink-500/30 transition-colors duration-500"
                                            >
                                                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600 dark:text-white/70 group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors duration-500">
                                                    {photo.category}
                                                </span>
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Bottom Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        {/* Camera Metadata Row */}
                                        <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                            {photo.iso && (
                                                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase bg-white/10 dark:bg-white/5 backdrop-blur-sm px-2 py-1 rounded border border-white/10 dark:border-white/5">
                                                    {photo.iso}
                                                </span>
                                            )}
                                            {photo.aperture && (
                                                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase bg-white/10 dark:bg-white/5 backdrop-blur-sm px-2 py-1 rounded border border-white/10 dark:border-white/5">
                                                    {photo.aperture}
                                                </span>
                                            )}
                                            {photo.shutter && (
                                                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase bg-white/10 dark:bg-white/5 backdrop-blur-sm px-2 py-1 rounded border border-white/10 dark:border-white/5">
                                                    {photo.shutter}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight mb-2 transform group-hover:translate-x-1 transition-transform duration-500">
                                            {photo.title}
                                        </h3>

                                        {/* Date & Divider */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-[1px] w-8 bg-gradient-to-r from-pink-500 to-transparent group-hover:w-12 transition-all duration-500" />
                                            <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
                                                {formatDate(photo.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* View overlay icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                        <motion.div
                                            initial={false}
                                            animate={hoveredId === photo._id ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="w-14 h-14 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 flex items-center justify-center"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Glowing border effect on hover */}
                                <div className="absolute inset-0 rounded-2xl border border-gray-200/50 dark:border-white/5 group-hover:border-gray-300 dark:group-hover:border-white/15 transition-colors duration-500 pointer-events-none" />
                                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(236,72,153,0.15), transparent 40%, transparent 60%, rgba(139,92,246,0.15))',
                                    }}
                                />
                            </motion.div>

                            {/* Floating shadow underneath */}
                            <div className="absolute -bottom-3 left-[10%] right-[10%] h-12 bg-pink-500/15 dark:bg-pink-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Decorative Element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center mt-20 gap-4"
                >
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-white/20" />
                    <div className="w-2 h-2 rounded-full bg-pink-500/40" />
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-white/20" />
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedMemories;
