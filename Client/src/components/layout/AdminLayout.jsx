import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  Image as ImageIcon,
  BookOpen,
  BookText,
  LogOut,
  Sun,
  Moon,
  Settings,
  User,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme !== 'light';
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Sidebar navigation items
  const navItems = [
    { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/admin/manage-memories', label: 'Memories', icon: ImageIcon },
    { path: '/admin/thoughts', label: 'Thoughts', icon: BookOpen },
    { path: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
    { path: '/admin/story', label: 'My Story', icon: BookText },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo Area */}
      <div className="h-24 flex items-center px-8 border-b border-gray-200 dark:border-white/5 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
          Command<span className="text-violet-500">.</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-10 px-6 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 pl-2">Menu</div>

        {navItems.map((item) => {
          const Icon = item.icon;
          // Check if current route matches item path or starts with it (for nested routes)
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all group relative overflow-hidden ${isActive
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
              )}
              <Icon size={20} className={`relative z-10 ${isActive ? 'text-white' : 'group-hover:text-violet-500 transition-colors'}`} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Settings / Logout */}
      <div className="p-6 border-t border-gray-200 dark:border-white/5 space-y-2 shrink-0 bg-white dark:bg-[#0a0a0a]">
        <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all group">
          <Settings size={20} className="group-hover:text-violet-500 transition-colors" />
          <span>Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex selection:bg-violet-500/30 selection:text-violet-200 font-sans">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] fixed inset-y-0 left-0 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/5 z-30 transition-colors">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] flex flex-col bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/5 z-50 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-[280px] flex flex-col min-h-screen w-full transition-all relative z-10">

        {/* Topbar/Header */}
        <header className="h-20 lg:h-24 px-4 md:px-10 flex items-center justify-between bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 sticky top-0 z-20 transition-colors">

          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 max-w-md w-full relative">
            <Search size={18} className="absolute left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search records or modules..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white dark:focus:bg-[#111] transition-all dark:placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4 ml-auto lg:ml-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors relative"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-pink-500" />
            </motion.button>

            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={String(isDark)}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={isDark ? 'text-yellow-400' : 'text-gray-600'}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center">
                <User size={18} className="text-gray-700 dark:text-gray-300" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard View Manager - Rendering child routes */}
        <div className="flex-1 relative overflow-x-hidden">
          {/* Background glow for inner area */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
