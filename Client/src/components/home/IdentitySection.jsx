import React from 'react';
import { motion } from 'framer-motion';

const IdentitySection = ({ about }) => {
    if (!about) return null;

    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-8"
            >
                <div className="w-16 h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />

                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
                    {about.intro}
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {about.traits.map((trait, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-medium shadow-sm"
                        >
                            {trait}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default IdentitySection;
