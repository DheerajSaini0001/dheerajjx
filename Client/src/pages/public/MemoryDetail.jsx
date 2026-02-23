import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, ArrowRight, Calendar, MapPin, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Full-screen lightbox for pathway photos
const PathwayLightbox = ({ images, startIndex, onClose }) => {
    const [current, setCurrent] = useState(startIndex);
    const [dir, setDir] = useState(0);

    const goPrev = useCallback((e) => {
        e?.stopPropagation();
        setDir(-1);
        setCurrent(prev => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const goNext = useCallback((e) => {
        e?.stopPropagation();
        setDir(1);
        setCurrent(prev => (prev + 1) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, goPrev, goNext]);

    const variants = {
        enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
            >
                <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono tracking-widest">
                {current + 1} / {images.length}
            </div>

            {/* Image */}
            <div className="w-full max-w-5xl px-20" onClick={e => e.stopPropagation()}>
                <AnimatePresence custom={dir} mode="popLayout">
                    <motion.img
                        key={current}
                        src={images[current]}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                    />
                </AnimatePresence>
            </div>

            {/* Prev */}
            <button
                onClick={goPrev}
                className="absolute left-4 md:left-8 z-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
                onClick={goNext}
                className="absolute right-4 md:right-8 z-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
            >
                <ChevronRight size={24} />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-x-auto max-w-[90vw]">
                {images.map((src, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                        className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-pink-500 scale-110' : 'border-transparent opacity-50 hover:opacity-80'}`}
                    >
                        <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

const MemoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [memory, setMemory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        const fetchMemory = async () => {
            try {
                const res = await fetch(`http://localhost:201/api/memories/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setMemory(data);
                } else {
                    navigate('/memories', { replace: true });
                }
            } catch (error) {
                console.error("Failed to fetch specific memory:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMemory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#030303] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={40} className="animate-spin text-pink-500" />
                    <p className="font-bold uppercase tracking-widest text-sm text-gray-500">Decrypting Memory...</p>
                </div>
            </div>
        );
    }

    if (!memory) return null;

    const hasGallery = memory.gallery && memory.gallery.length > 0;
    // All images: cover first, then gallery
    const allImages = [memory.imageUrl, ...(memory.gallery || [])];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#030303] text-gray-900 dark:text-white pt-24 md:pt-32 pb-20 selection:bg-pink-500/30 selection:text-pink-200">

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-violet-600/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

                {/* Back Navigation */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/memories')}
                    className="group mb-12 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-white/10 transition-colors border border-gray-300 dark:border-white/10">
                        <ArrowLeft size={16} />
                    </div>
                    <span>Back to Archive</span>
                </motion.button>

                {/* Hero Showcase Image */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    onClick={() => setLightboxIndex(0)}
                    className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-200 dark:bg-[#111] shadow-2xl shadow-pink-500/10 group mb-8 border border-gray-300 dark:border-white/10 cursor-zoom-in"
                >
                    <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    />
                    {hasGallery && (
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white text-xs font-bold tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                            +{memory.gallery.length} more photos
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* ─── PHOTO PATHWAY ────────────────────────────────────── */}
                {hasGallery && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="mb-16"
                    >
                        {/* Section header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-pink-500 to-transparent" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Photo Pathway</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-300 dark:from-white/10 to-transparent" />
                        </div>

                        {/* Horizontal scrolling film strip */}
                        <div className="relative">
                            <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10">
                                {memory.gallery.map((src, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                        onClick={() => setLightboxIndex(idx + 1)}
                                        className="relative shrink-0 snap-start w-64 md:w-80 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 dark:bg-[#111] border border-gray-300 dark:border-white/10 group cursor-zoom-in shadow-lg hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-500"
                                    >
                                        <img
                                            src={src}
                                            alt={`pathway-${idx + 1}`}
                                            className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            loading="lazy"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                        {/* Frame number */}
                                        <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest text-white/70 group-hover:text-white transition-colors">
                                            {String(idx + 1).padStart(2, '0')} / {String(memory.gallery.length).padStart(2, '0')}
                                        </div>
                                        {/* Expand icon */}
                                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                        </div>

                                        {/* Connecting line between cards (not last) */}
                                        {idx < memory.gallery.length - 1 && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-4 h-[2px] bg-gradient-to-r from-gray-400 dark:from-white/20 to-transparent z-10" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Scroll hint arrows */}
                            {memory.gallery.length > 2 && (
                                <div className="hidden md:flex justify-end mt-3 gap-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                        <ArrowLeft size={14} />
                                        scroll or swipe
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* ─── CONTENT BLOCK ───────────────────────────────────── */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">

                    {/* Left Meta */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: hasGallery ? 0.35 : 0.2, duration: 0.8 }}
                        className="w-full md:w-1/3 space-y-8"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10">
                                    <Calendar size={18} className="text-pink-500" />
                                </span>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Date</div>
                                    <div className="font-medium text-gray-900 dark:text-white leading-none">{memory.date}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10">
                                    <MapPin size={18} className="text-pink-500" />
                                </span>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Coordinates</div>
                                    <div className="font-medium text-gray-900 dark:text-white leading-none capitalize">{memory.location}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10">
                                    <Tag size={18} className="text-pink-500" />
                                </span>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Classification</div>
                                    <div className="font-medium text-gray-900 dark:text-white leading-none uppercase tracking-wider">{memory.category}</div>
                                </div>
                            </div>

                            {hasGallery && (
                                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                    <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-500"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                    </span>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Pathway Photos</div>
                                        <div className="font-medium text-gray-900 dark:text-white leading-none">{memory.gallery.length} frames</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full h-[1px] bg-gradient-to-r from-gray-300 dark:from-white/10 to-transparent" />

                        <div className="opacity-40">
                            <div className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-500 dark:to-gray-700" style={{ fontFamily: '"Dancing Script", cursive' }}>
                                Dheerajj.x
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: hasGallery ? 0.4 : 0.3, duration: 0.8 }}
                        className="w-full md:w-2/3"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white capitalize leading-[1.1] tracking-tight mb-8">
                            {memory.title}
                        </h1>

                        <p className="text-3xl md:text-4xl leading-relaxed text-pink-600 shadow-pink-500 drop-shadow-sm dark:text-pink-300/90 font-medium italic mb-12" style={{ fontFamily: '"Dancing Script", cursive' }}>
                            "{memory.quote}"
                        </p>

                        <div className="prose prose-lg dark:prose-invert prose-gray max-w-none prose-p:leading-loose prose-p:text-gray-600 dark:prose-p:text-gray-400 font-light">
                            <p>
                                The moment captured above holds a specific timestamp within the grander narrative of life.
                                Recorded in <span className="capitalize font-bold text-gray-700 dark:text-white">{memory.location}</span> during {memory.date}.
                                Space, light, and composition intersect permanently.
                            </p>
                            <p>
                                This digital archive ensures that as time passes, the precise aesthetic feeling
                                and core philosophy behind this single captured second will perpetually echo
                                precisely as it felt originally.
                            </p>
                        </div>

                        {/* View full pathway CTA */}
                        {hasGallery && (
                            <button
                                onClick={() => setLightboxIndex(0)}
                                className="mt-10 group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 dark:hover:bg-white/10 hover:border-pink-400 transition-all text-sm font-bold text-gray-700 dark:text-white"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                View all {allImages.length} frames
                                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Lightbox Portal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <PathwayLightbox
                        images={allImages}
                        startIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default MemoryDetail;
