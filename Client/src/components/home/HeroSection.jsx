import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
            {/* Background Image Placeholder - Replace 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop' with your actual image path */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 dark:opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white dark:from-gray-900/80 dark:via-gray-900/50 dark:to-gray-900" />
            </div>

            {/* Animated Background Gradient Blurs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, -50, 0],
                        y: [0, -30, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 30, 0],
                        y: [0, 50, -50, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 dark:bg-purple-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]"
                />
            </div>

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
                    <span className="font-semibold text-gray-900 dark:text-white">Smart, Dark & Fearless Soul.</span>
                    <br className="hidden md:block" />
                    Exploring the depths of technology and human emotion.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
                >
                    <Button
                        to="/memories"
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 py-4 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                    >
                        Explore Memories
                    </Button>
                    <Button
                        to="/about"
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 py-4 text-lg backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 hover:bg-white/80 dark:hover:bg-gray-900/80"
                    >
                        My Story
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
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
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-full h-1/2 bg-gradient-to-b from-blue-500 to-purple-500"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
