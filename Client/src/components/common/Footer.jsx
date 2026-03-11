import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Memories', to: '/memories' },
    { label: 'Thoughts', to: '/thoughts' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Instagram', to: '/instagram' },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/dheerajj.x',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: 'X (Twitter)',
      href: 'https://x.com/dheerajjx',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/saini.dheeraj.33',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@dheerajjx',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gray-50 dark:bg-[#050508] border-t border-gray-200/50 dark:border-white/[0.04]">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
          {/* Brand Column */}
          <div className="space-y-5">
            <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
              Dheerajj<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">.x</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed max-w-xs">
              Smart, Dark & Fearless Soul. Exploring the depths of technology, creativity, and human emotion.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/[0.06] flex items-center justify-center text-gray-500 dark:text-gray-500 hover:bg-violet-500 hover:text-white hover:border-violet-500 dark:hover:bg-violet-500 dark:hover:text-white dark:hover:border-violet-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/20"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>


          {/* Connect / Share */}
          <div className="space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-600">
              Share & Connect
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed">
              Like what you see? Share this space with the world. Every share inspires the journey.
            </p>
            {/* Share buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://twitter.com/intent/tweet?url=https://dheerajjx.vercel.app&text=Check%20out%20Dheerajj.x%20–%20Smart,%20Dark%20%26%20Fearless%20Soul"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.06] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://dheerajjx.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.06] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] dark:hover:bg-[#1877F2] dark:hover:text-white dark:hover:border-[#1877F2] transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Share
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://dheerajjx.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.06] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] dark:hover:bg-[#0A66C2] dark:hover:text-white dark:hover:border-[#0A66C2] transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200/50 dark:border-white/[0.04] py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {currentYear} dheerajj.x. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-6">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-xs tracking-wider uppercase text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-400 dark:text-gray-600 italic" style={{ fontFamily: '"Dancing Script", cursive' }}>
            Built with intention. Designed with soul.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
