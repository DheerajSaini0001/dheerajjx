import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Button from './Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Memories', path: '/memories' },
  { name: 'Thoughts', path: '/thoughts' },
  { name: 'Gallery', path: '/gallery' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme !== 'light';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed w-full z-50"
    >
      {/* Top gradient accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-blue-500 bg-[length:200%_100%] animate-gradient-x" />

      {/* Main bar */}
      <div
        className={`w-full transition-all duration-300 ${scrolled
            ? isDark
              ? 'bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/[0.06]'
              : 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-gray-200/60 border-b border-black/[0.06]'
            : isDark
              ? 'bg-gray-950/60 backdrop-blur-md border-b border-white/[0.04]'
              : 'bg-white/60 backdrop-blur-md border-b border-black/[0.04]'
          }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link to="/" className="relative z-50 group flex items-center gap-2">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                Dheerajj.x
              </span>
              {/* Glowing dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.7)] animate-pulse mt-0.5" />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 group"
                >
                  {({ isActive }) => (
                    <>
                      {/* Active animated pill */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/90 to-violet-600/90 shadow-lg shadow-violet-500/30"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        />
                      )}

                      {/* Hover highlight */}
                      {!isActive && (
                        <span
                          className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isDark ? 'bg-white/8' : 'bg-black/6'
                            }`}
                        />
                      )}

                      <span
                        className={`relative z-10 transition-colors duration-200 ${isActive
                            ? 'text-white font-semibold'
                            : isDark
                              ? 'text-gray-300 group-hover:text-white'
                              : 'text-gray-600 group-hover:text-gray-900'
                          }`}
                      >
                        {link.name}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`relative p-2.5 rounded-full transition-all duration-200 overflow-hidden ${isDark
                    ? 'bg-white/8 hover:bg-white/14 text-yellow-300 border border-white/10 hover:border-white/20'
                    : 'bg-black/6 hover:bg-black/10 text-gray-700 border border-black/8 hover:border-black/14'
                  }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={String(isDark)}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Login button */}
              <Link
                to="/admin/login"
                className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white
                  bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-500 hover:via-violet-500 hover:to-pink-500
                  shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50
                  transition-all duration-200 hover:scale-[1.03] active:scale-95"
              >
                Login
                <span className="text-xs opacity-70">→</span>
              </Link>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="md:hidden z-50 flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-full transition-colors ${isDark
                    ? 'bg-white/8 text-yellow-300 border border-white/10'
                    : 'bg-black/6 text-gray-700 border border-black/8'
                  }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={String(isDark)}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-full border transition-colors ${isDark
                    ? 'bg-white/8 text-white border-white/10 hover:bg-white/14'
                    : 'bg-black/6 text-gray-800 border-black/8 hover:bg-black/10'
                  }`}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className={`md:hidden overflow-hidden border-b ${isDark
                ? 'bg-gray-950/95 backdrop-blur-xl border-white/[0.07]'
                : 'bg-white/95 backdrop-blur-xl border-black/[0.06]'
              }`}
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                      ? 'bg-gradient-to-r from-blue-600/15 to-violet-600/15 text-violet-600 dark:text-violet-400 border border-violet-500/20'
                      : isDark
                        ? 'text-gray-300 hover:bg-white/6'
                        : 'text-gray-600 hover:bg-black/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold text-white
                    bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600
                    shadow-lg shadow-violet-500/25"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
