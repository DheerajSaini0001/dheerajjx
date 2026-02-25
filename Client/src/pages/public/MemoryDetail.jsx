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

                {/* ─── TITLE + QUOTE + DESCRIPTION ────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white capitalize leading-[1.1] tracking-tight mb-6">
                        {memory.title}
                    </h1>

                    <p className="text-3xl md:text-4xl leading-relaxed text-pink-600 drop-shadow-sm dark:text-pink-300/90 font-medium italic mb-10" style={{ fontFamily: '"Dancing Script", cursive' }}>
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
                </motion.div>

                {/* ─── PHOTO PATHWAY ─────────────────────────────────── */}
                {hasGallery && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="mb-20"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-10">
                            <div className="relative shrink-0">
                                <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping absolute inset-0" />
                                <div className="w-2 h-2 rounded-full bg-pink-400" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-pink-500 dark:text-pink-400">Photo Pathway</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-600 tracking-wider mt-0.5">{memory.gallery.length} frame{memory.gallery.length > 1 ? 's' : ''} · timeline</p>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-pink-500/20 to-transparent" />
                            <div className="px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-500 dark:text-pink-400 text-[10px] font-bold tracking-widest">
                                {String(memory.gallery.length).padStart(2, '0')} SHOTS
                            </div>
                        </div>

                        {/* Timeline rows */}
                        <div className="flex flex-col">
                            {memory.gallery.map((src, idx) => {
                                const isLeft = idx % 2 === 0;
                                const isFirst = idx === 0;
                                const isLast = idx === memory.gallery.length - 1;

                                return (
                                    <div key={idx} className="grid grid-cols-[1fr_auto_1fr] items-stretch">

                                        {/* LEFT COLUMN */}
                                        <div className="flex items-center pr-5 py-6">
                                            {isLeft ? (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: '-50px' }}
                                                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                                    onClick={() => setLightboxIndex(idx + 1)}
                                                    className="w-full relative group cursor-zoom-in"
                                                >
                                                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-pink-500/0 group-hover:from-pink-500/50 group-hover:via-violet-500/40 group-hover:to-cyan-400/30 transition-all duration-700 blur-sm" />
                                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.07] shadow-lg group-hover:shadow-xl group-hover:shadow-pink-500/10 transition-all duration-500 bg-gray-100 dark:bg-[#0d0d0f]">
                                                        <img src={src} alt={`frame-${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white/80 text-[8px] font-mono tracking-widest">
                                                            <span className="w-1 h-1 rounded-full bg-pink-400" />
                                                            {String(idx + 1).padStart(2, '0')} / {String(memory.gallery.length).padStart(2, '0')}
                                                        </div>
                                                        <div className="absolute bottom-0 inset-x-0 px-3 py-2.5 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Frame {String(idx + 1).padStart(2, '0')}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : <div />}
                                        </div>

                                        {/* CENTER COLUMN — the spine */}
                                        <div className="flex flex-col items-center w-14">
                                            {/* Top connector (to previous node) */}
                                            <div className={`w-px flex-1 ${isFirst ? 'opacity-0' : ''}`}
                                                style={{
                                                    background: isFirst
                                                        ? 'transparent'
                                                        : 'linear-gradient(to bottom, rgba(168,85,247,0.4), rgba(236,72,153,0.8))',
                                                    boxShadow: isFirst ? 'none' : '0 0 6px 1px rgba(236,72,153,0.3)',
                                                    minHeight: '24px'
                                                }}
                                            />

                                            {/* Node */}
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true, margin: '-30px' }}
                                                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                                                className="relative shrink-0 my-1"
                                            >
                                                {/* Outer pulse ring */}
                                                <div className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping" style={{ animationDuration: '2s', animationDelay: `${idx * 0.3}s` }} />
                                                {/* Glass ring */}
                                                <div className="relative w-8 h-8 rounded-full border border-pink-500/40 dark:border-pink-500/50 bg-gradient-to-br from-pink-500/10 to-violet-500/10 backdrop-blur-sm flex items-center justify-center shadow-md shadow-pink-500/20">
                                                    {/* Core dot */}
                                                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 shadow-sm shadow-pink-500/60" />
                                                </div>
                                            </motion.div>

                                            {/* Bottom connector (to next node) */}
                                            <div className={`w-px flex-1 ${isLast ? 'opacity-0' : ''}`}
                                                style={{
                                                    background: isLast
                                                        ? 'transparent'
                                                        : 'linear-gradient(to bottom, rgba(236,72,153,0.8), rgba(34,211,238,0.4))',
                                                    boxShadow: isLast ? 'none' : '0 0 6px 1px rgba(139,92,246,0.25)',
                                                    minHeight: '24px'
                                                }}
                                            />
                                        </div>

                                        {/* RIGHT COLUMN */}
                                        <div className="flex items-center pl-5 py-6">
                                            {!isLeft ? (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: '-50px' }}
                                                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                                    onClick={() => setLightboxIndex(idx + 1)}
                                                    className="w-full relative group cursor-zoom-in"
                                                >
                                                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-bl from-violet-500/0 group-hover:from-violet-500/50 group-hover:via-pink-500/40 group-hover:to-cyan-400/30 transition-all duration-700 blur-sm" />
                                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.07] shadow-lg group-hover:shadow-xl group-hover:shadow-violet-500/10 transition-all duration-500 bg-gray-100 dark:bg-[#0d0d0f]">
                                                        <img src={src} alt={`frame-${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white/80 text-[8px] font-mono tracking-widest">
                                                            <span className="w-1 h-1 rounded-full bg-violet-400" />
                                                            {String(idx + 1).padStart(2, '0')} / {String(memory.gallery.length).padStart(2, '0')}
                                                        </div>
                                                        <div className="absolute bottom-0 inset-x-0 px-3 py-2.5 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Frame {String(idx + 1).padStart(2, '0')}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : <div />}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        {/* End cap */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col items-center gap-2 mt-2"
                        >
                            <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.4), transparent)' }} />
                            <div className="flex items-center gap-2">
                                <div className="h-px w-8 bg-gradient-to-r from-transparent to-pink-500/30" />
                                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600">end of pathway</span>
                                <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500/30" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}


                {/* ─── CONTENT BLOCK ───────────────────────────────────── */}
                <div className="flex flex-col gap-10">

                    {/* ── Meta Row ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: hasGallery ? 0.5 : 0.35, duration: 0.8 }}
                        className="flex flex-wrap gap-x-10 gap-y-6 items-start"
                    >
                        {/* Date */}
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <span className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10">
                                <Calendar size={15} className="text-pink-500" />
                            </span>
                            <div>
                                <div className="text-[9px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Date</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-none">{memory.date}</div>
                            </div>
                        </div>

                        {/* Coordinates */}
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <span className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10">
                                <MapPin size={15} className="text-pink-500" />
                            </span>
                            <div>
                                <div className="text-[9px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Coordinates</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-none capitalize">{memory.location}</div>
                            </div>
                        </div>

                        {/* Classification */}
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <span className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10">
                                <Tag size={15} className="text-pink-500" />
                            </span>
                            <div>
                                <div className="text-[9px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Classification</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-none uppercase tracking-wider">{memory.category}</div>
                            </div>
                        </div>

                        {/* Pathway Photos */}
                        {hasGallery && (
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <span className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-500"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                </span>
                                <div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Pathway Photos</div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white leading-none">{memory.gallery.length} frames</div>
                                </div>
                            </div>
                        )}

                        {/* Branding + CTA */}
                        <div className="flex items-center gap-6 ml-auto">
                            <div className="opacity-30 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-500 dark:to-gray-700" style={{ fontFamily: '"Dancing Script", cursive' }}>
                                Dheerajj.x
                            </div>
                            {hasGallery && (
                                <button
                                    onClick={() => setLightboxIndex(0)}
                                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 dark:hover:bg-white/10 hover:border-pink-400 transition-all text-sm font-bold text-gray-700 dark:text-white"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                    View all {allImages.length} frames
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            )}
                        </div>
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
        </div >
    );
};

export default MemoryDetail;
