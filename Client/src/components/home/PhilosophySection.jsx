import React from 'react';
import { motion } from 'framer-motion';

const PhilosophySection = () => {
    return (
        <section className="relative py-24 px-4 bg-gray-900 border-t border-gray-800 border-b border-gray-800 text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10"
            /> {/* Subtle texture background */}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto space-y-6"
            >
                <div className="w-16 h-1 w-20 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-8" />

                <h2 className="text-3xl md:text-5xl font-serif italic text-white/90 leading-tight">
                    "Every line of code is a reflection of the mind that wrote it.
                    <br className="hidden md:block" />
                    Complexity is just simpler pieces waiting to be understood."
                </h2>

                <p className="text-gray-400 font-light text-lg italic">
                    — The Philosophy of Dheerajj.x
                </p>
            </motion.div>
        </section>
    );
};

export default PhilosophySection;
