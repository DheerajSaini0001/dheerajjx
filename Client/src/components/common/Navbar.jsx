import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const darkMode = theme !== "light";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Memories', path: '/memories' },
    { name: 'Thoughts', path: '/thoughts' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? `${darkMode == 1 ? "bg-white/70" : "bg-gray-900/70"} backdrop-blur-md shadow-lg ${darkMode == 1
          ? "border-b border-gray-200/50"
          : "border-b border-gray-700/50"
        }`
        : 'bg-transparent'
        }`}
    >
      <div className={`${darkMode == 1 ? "bg-white" : "bg-gray-900/70"} backdrop-blur-md shadow-lg ${darkMode == 1
        ? "border-b border-gray-200/50"
        : "border-b border-gray-700/50"
        }container mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={` flex items-center justify-between h-20`}>

          {/* Logo */}
          <Link to="/" className="relative z-50">
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Dheerajj.x
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const [isHovered, setIsHovered] = useState(false);
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative px-4 py-2 text-sm font-medium group transition-transform active:scale-95"
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Pill with bounce */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}

                      {!isActive && (
                        <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 ${darkMode == 1 ? "bg-gray-100" : "bg-gray-800"
                          }`} />
                      )}

                      <span
                        className={`relative z-10 transition-colors duration-200 ${isActive
                          ? "text-white font-bold"
                          : darkMode == 1
                            ? "text-gray-600"
                            : "text-gray-300"
                          }`}
                      >
                        {link.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${darkMode == 1
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode == 1 ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
                </motion.div>
              </AnimatePresence>
            </button>

            <Button
              to="/admin/login"
              variant="primary"
              size="sm"
              className="rounded-full px-6"
            >
              Login
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden z-50 flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${darkMode == 1
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode == 1 ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
                </motion.div>
              </AnimatePresence>
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full ${darkMode == 1
                ? "bg-gray-100 text-gray-800"
                : "bg-gray-800 text-white"
                }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode == 1 ? "bg-white/95" : "bg-gray-900/95"} backdrop-blur-xl border-t ${darkMode == 1
              ? "border-gray-200"
              : "border-gray-800"
              } md:hidden overflow-hidden`}
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-semibold ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : darkMode == 1
                        ? 'text-gray-600 hover:bg-gray-50'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  to="/admin/login"
                  variant="primary"
                  className="w-full justify-center rounded-xl py-3"
                  onClick={() => setIsOpen(false)}
                >
                  Access Admin
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
