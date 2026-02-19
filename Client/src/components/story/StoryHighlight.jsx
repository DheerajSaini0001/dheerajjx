import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
    { icon: '🎯', label: 'Vision', value: 'Build experiences that matter', color: 'from-pink-500 to-rose-500', glow: 'hover:shadow-pink-500/20' },
    { icon: '🌙', label: 'Style', value: 'Dark, bold, and unapologetic', color: 'from-violet-500 to-purple-600', glow: 'hover:shadow-violet-500/20' },
    { icon: '📸', label: 'Craft', value: 'Storytelling through content', color: 'from-blue-500 to-cyan-500', glow: 'hover:shadow-blue-500/20' },
    { icon: '🔥', label: 'Energy', value: 'Relentless & fiercely creative', color: 'from-amber-500 to-orange-500', glow: 'hover:shadow-amber-500/20' },
];

const StoryHighlight = () => {
    return (
        <section className="py-20 px-4 bg-gray-950">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5"
            >
                {highlights.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -6, scale: 1.04 }}
                        className={`relative flex flex-col items-center text-center gap-4 p-7 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md shadow-xl ${item.glow} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                    >
                        {/* Top accent line */}
                        <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${item.color}`} />
                        <span className="text-4xl">{item.icon}</span>
                        <span className={`text-xs uppercase tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>{item.label}</span>
                        <p className="text-sm text-gray-400 font-medium leading-snug">{item.value}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default StoryHighlight;

