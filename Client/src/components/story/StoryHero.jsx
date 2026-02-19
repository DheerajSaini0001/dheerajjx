import React from 'react';
import { motion } from 'framer-motion';

const StoryHero = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20 bg-gray-950">
            {/* Full-screen grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Animated blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.4, 1], rotate: [0, 20, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.15, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex items-center justify-center gap-3"
                >
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-500" />
                    <span className="text-xs tracking-[0.4em] uppercase text-pink-400 font-semibold">My Story</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-500" />
                </motion.div>

                {/* Main title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.15 }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.95] text-white">
                        Who is{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400">
                                Dheerajj.x?
                            </span>
                            {/* Glow under text */}
                            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 blur-2xl opacity-50">
                                Dheerajj.x?
                            </span>
                        </span>
                    </h1>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-gray-400 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
                    style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                    Not just a face. Not just a feed. A universe waiting to be felt.
                </motion.p>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-8 pt-8"
                >
                    {[
                        { n: '7', label: 'Chapters' },
                        { n: '∞', label: 'Stories' },
                        { n: '1', label: 'Mission' },
                    ].map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-black text-white">{s.n}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">Scroll to read</span>
                <div className="w-[1px] h-14 bg-gradient-to-b from-gray-600 to-transparent">
                    <motion.div
                        animate={{ y: [0, 56, 0], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        className="w-full h-1/2 bg-gradient-to-b from-pink-500 to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default StoryHero;
