import React from 'react';
import { motion } from 'framer-motion';

import StoryHero from '../../components/story/StoryHero';
import StorySection from '../../components/story/StorySection';
import StoryHighlight from '../../components/story/StoryHighlight';
import StorySignature from '../../components/story/StorySignature';

// Each chapter gets its own unique themed background
// light: subtle pastel tints | dark: rich deep color glows
const chapterBackgrounds = [
  {
    // Chapter 01 — Not Built Overnight: Crimson/Red
    lightBg: '#fdf2f8',
    darkBg: '#0a0008',
    gradient: {
      light: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(244,63,94,0.07) 0%, transparent 70%)',
      dark: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(220,38,38,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(244,63,94,0.08) 0%, transparent 60%)',
    },
    pattern: 'diagonal',
  },
  {
    // Chapter 02 — The Process of Becoming: Indigo/Violet cosmos
    lightBg: '#f5f3ff',
    darkBg: '#04040f',
    gradient: {
      light: 'radial-gradient(ellipse 70% 80% at 80% 60%, rgba(99,102,241,0.08) 0%, transparent 65%)',
      dark: 'radial-gradient(ellipse 70% 80% at 80% 60%, rgba(99,102,241,0.15) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(139,92,246,0.1) 0%, transparent 55%)',
    },
    pattern: 'dots',
  },
  {
    // Chapter 03 — The Invisible Growth: Teal/Ocean
    lightBg: '#f0fdfa',
    darkBg: '#010d10',
    gradient: {
      light: 'radial-gradient(ellipse 90% 70% at 15% 40%, rgba(6,182,212,0.08) 0%, transparent 65%)',
      dark: 'radial-gradient(ellipse 90% 70% at 15% 40%, rgba(6,182,212,0.13) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 85% 80%, rgba(20,184,166,0.1) 0%, transparent 55%)',
    },
    pattern: 'grid',
  },
  {
    // Chapter 04 — The Shift: Amber/Orange dusk
    lightBg: '#fffbeb',
    darkBg: '#0c0700',
    gradient: {
      light: 'radial-gradient(ellipse 80% 60% at 80% 30%, rgba(245,158,11,0.08) 0%, transparent 60%)',
      dark: 'radial-gradient(ellipse 80% 60% at 80% 30%, rgba(245,158,11,0.13) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 70%, rgba(234,88,12,0.09) 0%, transparent 55%)',
    },
    pattern: 'diagonal',
  },
  {
    // Chapter 05 — Who I Am Now: Emerald forest
    lightBg: '#f0fdf4',
    darkBg: '#010d05',
    gradient: {
      light: 'radial-gradient(ellipse 80% 70% at 25% 55%, rgba(16,185,129,0.08) 0%, transparent 65%)',
      dark: 'radial-gradient(ellipse 80% 70% at 25% 55%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 80% 20%, rgba(52,211,153,0.08) 0%, transparent 55%)',
    },
    pattern: 'grid',
  },
  {
    // Chapter 06 — Why This Space Exists: Fuchsia nebula
    lightBg: '#fdf4ff',
    darkBg: '#08010d',
    gradient: {
      light: 'radial-gradient(ellipse 75% 80% at 70% 40%, rgba(217,70,239,0.08) 0%, transparent 65%)',
      dark: 'radial-gradient(ellipse 75% 80% at 70% 40%, rgba(217,70,239,0.14) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 15% 70%, rgba(236,72,153,0.09) 0%, transparent 55%)',
    },
    pattern: 'dots',
  },
  {
    // Chapter 07 — The Promise to Myself: Rose gold sunrise
    lightBg: '#fff1f2',
    darkBg: '#0d0305',
    gradient: {
      light: 'radial-gradient(ellipse 85% 65% at 50% 60%, rgba(251,113,133,0.08) 0%, transparent 65%)',
      dark: 'radial-gradient(ellipse 85% 65% at 50% 60%, rgba(251,113,133,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 5% 30%, rgba(244,63,94,0.1) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 95% 80%, rgba(168,85,247,0.08) 0%, transparent 45%)',
    },
    pattern: 'diagonal',
  },
];

const patternStyles = {
  diagonal: {
    backgroundImage:
      'repeating-linear-gradient(135deg, rgba(128,128,128,0.04) 0px, rgba(128,128,128,0.04) 1px, transparent 1px, transparent 40px)',
  },
  dots: {
    backgroundImage: 'radial-gradient(rgba(128,128,128,0.07) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
  },
  grid: {
    backgroundImage:
      'linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(128,128,128,0.05) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
  },
};

