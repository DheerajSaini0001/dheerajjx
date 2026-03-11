import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSEO from '../../utils/useSEO';

import StoryHero from '../../components/story/StoryHero';
import StorySection from '../../components/story/StorySection';
import StoryHighlight from '../../components/story/StoryHighlight';
import StorySignature from '../../components/story/StorySignature';

const API = import.meta.env.VITE_API_URL || 'http://localhost:201';

// ── Static fallback (shown instantly; replaced once API responds) ────────────
const FALLBACK_HIGHLIGHTS = [
  { icon: '🎯', label: 'Vision', value: 'Build experiences that matter', color: 'from-pink-500 to-rose-500', glow: 'hover:shadow-pink-500/20' },
  { icon: '🌙', label: 'Style', value: 'Dark, bold, and unapologetic', color: 'from-violet-500 to-purple-600', glow: 'hover:shadow-violet-500/20' },
  { icon: '📸', label: 'Craft', value: 'Storytelling through content', color: 'from-blue-500 to-cyan-500', glow: 'hover:shadow-blue-500/20' },
  { icon: '🔥', label: 'Energy', value: 'Relentless & fiercely creative', color: 'from-amber-500 to-orange-500', glow: 'hover:shadow-amber-500/20' },
];

const FALLBACK_CHAPTERS = [
  { title: 'Not Built Overnight', lines: ["I wasn't built in comfort.", 'I was built in moments no one saw.', '', 'In quiet rooms where the only sound was the hum of ambitious thoughts clashing against silence.', 'In long nights spent staring at glaring screens, debugging both code and mindset.', 'In battles that never made it to social media, fighting self-doubt and the overwhelming urge to settle for mediocrity.', '', 'There were phases where I felt completely lost —', 'not because I lacked ability,', "but because I hadn't yet discovered the depth of my true strength.", '', "And strength doesn't miraculously appear when you need it.", "It's forged through the pressure of consistent, unyielding resistance. Every failure was just a blueprint for future success. The foundation of anything great is laid in the dark, away from applause and validation. I learned to embrace the shadows of anonymity because that is where genuine transformation occurs. The grit required to push through the early days of uncertainty became the very architecture of my character."] },
  { title: 'The Process of Becoming', lines: ['There was a time I foolishly waited —', 'for cosmic clarity,', 'for sudden confidence,', 'for the mythological "right moment." I thought inspiration would strike like lightning and carry me forward.', '', 'Then I understood something incredibly powerful, a paradigm shift that altered my trajectory completely:', '', 'Clarity comes exclusively from action.', 'Confidence is a byproduct of relentless discipline and repeated execution.', 'The right moment is never found — it is actively created by those bold enough to start before they feel ready.', '', 'So I stopped waiting for permission.', '', 'I started building — slowly, silently, and consistently. Day by day, line by line, pixel by pixel.', '', 'I stripped away the need to impress the world.', 'I was no longer seeking external validation. I was building solely to prove something to myself. My work became a dialogue between my ambition and my reality.'] },
  { title: 'The Invisible Growth', lines: ['Growth is a remarkably strange phenomenon.', '', "It rarely feels exciting while it’s happening.", 'Most of the time, it feels profoundly lonely. You are shedding old skin, outgrowing familiar environments and comfortable mindsets.', "Sometimes it feels like you're impossibly behind everyone else who seems to be sprinting effortlessly.", '', 'But when I look back, I realize every paralyzing doubt shaped my unshakeable resilience.', 'Every temporary setback sharpened my analytical mindset and forced me to pivot with precision.', 'Every insurmountable challenge fundamentally forced me to level up my skills and my emotional intelligence.', '', 'Once you stop running in someone else’s lane, a deep peace settles in. I stopped competing with the curated highlights of people on the internet.', "And I started fiercely competing with yesterday's version of myself.", '', 'That solitary realization changed absolutely everything. I became my own benchmark.'] },
  { title: 'The Shift', lines: ['At some pivotal point, the narrative clicked. I realized with absolute certainty:', '', 'You can either be perpetually controlled by your external circumstances, becoming a victim of your environment,', 'or you can take absolute control over your response to them. Between stimulus and response, there is a space where true power lies.', '', 'I deliberately chose total ownership.', '', 'Ownership of my destructive habits and my constructive routines.', 'Ownership of where I direct my creative and physical energy.', 'Ownership of the trajectory of my ultimate future.', '', 'And when you finally take true, unwavering ownership of your existence,', 'excuses simply evaporate into nothingness. You no longer blame time, resources, or timing. You just do the work.'] },
  { title: 'Who I Am Now', lines: ["I'm certainly not perfect.", "I'm definitely not finished.", '', "I am constantly evolving, adapting, and refining my edge.", '', 'I firmly believe in profound depth over superficial noise.', 'I choose unyielding discipline over fleeting, emotional motivation.', 'I value steady, measurable progress over cheap, temporary attention.', 'I strive for lasting impact over hollow popularity.', '', 'I move through the noise with deliberate intention. Every action has a purpose, every project has a philosophy.', 'I build with infinite patience, understanding that masterpieces require time.', 'I think miles beyond the immediate surface, seeking extreme underlying architectures of thought.', '', 'And I will never, ever underestimate the compounding power of small, consistent, daily improvements.'] },
  { title: 'Why This Space Exists', lines: ['Let me be clear: this digital space is not here to broadcast a flawless, manufactured perfection.', '', "It exists to honestly document the raw, authentic journey.", '', 'The messy growth.', 'The hard-earned lessons.', 'The pivotal mindset shifts that altered my perspective on what is possible.', 'The continuous, unapologetic evolution of a creator.', '', 'Because one day, years from now, when I pause to look back at the trail I’ve blazed,', 'I want to see undeniable, documented proof', "that I didn't stay stagnant in the comfort zone.", '', 'And my deepest hope is that maybe someone reading these words,', 'someone who feels stuck or unseen,', 'will find a spark of courage here', 'and decide to keep going against all odds too.'] },
  { title: 'The Promise to Myself', lines: ['No matter how far this journey takes me, no matter the heights I reach or the depths I explore —', 'I make a solemn promise to myself that I will never stop becoming a better version than I was yesterday.', '', 'I don’t necessarily want to become louder.', 'I don’t solely aim to be wealthier.', 'I certainly do not care to be more famous.', '', 'I simply want to be relentlessly better.', '', 'Everything you see here is merely the preface.', '', 'Still actively building.', 'Still exponentially rising.', 'Still infinitely becoming.'] },
];

