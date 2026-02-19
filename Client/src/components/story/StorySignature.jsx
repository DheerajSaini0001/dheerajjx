import React from 'react';
import { motion } from 'framer-motion';

const StorySignature = () => {
    return (
        <section className="relative py-32 px-4 flex flex-col items-center text-center bg-white dark:bg-gray-950 overflow-hidden">
            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: 'spring' }}
                className="relative z-10 max-w-3xl space-y-10"
            >
                {/* Divider */}
                <div className="flex items-center gap-4 justify-center">
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-pink-500 opacity-60" />
                    <span className="text-pink-500 text-xl">✦</span>
                    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-pink-500 opacity-60" />
                </div>

                {/* Quote */}
                <p
                    className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light italic leading-relaxed"
                    style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                    "I don't just create content — I create a feeling. Every post, every word, every moment is a piece of the universe I'm building."
                </p>

                {/* Signature block */}
                <div className="flex flex-col items-center gap-3">
                    <span
                        className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 leading-none"
                        style={{ fontFamily: '"Dancing Script", cursive' }}
                    >
                        Dheerajj.x
                    </span>
                    <span className="text-xs uppercase tracking-[0.35em] text-gray-500 dark:text-gray-600">
                        Digital Creator · Lifestyle Curator
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                    {['Still Building', 'Still Rising', 'Still Becoming'].map((tag, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="px-4 py-1.5 rounded-full border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm bg-pink-500/5"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                {/* Bottom divider */}
                <div className="flex items-center gap-4 justify-center opacity-30">
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gray-400" />
                    <span className="text-gray-400">✦</span>
                    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gray-400" />
                </div>
            </motion.div>
        </section>
    );
};

export default StorySignature;
