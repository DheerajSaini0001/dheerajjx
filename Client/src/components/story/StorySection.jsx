import React from 'react';
import { motion } from 'framer-motion';

const accentPalette = [
    { gradient: 'from-pink-500 to-rose-600', glow: 'rgba(236,72,153,0.15)', chapter: 'text-pink-400', border: 'border-pink-500/30', num: 'from-pink-400 to-rose-500' },
    { gradient: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.15)', chapter: 'text-violet-400', border: 'border-violet-500/30', num: 'from-violet-400 to-purple-500' },
    { gradient: 'from-blue-500 to-cyan-500', glow: 'rgba(59,130,246,0.15)', chapter: 'text-blue-400', border: 'border-blue-500/30', num: 'from-blue-400 to-cyan-500' },
    { gradient: 'from-amber-400 to-orange-500', glow: 'rgba(245,158,11,0.12)', chapter: 'text-amber-400', border: 'border-amber-500/30', num: 'from-amber-400 to-orange-500' },
    { gradient: 'from-emerald-500 to-teal-500', glow: 'rgba(16,185,129,0.12)', chapter: 'text-emerald-400', border: 'border-emerald-500/30', num: 'from-emerald-400 to-teal-500' },
    { gradient: 'from-fuchsia-500 to-pink-600', glow: 'rgba(217,70,239,0.15)', chapter: 'text-fuchsia-400', border: 'border-fuchsia-500/30', num: 'from-fuchsia-400 to-pink-500' },
    { gradient: 'from-rose-400 to-pink-600', glow: 'rgba(244,63,94,0.15)', chapter: 'text-rose-400', border: 'border-rose-500/30', num: 'from-rose-400 to-pink-600' },
];

const StorySection = ({ title, lines, index = 0 }) => {
    const a = accentPalette[index % accentPalette.length];
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 60 }}
            className="relative"
        >
            {/* Ambient glow blob */}
            <div
                className={`absolute ${isEven ? '-left-40' : '-right-40'} top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[120px] pointer-events-none`}
                style={{ background: a.glow }}
            />

            <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0`}>

                {/* Left/Right numeric column */}
                <div className={`hidden md:flex flex-col items-center ${isEven ? 'pr-12' : 'pl-12'} pt-6 min-w-[100px]`}>
                    {/* Huge chapter number */}
                    <span className={`text-[6rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b ${a.num} opacity-20 select-none`}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Chapter label */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center gap-3 mb-5"
                    >
                        <div className={`h-[2px] w-10 bg-gradient-to-r ${a.gradient} rounded-full`} />
                        <span className={`text-xs font-bold uppercase tracking-[0.35em] ${a.chapter}`}>
                            Chapter {String(index + 1).padStart(2, '0')}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-3xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight"
                    >
                        {title}
                    </motion.h2>

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className={`relative rounded-2xl border ${a.border} overflow-hidden`}
                        style={{ background: 'rgba(10,10,20,0.7)', backdropFilter: 'blur(20px)' }}
                    >
                        {/* Top gradient bar */}
                        <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${a.gradient}`} />

                        {/* Corner decoration */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${a.gradient} opacity-5 rounded-bl-full`} />
                        <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${a.gradient} opacity-5 rounded-tr-full`} />

                        {/* Content lines */}
                        <div className="p-8 md:p-10 space-y-3">
                            {lines.map((line, i) =>
                                line === '' ? (
                                    <div key={i} className="h-4" />
                                ) : line.split(' ').length <= 7 && line.length < 50 && !line.includes(',') ? (
                                    <motion.p
                                        key={`${index}-${i}`}
                                        initial={{ opacity: 0, x: isEven ? -15 : 15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.03, duration: 0.5 }}
                                        className="text-xl md:text-2xl font-semibold text-white italic leading-snug"
                                        style={{ fontFamily: '"Dancing Script", cursive' }}
                                    >
                                        {line}
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        key={`${index}-${i}`}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.025, duration: 0.6 }}
                                        className="text-gray-300 text-base md:text-lg leading-relaxed"
                                    >
                                        {line}
                                    </motion.p>
                                )
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default StorySection;