const FALLBACK_QUOTE = "I don't just create content — I create a feeling. Every post, every word, every moment is a piece of the universe I'm building.";
const FALLBACK_TAGS = ['Still Building', 'Still Rising', 'Still Becoming'];

// ── Chapter themed backgrounds ────────────────────────────────────────────────
const chapterBackgrounds = [
  { lightBg: '#fdf2f8', darkBg: '#0a0008', gradient: { light: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(244,63,94,0.07) 0%, transparent 70%)', dark: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(220,38,38,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(244,63,94,0.08) 0%, transparent 60%)' }, pattern: 'diagonal' },
  { lightBg: '#f5f3ff', darkBg: '#04040f', gradient: { light: 'radial-gradient(ellipse 70% 80% at 80% 60%, rgba(99,102,241,0.08) 0%, transparent 65%)', dark: 'radial-gradient(ellipse 70% 80% at 80% 60%, rgba(99,102,241,0.15) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(139,92,246,0.1) 0%, transparent 55%)' }, pattern: 'dots' },
  { lightBg: '#f0fdfa', darkBg: '#010d10', gradient: { light: 'radial-gradient(ellipse 90% 70% at 15% 40%, rgba(6,182,212,0.08) 0%, transparent 65%)', dark: 'radial-gradient(ellipse 90% 70% at 15% 40%, rgba(6,182,212,0.13) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 85% 80%, rgba(20,184,166,0.1) 0%, transparent 55%)' }, pattern: 'grid' },
  { lightBg: '#fffbeb', darkBg: '#0c0700', gradient: { light: 'radial-gradient(ellipse 80% 60% at 80% 30%, rgba(245,158,11,0.08) 0%, transparent 60%)', dark: 'radial-gradient(ellipse 80% 60% at 80% 30%, rgba(245,158,11,0.13) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 70%, rgba(234,88,12,0.09) 0%, transparent 55%)' }, pattern: 'diagonal' },
  { lightBg: '#f0fdf4', darkBg: '#010d05', gradient: { light: 'radial-gradient(ellipse 80% 70% at 25% 55%, rgba(16,185,129,0.08) 0%, transparent 65%)', dark: 'radial-gradient(ellipse 80% 70% at 25% 55%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 80% 20%, rgba(52,211,153,0.08) 0%, transparent 55%)' }, pattern: 'grid' },
  { lightBg: '#fdf4ff', darkBg: '#08010d', gradient: { light: 'radial-gradient(ellipse 75% 80% at 70% 40%, rgba(217,70,239,0.08) 0%, transparent 65%)', dark: 'radial-gradient(ellipse 75% 80% at 70% 40%, rgba(217,70,239,0.14) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 15% 70%, rgba(236,72,153,0.09) 0%, transparent 55%)' }, pattern: 'dots' },
  { lightBg: '#fff1f2', darkBg: '#0d0305', gradient: { light: 'radial-gradient(ellipse 85% 65% at 50% 60%, rgba(251,113,133,0.08) 0%, transparent 65%)', dark: 'radial-gradient(ellipse 85% 65% at 50% 60%, rgba(251,113,133,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 5% 30%, rgba(244,63,94,0.1) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 95% 80%, rgba(168,85,247,0.08) 0%, transparent 45%)' }, pattern: 'diagonal' },
];

