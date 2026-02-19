import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const CTASection = () => {
    return (
        <section className="relative py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 text-center overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-xl mx-auto space-y-8"
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Start Exploring Now.
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Dive deeper into the mind of Dheerajj.x. The code is just the beginning.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button to="/memories" variant="primary" size="lg" className="rounded-full shadow-xl">
                        Explore Memories
                    </Button>
                    <Button to="/about" variant="ghost" size="lg" className="rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        Read My Story
                    </Button>
                </div>
            </motion.div>
        </section>
    );
};

export default CTASection;
