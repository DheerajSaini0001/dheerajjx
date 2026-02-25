import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

// ── Static fallback photos (used if API has no photos yet) ──────────────────
import p1 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.58.jpeg';
import p2 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.59 (1).jpeg';
import p3 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.59.jpeg';
import p4 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.09.jpeg';
import p5 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10 (1).jpeg';
import p6 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10 (2).jpeg';
import p7 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10.jpeg';
import p8 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.11.jpeg';
import p9 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.12 (1).jpeg';
import p10 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.12.jpeg';
import p11 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.13.jpeg';
import p12 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.38.30 (1).jpeg';
import p13 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.38.30.jpeg';
import p14 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.39.jpeg';
import p15 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40 (1).jpeg';
import p16 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40 (2).jpeg';
import p17 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40.jpeg';

const FALLBACK_PHOTOS = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17];
const INTERVAL_MS = 3 * 60 * 60 * 1000; // 3 hours
const API = import.meta.env.VITE_API_URL || 'http://localhost:201';

/** Returns which index is active right now based on wall clock. */
const getSlot = (poolSize) => Math.floor(Date.now() / INTERVAL_MS) % poolSize;

const HeroSection = () => {
    // photos[] is the working pool — starts as fallback, then updated from API
    const [photos, setPhotos] = useState(FALLBACK_PHOTOS.map(src => ({ imageUrl: src })));
    const [slot, setSlot] = useState(() => getSlot(FALLBACK_PHOTOS.length));

    // Fetch admin-managed photos from API; keep fallback if none exist
    useEffect(() => {
        fetch(`${API}/api/herobg`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setPhotos(data);
                    setSlot(getSlot(data.length));
                }
            })
            .catch(() => {/* silently use fallback */ });
    }, []);

    // Re-check every 60 s — swap photo if 3-hour slot changed
    useEffect(() => {
        const timer = setInterval(() => {
            setSlot(prev => {
                const next = getSlot(photos.length);
                return prev !== next ? next : prev;
            });
        }, 60_000);
        return () => clearInterval(timer);
    }, [photos.length]);

    const currentSrc = photos[slot]?.imageUrl || FALLBACK_PHOTOS[0];

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">

            {/* ── Background Photo (crossfades every 3 h) ── */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={slot}
                        src={currentSrc}
                        alt="Dheeraj"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 0.70, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full object-cover object-center dark:opacity-55"
                    />
                </AnimatePresence>
                {/* Gradient overlay — keeps text readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/60 dark:from-gray-950/50 dark:via-gray-950/20 dark:to-gray-950/70" />
            </div>

            {/* ── Animated Background Gradient Blurs ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, -30, 30, 0], y: [0, 50, -50, 0] }}
                    transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 dark:bg-purple-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]"
                />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 mb-6 backdrop-blur-sm">
                        👋 Welcome to my digital space
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[1.1]">
                        I am <br className="md:hidden" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                            Dheerajj.x
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
                >
                    <span className="font-semibold text-gray-900 dark:text-white">Smart, Dark &amp; Fearless Soul.</span>
                    <br className="hidden md:block" />
                    Exploring the depths of technology and human emotion.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
                >
                    <Button to="/memories" variant="primary" size="lg"
                        className="rounded-full px-8 py-4 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow">
                        Explore Memories
                    </Button>
                    <Button to="/about" variant="outline" size="lg"
                        className="rounded-full px-8 py-4 text-lg backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 hover:bg-white/80 dark:hover:bg-gray-900/80">
                        My Story
                    </Button>
                </motion.div>
            </div>

            {/* ── Scroll Indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500"
            >
                <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-70">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-300 dark:from-gray-700 to-transparent">
                    <motion.div
                        animate={{ y: [0, 48, 0], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="w-full h-1/2 bg-gradient-to-b from-blue-500 to-purple-500"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