const storySections = [
  {
    title: 'Not Built Overnight',
    align: 'left',
    lines: [
      "I wasn't built in comfort.",
      'I was built in moments no one saw.',
      '',
      'In quiet rooms.',
      'In long nights.',
      'In battles that never made it to social media.',
      '',
      'There were phases where I felt lost —',
      'not because I lacked ability,',
      "but because I hadn't yet discovered my strength.",
      '',
      "And strength doesn't appear.",
      "It's forged.",
    ],
  },
  {
    title: 'The Process of Becoming',
    align: 'right',
    lines: [
      'There was a time I waited —',
      'for clarity,',
      'for confidence,',
      'for the "right moment."',
      '',
      'Then I understood something powerful:',
      '',
      'Clarity comes from action.',
      'Confidence comes from discipline.',
      'The right moment is created — not found.',
      '',
      'So I stopped waiting.',
      '',
      'I started building — slowly, silently, consistently.',
      '',
      'Not to impress the world.',
      'But to prove something to myself.',
    ],
  },
  {
    title: 'The Invisible Growth',
    align: 'left',
    lines: [
      'Growth is strange.',
      '',
      "It doesn't always feel exciting.",
      'Sometimes it feels lonely.',
      "Sometimes it feels like you're behind.",
      '',
      'But every doubt shaped my resilience.',
      'Every setback sharpened my mindset.',
      'Every challenge forced me to level up.',
      '',
      'I stopped competing with people.',
      "And started competing with yesterday's version of me.",
      '',
      'That changed everything.',
    ],
  },
  {
    title: 'The Shift',
    align: 'right',
    lines: [
      'At some point, I realized:',
      '',
      'You can either be controlled by your circumstances',
      'or you can control your response to them.',
      '',
      'I chose ownership.',
      '',
      'Ownership of my habits.',
      'Ownership of my energy.',
      'Ownership of my future.',
      '',
      'And when you take ownership,',
      'excuses disappear.',
    ],
  },
  {
    title: 'Who I Am Now',
    align: 'left',
    lines: [
      "I'm not perfect.",
      "I'm not finished.",
      '',
      "I'm evolving.",
      '',
      'I believe in depth over noise.',
      'Discipline over motivation.',
      'Progress over attention.',
      'Impact over popularity.',
      '',
      'I move with intention.',
      'I build with patience.',
      'I think beyond the surface.',
      '',
      'And I never underestimate the power of small daily improvements.',
    ],
  },
  {
    title: 'Why This Space Exists',
    align: 'right',
    lines: [
      'This space is not here to show perfection.',
      '',
      "It's here to show the journey.",
      '',
      'The growth.',
      'The lessons.',
      'The mindset shifts.',
      'The evolution.',
      '',
      'Because one day, when I look back,',
      'I want to see proof',
      "that I didn't stay the same.",
      '',
      'And maybe someone reading this',
      'will find the courage',
      'to keep going too.',
    ],
  },
  {
    title: 'The Promise to Myself',
    align: 'left',
    lines: [
      'No matter how far I go —',
      'I will never stop becoming better than I was.',
      '',
      'Not louder.',
      'Not richer.',
      'Not more popular.',
      '',
      'Better.',
      '',
      'This is only the beginning.',
      '',
      'Still building.',
      'Still rising.',
      'Still becoming.',
    ],
  },
];

// ChapterSection uses a JS style object to swap bg based on dark class on <html>
// We use CSS custom properties via inline style + data attributes approach.
// Simpler: render both a light and dark layer, switch via dark: class on a wrapper.
const ChapterSection = ({ section, index }) => {
  const theme = chapterBackgrounds[index % chapterBackgrounds.length];
  const patStyle = patternStyles[theme.pattern] || {};

  return (
    <div className="relative w-full" style={{ isolation: 'isolate' }}>
      {/* Light mode background */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{ backgroundColor: theme.lightBg, background: `${theme.lightBg}` }}
      />
      <div
        className="absolute inset-0 dark:hidden pointer-events-none"
        style={{ background: theme.gradient.light }}
      />

      {/* Dark mode background */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ backgroundColor: theme.darkBg }}
      />
      <div
        className="absolute inset-0 hidden dark:block pointer-events-none"
        style={{ background: theme.gradient.dark }}
      />

      {/* Shared pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={patStyle}
      />

      {/* Decorative chapter number watermark */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className={`absolute top-10 ${index % 2 === 0 ? 'left-4 md:left-10' : 'right-4 md:right-10'
          } z-20 hidden md:block`}
      >
        <span className="text-[11rem] font-black leading-none select-none text-black/[0.04] dark:text-white/[0.04]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Story section content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 py-24">
        <StorySection
          index={index}
          title={section.title}
          lines={section.lines}
          align={section.align}
        />
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-black/[0.06] dark:bg-white/[0.04] pointer-events-none" />
    </div>
  );
};

const About = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <StoryHero />

      {/* Highlights Grid */}
      <div className="border-t border-gray-200 dark:border-white/5">
        <StoryHighlight />
      </div>

      {/* Story Chapters — Section header */}
      <div className="relative w-full bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-pink-500 dark:text-pink-400 font-semibold">
              The Journey
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              Read the Chapters
            </h2>
            <div className="mt-5 w-16 h-[2px] bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Each chapter with its own themed background */}
      {storySections.map((section, i) => (
        <ChapterSection key={i} section={section} index={i} />
      ))}

      {/* Signature closer */}
      <div className="border-t border-gray-200 dark:border-white/5">
        <StorySignature />
      </div>
    </div>
  );
};

export default About;
