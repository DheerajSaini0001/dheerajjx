import React from 'react';
import { motion } from 'framer-motion';

import StoryHero from '../../components/story/StoryHero';
import StorySection from '../../components/story/StorySection';
import StoryHighlight from '../../components/story/StoryHighlight';
import StorySignature from '../../components/story/StorySignature';

const storySections = [
  {
    title: 'Not Built Overnight',
    align: 'left',
    lines: [
      "I wasn't built in comfort.",
      "I was built in moments no one saw.",
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
      "I stopped competing with people.",
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
    title: "Who I Am Now",
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
      'that I didn\'t stay the same.',
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

const About = () => {
  return (
    <div className="flex flex-col w-full -mt-8 bg-gray-950">
      {/* Hero */}
      <StoryHero />

      {/* Highlights Grid */}
      <div className="border-t border-white/5">
        <StoryHighlight />
      </div>

      {/* Story Chapters */}
      <div className="relative w-full">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-pink-400 font-semibold">The Journey</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">Read the Chapters</h2>
            <div className="mt-5 w-16 h-[2px] bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-20 space-y-32 w-full">
          {storySections.map((section, i) => (
            <StorySection
              key={i}
              index={i}
              title={section.title}
              lines={section.lines}
              align={section.align}
            />
          ))}
        </div>
      </div>

      {/* Signature closer */}
      <div className="border-t border-white/5">
        <StorySignature />
      </div>
    </div>
  );
};

export default About;