const patternStyles = {
  diagonal: { backgroundImage: 'repeating-linear-gradient(135deg, rgba(128,128,128,0.04) 0px, rgba(128,128,128,0.04) 1px, transparent 1px, transparent 40px)' },
  dots: { backgroundImage: 'radial-gradient(rgba(128,128,128,0.07) 1px, transparent 1px)', backgroundSize: '24px 24px' },
  grid: { backgroundImage: 'linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(128,128,128,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' },
};

// ── Chapter section wrapper ───────────────────────────────────────────────────
const ChapterSection = ({ section, index, total }) => {
  const theme = chapterBackgrounds[index % chapterBackgrounds.length];
  const patStyle = patternStyles[theme.pattern] || {};

  return (
    <div className="relative w-full" style={{ isolation: 'isolate' }}>
      {/* Light mode bg */}
      <div className="absolute inset-0 dark:hidden" style={{ backgroundColor: theme.lightBg }} />
      <div className="absolute inset-0 dark:hidden pointer-events-none" style={{ background: theme.gradient.light }} />
      {/* Dark mode bg */}
      <div className="absolute inset-0 hidden dark:block" style={{ backgroundColor: theme.darkBg }} />
      <div className="absolute inset-0 hidden dark:block pointer-events-none" style={{ background: theme.gradient.dark }} />
      {/* Shared pattern */}
      <div className="absolute inset-0 pointer-events-none" style={patStyle} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-28 md:py-36">
        <StorySection index={index} title={section.title} lines={section.lines} align={section.align} />
      </div>

      {/* Bottom divider — except last */}
      {index < total - 1 && (
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-black/[0.06] dark:bg-white/[0.04] pointer-events-none" />
      )}
    </div>
  );
};


// ── Main About page ───────────────────────────────────────────────────────────
const About = () => {
  useSEO(
    "My Story | Dheerajj.x – The Journey of a Fearless Soul ",
    "Discover the journey of Dheerajj.x. Unveiling the fearless soul behind the screen, exploring life's deepest mysteries through art, code, and emotion.",
    {
      "@context": "https://schema.org",
      "@type": ["AboutPage", "ProfilePage"],
      "name": "About Dheerajj.x",
      "description": "Discover the journey of Dheerajj.x. Unveiling the fearless soul behind the screen, exploring life's deepest mysteries through art, code, and emotion.",
      "mainEntity": {
        "@type": "Person",
        "name": "Dheerajj.x",
        "url": window.location.origin
      }
    }
  );
  const [highlights, setHighlights] = useState(FALLBACK_HIGHLIGHTS);
  const [chapters, setChapters] = useState(FALLBACK_CHAPTERS);
  const [signatureQuote, setSignatureQuote] = useState(FALLBACK_QUOTE);
  const [signatureTags, setSignatureTags] = useState(FALLBACK_TAGS);

  useEffect(() => {
    fetch(`${API}/api/story`)
      .then(r => r.json())
      .then(data => {
        if (!data || data.error) return;
        if (data.highlights?.length) setHighlights(data.highlights);
        if (data.chapters?.length) setChapters([...data.chapters].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        if (data.signatureQuote) setSignatureQuote(data.signatureQuote);
        if (data.signatureTags?.length) setSignatureTags(data.signatureTags);
      })
      .catch(() => {/* silently use fallbacks */ });
  }, []);

  return (
    <article className="flex flex-col w-full">
      {/* Hero */}
      <section>
        <StoryHero />
      </section>

      {/* Highlights Grid — pass API-driven highlights as prop */}
      <section className="border-t border-gray-200 dark:border-white/5">
        <StoryHighlight highlights={highlights} />
      </section>

      {/* Story Chapters header */}
      <section className="relative w-full bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-0 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.35em] text-pink-500 dark:text-pink-400 font-semibold">The Journey</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Read the Chapters</h2>
            <div className="mt-5 w-16 h-[2px] bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Chapters — rendered from API data */}
        {chapters.map((section, i) => (
          <ChapterSection key={i} section={section} index={i} />
        ))}
      </section>

      {/* Signature — pass API-driven content as props */}
      <aside className="border-t border-gray-200 dark:border-white/5">
        <StorySignature quote={signatureQuote} tags={signatureTags} />
      </aside>
    </article>
  );
};

export default About;
