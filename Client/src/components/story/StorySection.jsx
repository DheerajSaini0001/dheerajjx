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

// Explicit per-chapter photo mapping (7 chapters)
// Chapter 4 → bg4 | Chapter 7 → bg7
const chapterBgMap = [bg0, bg1, bg2, bg4, bg5, bg6, bg7];


const accentPalette = [
    { from: '#ec4899', to: '#f43f5e', gradient: 'from-pink-500 to-rose-500', bar: 'linear-gradient(90deg,#ec4899,#f43f5e)', glow: 'rgba(236,72,153,0.35)', label: 'text-pink-400', num: 'from-pink-400 via-rose-400 to-red-400' },
    { from: '#8b5cf6', to: '#7c3aed', gradient: 'from-violet-500 to-purple-600', bar: 'linear-gradient(90deg,#8b5cf6,#7c3aed)', glow: 'rgba(139,92,246,0.35)', label: 'text-violet-400', num: 'from-violet-400 via-purple-400 to-indigo-400' },
    { from: '#06b6d4', to: '#3b82f6', gradient: 'from-cyan-500 to-blue-500', bar: 'linear-gradient(90deg,#06b6d4,#3b82f6)', glow: 'rgba(6,182,212,0.35)', label: 'text-cyan-400', num: 'from-cyan-400 via-sky-400 to-blue-400' },
    { from: '#f59e0b', to: '#f97316', gradient: 'from-amber-400 to-orange-500', bar: 'linear-gradient(90deg,#f59e0b,#f97316)', glow: 'rgba(245,158,11,0.32)', label: 'text-amber-400', num: 'from-amber-400 via-orange-400 to-red-400' },
    { from: '#10b981', to: '#14b8a6', gradient: 'from-emerald-500 to-teal-500', bar: 'linear-gradient(90deg,#10b981,#14b8a6)', glow: 'rgba(16,185,129,0.32)', label: 'text-emerald-400', num: 'from-emerald-400 via-teal-400 to-cyan-400' },
    { from: '#d946ef', to: '#ec4899', gradient: 'from-fuchsia-500 to-pink-500', bar: 'linear-gradient(90deg,#d946ef,#ec4899)', glow: 'rgba(217,70,239,0.35)', label: 'text-fuchsia-400', num: 'from-fuchsia-400 via-pink-400 to-rose-400' },
    { from: '#f87171', to: '#ec4899', gradient: 'from-rose-400 to-pink-500', bar: 'linear-gradient(90deg,#f87171,#ec4899)', glow: 'rgba(248,113,113,0.32)', label: 'text-rose-400', num: 'from-rose-400 via-pink-400 to-fuchsia-400' },
];

const StorySection = ({ title, lines, index = 0 }) => {
    const bgImage = chapterBgMap[index] ?? storyBgs[index % storyBgs.length];
    const a = accentPalette[index % accentPalette.length];
    const isEven = index % 2 === 0;

    // split lines into emphatic (short) vs prose
    const emphatic = (line) =>
        line !== '' && line.split(' ').length <= 7 && line.length < 50 && !line.includes(',');

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 45, damping: 14 }}
            className="relative"
        >
            {/* ── Big floating chapter number watermark ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
                className={`absolute -top-8 ${isEven ? '-left-4 md:-left-10' : '-right-4 md:-right-10'} select-none pointer-events-none z-0`}
            >
                <span
                    className={`text-[9rem] md:text-[13rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b ${a.num}`}
                    style={{ opacity: 0.08 }}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>
            </motion.div>

            {/* ── Layout: photo left/right alternating ── */}
            <div className={`relative z-10 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/5`}>

                {/* ── PHOTO PANEL ── */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.1, type: 'spring', stiffness: 50 }}
                    className="relative lg:w-[42%] shrink-0 min-h-[320px] lg:min-h-[560px] overflow-hidden"
                >
                    <img
                        src={bgImage}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                    />
                    {/* Photo overlay gradient */}
                    <div
                        className={`absolute inset-0 ${isEven
                            ? 'bg-gradient-to-r from-transparent via-transparent to-black/60 dark:to-black/80'
                            : 'bg-gradient-to-l from-transparent via-transparent to-black/60 dark:to-black/80'
                            }`}
                    />
                    {/* Bottom fade */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Chapter badge on photo */}
                    <div className="absolute top-6 left-6 flex flex-col gap-1">
                        <div
                            className="w-10 h-[3px] rounded-full"
                            style={{ background: a.bar }}
                        />
                        <span
                            className={`text-[10px] font-black uppercase tracking-[0.35em] ${a.label}`}
                        >
                            Chapter {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Big number on photo (bottom) */}
                    <div className="absolute bottom-4 right-5">
                        <span
                            className={`text-[5rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b ${a.num} select-none`}
                            style={{ opacity: 0.35 }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                </motion.div>

                {/* ── CONTENT PANEL ── */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.2, type: 'spring', stiffness: 50 }}
                    className="flex-1 flex flex-col justify-center relative overflow-hidden bg-white dark:bg-[#0d0d0d] p-10 md:p-14 lg:p-16"
                >
                    {/* Accent glow blob behind content */}
                    <div
                        className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
                        style={{ background: a.glow, opacity: 0.25 }}
                    />
                    <div
                        className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-[80px] pointer-events-none"
                        style={{ background: a.glow, opacity: 0.15 }}
                    />

                    {/* Top accent bar */}
                    <div className="w-16 h-[3px] rounded-full mb-8" style={{ background: a.bar }} />

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-10"
                    >
                        {title}
                    </motion.h2>

                    {/* Lines */}
                    <div className="space-y-4 relative z-10">
                        {lines.map((line, i) =>
                            line === '' ? (
                                <div key={i} className="h-2" />
                            ) : emphatic(line) ? (
                                /* ── Emphatic short line ── */
                                <motion.p
                                    key={`${index}-${i}`}
                                    initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.03, duration: 0.5 }}
                                    className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white italic leading-snug"
                                    style={{ fontFamily: '"Dancing Script", cursive', background: `linear-gradient(90deg, ${a.from}, ${a.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                >
                                    {line}
                                </motion.p>
                            ) : (
                                /* ── Prose line ── */
                                <motion.p
                                    key={`${index}-${i}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.08 + i * 0.025, duration: 0.5 }}
                                    className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-light"
                                >
                                    {line}
                                </motion.p>
                            )
                        )}
                    </div>

                    {/* Bottom accent line */}
                    <div className="mt-12 flex items-center gap-4">
                        <div className="h-[1px] w-12 rounded-full" style={{ background: a.bar }} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${a.label} opacity-60`}>
                            {String(index + 1).padStart(2, '0')} / {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default StorySection;
