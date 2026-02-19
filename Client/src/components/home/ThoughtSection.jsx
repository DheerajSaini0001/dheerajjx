import React from 'react';
import { motion } from 'framer-motion';

const ThoughtSection = ({ thought }) => {
    if (!thought) return null;

    return (
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
            <div className="max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="relative px-12 py-16 md:px-20 md:py-20 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-b-full opacity-50"></div>

                    {/* Left Quote */}
                    <span className="absolute top-6 left-6 md:top-10 md:left-10 text-8xl md:text-9xl text-pink-100 dark:text-gray-700 font-serif leading-none select-none opacity-80" style={{ fontFamily: 'Georgia, serif' }}>
                        &ldquo;
                    </span>

                    <h3 className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed z-10 relative italic" style={{ fontFamily: '"Dancing Script", cursive' }}>
                        {thought.text}
                    </h3>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-gray-300 dark:bg-gray-600"></div>
                            <p className="text-sm font-semibold tracking-widest uppercase text-pink-500">
                                {thought.author}
                            </p>
                            <div className="h-px w-12 bg-gray-300 dark:bg-gray-600"></div>
                        </div>

                        <button
                            onClick={() => {
                                const textToShare = `"${thought.text}" — Shared via Dheerajj.x`;
                                navigator.clipboard.writeText(textToShare);
                                alert("Quote copied to clipboard!");
                            }}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-gray-400 hover:text-pink-500 transition-colors"
                            title="Share Quote"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                        </button>
                    </div>

                    <p className="mt-2 text-xs text-gray-400 font-mono">Thought of the Day</p>

                    {/* Right Quote */}
                    <span className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-8xl md:text-9xl text-pink-100 dark:text-gray-700 font-serif leading-none select-none opacity-80" style={{ fontFamily: 'Georgia, serif' }}>
                        &rdquo;
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default ThoughtSection;
