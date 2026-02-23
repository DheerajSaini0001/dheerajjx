import React from 'react';
import { motion } from 'framer-motion';
import bg0 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.58.jpeg';
import bg1 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.59 (1).jpeg';
import bg2 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.59.jpeg';
import bg3 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.09.jpeg';
import bg4 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10 (1).jpeg';
import bg5 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10 (2).jpeg';
import bg6 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10.jpeg';
import bg7 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.11.jpeg';
import bg8 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.12 (1).jpeg';
import bg9 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.12.jpeg';
import bg10 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.13.jpeg';
import bg11 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.38.30 (1).jpeg';
import bg12 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.38.30.jpeg';
import bg13 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.39.jpeg';
import bg14 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40 (1).jpeg';
import bg15 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40 (2).jpeg';
import bg16 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40.jpeg';

const storyBgs = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15, bg16];

const accentPalette = [
    { gradient: 'from-pink-500 to-rose-600', glow: 'rgba(236,72,153,0.15)', chapter: 'text-pink-500 dark:text-pink-400', border: 'border-pink-500/25', num: 'from-pink-400 to-rose-500' },
    { gradient: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.15)', chapter: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/25', num: 'from-violet-400 to-purple-500' },
    { gradient: 'from-cyan-500 to-blue-500', glow: 'rgba(6,182,212,0.15)', chapter: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/25', num: 'from-cyan-400 to-blue-500' },
    { gradient: 'from-amber-400 to-orange-500', glow: 'rgba(245,158,11,0.13)', chapter: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/25', num: 'from-amber-400 to-orange-500' },
    { gradient: 'from-emerald-500 to-teal-500', glow: 'rgba(16,185,129,0.13)', chapter: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/25', num: 'from-emerald-400 to-teal-500' },
    { gradient: 'from-fuchsia-500 to-pink-600', glow: 'rgba(217,70,239,0.15)', chapter: 'text-fuchsia-600 dark:text-fuchsia-400', border: 'border-fuchsia-500/25', num: 'from-fuchsia-400 to-pink-500' },
    { gradient: 'from-rose-400 to-pink-600', glow: 'rgba(244,63,94,0.15)', chapter: 'text-rose-500 dark:text-rose-400', border: 'border-rose-500/25', num: 'from-rose-400 to-pink-600' },
];

const StorySection = ({ title, lines, index = 0 }) => {
    const bgImage = storyBgs[index % storyBgs.length];
    const a = accentPalette[index % accentPalette.length];
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 55, damping: 14 }}
            className="relative"
        >
            {/* Ambient glow blob */}
            <div
                className={`absolute ${isEven ? '-left-32' : '-right-32'} top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-60`}
                style={{ background: a.glow }}
            />

            <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-0`}>

                {/* Side numeric column */}
                <div className={`hidden md:flex flex-col items-center justify-start ${isEven ? 'pr-10' : 'pl-10'} pt-2 min-w-[90px]`}>
                    <span
                        className={`text-[5.5rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b ${a.num} select-none`}
                        style={{ opacity: 0.15 }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* Vertical line */}
                    <div className={`flex-1 mt-3 w-[2px] bg-gradient-to-b ${a.gradient} opacity-20 rounded-full min-h-[40px]`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                    {/* Chapter label */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className={`h-[2px] w-8 bg-gradient-to-r ${a.gradient} rounded-full`} />
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] ${a.chapter}`}>
                            Chapter {String(index + 1).padStart(2, '0')}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.14 }}
                        className="text-3xl md:text-[2.75rem] font-black text-gray-900 dark:text-white mb-7 leading-[1.1] tracking-tight"
                    >
                        {title}
                    </motion.h2>

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.22 }}
                        className={`relative rounded-2xl border ${a.border} overflow-hidden`}
                        style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        {/* Overlay — keeps text readable over the photo without blurring it */}
                        <div className="absolute inset-0 bg-white/50 dark:bg-black/60 pointer-events-none" />
                        {/* Top accent bar */}
                        <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${a.gradient}`} />

                        {/* Corner glow accents */}
                        <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${a.gradient} opacity-[0.07] rounded-bl-full`} />
                        <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${a.gradient} opacity-[0.06] rounded-tr-full`} />

                        {/* Lines */}
                        <div className="relative z-10 p-7 md:p-10 space-y-3">
                            {lines.map((line, i) =>
                                line === '' ? (
                                    <div key={i} className="h-3" />
                                ) : line.split(' ').length <= 7 && line.length < 50 && !line.includes(',') ? (
                                    /* Short emphatic line — styled as a quote/callout */
                                    <motion.p
                                        key={`${index}-${i}`}
                                        initial={{ opacity: 0, x: isEven ? -12 : 12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.08 + i * 0.028, duration: 0.48 }}
                                        className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white italic leading-snug"
                                        style={{ fontFamily: '"Dancing Script", cursive' }}
                                    >
                                        {line}
                                    </motion.p>
                                ) : (
                                    /* Prose line */
                                    <motion.p
                                        key={`${index}-${i}`}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 + i * 0.022, duration: 0.55 }}
                                        className="text-gray-700 dark:text-gray-300 text-base md:text-[1.05rem] leading-relaxed"
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
