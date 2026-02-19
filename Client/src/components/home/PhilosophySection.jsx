import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dailyPhilosophies } from '../../data/philosophies';

const PhilosophySection = () => {
    // Pick philosophy by day-of-month (1-31 → index 0-29, wraps safely)
    const today = useMemo(() => {
        const day = new Date().getDate(); // 1 – 31
        return dailyPhilosophies[(day - 1) % dailyPhilosophies.length];
    }, []);

    // For the animated day badge
    const dayOfYear = useMemo(() => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        return Math.floor((now - start) / (1000 * 60 * 60 * 24));
    }, []);

    return (
        <section className="relative py-28 px-4 overflow-hidden text-center
            bg-gray-50 border-t border-gray-200 border-b border-gray-200
            dark:bg-gray-950 dark:border-t dark:border-gray-900 dark:border-b dark:border-gray-900">

            {/* Light mode glow blobs */}
            <div className="absolute inset-0 pointer-events-none dark:hidden">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-b from-violet-100/80 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100/60 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-100/50 rounded-full blur-2xl" />
            </div>

            {/* Dark mode texture */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.06 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 hidden dark:block bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"
            />

            {/* Dark mode glow blobs */}
            <div className="absolute inset-0 pointer-events-none hidden dark:block">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-b from-purple-900/35 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-900/25 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto space-y-8"
            >
                {/* Label */}
                <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500 dark:to-purple-400 opacity-60" />
                    <span className="text-xs uppercase tracking-[0.3em] font-semibold text-purple-600 dark:text-purple-400">
                        Philosophy of the Day
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500 dark:to-purple-400 opacity-60" />
                </div>

                {/* Decorative bar */}
                <div className="w-16 h-[3px] mx-auto bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-full" />

                {/* Opening quote mark */}
                <div className="text-8xl leading-none font-serif text-purple-200 dark:text-purple-900/60 select-none -mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                    &ldquo;
                </div>

                {/* Rotating quote — AnimatePresence so it fades if key changes */}
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={dayOfYear}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.7 }}
                        className="text-2xl md:text-4xl font-serif italic leading-[1.5]
                            text-gray-800 dark:text-white/90"
                    >
                        {today.quote}
                    </motion.h2>
                </AnimatePresence>

                {/* Attribution */}
                <div className="flex flex-col items-center gap-2 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-gray-300 dark:bg-gray-700" />
                        <p className="font-semibold text-base tracking-wide
                            text-purple-600 dark:text-purple-400">
                            — {today.author}
                        </p>
                        <div className="h-px w-10 bg-gray-300 dark:bg-gray-700" />
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                        Day {new Date().getDate()} · Changes daily
                    </span>
                </div>
            </motion.div>
        </section>
    );
};

export default PhilosophySection;
