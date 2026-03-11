import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import useSEO from '../../utils/useSEO';

const Thoughts = () => {
  useSEO(
    "Deep Thoughts & Reflections | Dheerajj.x – Into My Mind",
    "Dive into the mind of Dheerajj.x. Read deep reflections, philosophical essays, and intimate thoughts written with a smart, dark, & fearless perspective.",
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Deep Thoughts & Reflections",
      "description": "Dive into the mind of Dheerajj.x. Read deep reflections, philosophical essays, and intimate thoughts written with a smart, dark, & fearless perspective."
    }
  );
  const [selectedThought, setSelectedThought] = useState(null);
  const [thoughtsData, setThoughtsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const modalRef = useRef(null);

  // ── Open / Close helpers with browser history ──
  const openThought = useCallback((thought) => {
    setSelectedThought(thought);
    window.history.pushState({ thoughtOpen: true }, '');
  }, []);

  const closeThought = useCallback(() => {
    setSelectedThought(null);
  }, []);

  // Listen for browser back button to close modal
  useEffect(() => {
    const handlePopState = (e) => {
      if (selectedThought) {
        // Back was pressed while modal was open → close modal
        setSelectedThought(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedThought]);

  // When closing via X button or overlay click, also pop the history entry we pushed
  const handleCloseThought = useCallback(() => {
    if (selectedThought) {
      window.history.back(); // this triggers popstate → which sets selectedThought to null
    }
  }, [selectedThought]);

  // Fetch thoughts from Database
  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const res = await fetch('http://localhost:201/api/thoughts');
        const data = await res.json();
        if (Array.isArray(data)) {
          setThoughtsData(data);
        }
      } catch (error) {
        console.error("Failed to load essays:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchThoughts();
  }, []);

  // Reading progress tracking
  useEffect(() => {
    const el = modalRef.current;
    if (!el || !selectedThought) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = scrollHeight <= clientHeight ? 100 : (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadProgress(progress);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [selectedThought]);

  // Reset progress when modal opens
  useEffect(() => {
    if (selectedThought) setReadProgress(0);
  }, [selectedThought]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedThought) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedThought]);

  // Filter unique categories
  const categories = ["All", ...new Set(thoughtsData.map(t => t.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredThoughts = activeCategory === "All"
    ? thoughtsData
    : thoughtsData.filter(t => t.category === activeCategory);

  // Render paragraphs with drop cap on first
  const renderContent = (content) => {
    const paragraphs = (content || "").split('\n\n').filter(p => p.trim());
    return paragraphs.map((paragraph, idx) => {
      if (idx === 0 && paragraph.length > 1) {
        const firstLetter = paragraph[0];
        const rest = paragraph.slice(1);
        return (
          <p key={idx} className="first-paragraph">
            <span
              className="float-left text-6xl md:text-7xl font-black leading-[0.8] mr-3 mt-1 bg-clip-text text-transparent bg-gradient-to-br from-violet-500 to-pink-500"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {firstLetter}
            </span>
            {rest}
          </p>
        );
      }
      return <p key={idx}>{paragraph}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#08080a] pt-28 pb-20 selection:bg-violet-500/30 selection:text-violet-200">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3" />
        {/* Horizontal guide lines */}
        <div className="absolute inset-x-0 top-[20%] h-[1px] bg-gradient-to-r from-transparent via-black/[0.03] dark:via-white/[0.03] to-transparent" />
        <div className="absolute inset-x-0 top-[50%] h-[1px] bg-gradient-to-r from-transparent via-black/[0.03] dark:via-white/[0.03] to-transparent" />
        <div className="absolute inset-x-0 top-[80%] h-[1px] bg-gradient-to-r from-transparent via-black/[0.03] dark:via-white/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400">
              Journal & Essays
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1]"
          >
            Deep Dives.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400">
              Into the Mind.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl font-light italic"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Unfiltered thoughts, philosophical musings, and the quiet chaos of the creative process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed"
          >
            The mind is an endless labyrinth of ideas, observations, and deeply rooted philosophies. In this space, I untangle the complex web of human emotion, technological advancement, and self-discovery. These essays and journal entries serve as a mirror reflecting navigating a modern world where authenticity often battles with sheer noise. I strongly believe that writing is not just a method of communication, but a profound form of cognitive exploration. Each paragraph here is carefully crafted to challenge the status quo, question conventional wisdom, and dig beneath the superficial layers of daily life. Whether we are discussing the intricate nuances of digital aesthetics, the silent struggles of creative burnout, or the relentless pursuit of personal excellence, nothing is off-limits. I invite you to read these reflections slowly. Let the concepts simmer. My goal is not to give you all the answers, but to provoke better questions. Welcome to the unfiltered intellectual journey.
          </motion.div>
        </header>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-lg shadow-gray-500/20'
                : 'bg-gray-200/50 text-gray-600 hover:bg-gray-300/50 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 border border-transparent dark:border-white/5'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Thoughts List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-violet-500" size={40} />
              </div>
            ) : filteredThoughts.map((thought, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', damping: 25 }}
                key={thought._id}
                onClick={() => openThought(thought)}
                className="group cursor-pointer relative bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/5 rounded-3xl p-6 md:p-10 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 overflow-hidden"
              >
                {/* Left glowing accent bar that expands on hover */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${thought.gradient} transform scale-y-50 group-hover:scale-y-100 transition-transform duration-500 rounded-l-3xl`} />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 pl-4">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${thought.gradient}`}>
                        {thought.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                      <span>{thought.readTime}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-colors duration-300">
                      {thought.title}
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                      {thought.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end md:justify-start gap-4 shrink-0">
                    <div className="text-sm font-medium text-gray-400 dark:text-gray-500">
                      {thought.date}
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:border-transparent transition-all duration-300 group-hover:scale-110">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ████  IMMERSIVE READING MODAL  ████ */}
      {/* ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedThought && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={handleCloseThought}
          >
            {/* Centered Modal Card */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-[95vw] md:w-[85vw] lg:w-[72vw] xl:w-[60vw] max-h-[90vh] bg-white dark:bg-[#0c0c10] rounded-3xl shadow-2xl shadow-black/40 overflow-y-auto overflow-x-hidden border border-gray-200/50 dark:border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(139,92,246,0.3) transparent' }}
            >
              {/* ─── Reading Progress Bar ─── */}
              <div className="sticky top-0 z-20 h-1 bg-gray-100 dark:bg-white/5">
                <motion.div
                  className={`h-full bg-gradient-to-r ${selectedThought.gradient} rounded-r-full`}
                  style={{ width: `${readProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* ─── Hero Header Section ─── */}
              <div className="relative overflow-hidden">
                {/* Ambient gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedThought.gradient} opacity-[0.06] dark:opacity-[0.08]`} />
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px]" />

                <div className="relative px-8 md:px-14 lg:px-20 pt-12 pb-10">
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleCloseThought}
                    className="absolute top-6 right-6 md:top-8 md:right-8 w-11 h-11 rounded-full bg-gray-100/80 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>

                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${selectedThought.gradient} mb-8`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                      {selectedThought.category}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight max-w-[90%]"
                  >
                    {selectedThought.title}
                  </motion.h2>

                  {/* Meta Row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center gap-5 mt-7"
                  >
                    {/* Author avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      D
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200" style={{ fontFamily: '"Dancing Script", cursive' }}>
                        Dheerajj.x
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                        <span>{selectedThought.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                        <span>{selectedThought.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative bottom edge */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
              </div>

              {/* ─── Article Body ─── */}
              <div className="px-8 md:px-14 lg:px-20 py-12">
                {/* Pull-quote excerpt */}
                {selectedThought.excerpt && (
                  <motion.blockquote
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative mb-12 pl-6 py-2 border-l-[3px] border-violet-500/50"
                  >
                    <p className="text-lg md:text-xl italic text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                      "{selectedThought.excerpt}"
                    </p>
                  </motion.blockquote>
                )}

                {/* Content with drop cap */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="prose prose-lg dark:prose-invert prose-gray max-w-none
                    prose-p:leading-[1.9] prose-p:text-[1.08rem] md:prose-p:text-[1.12rem]
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-p:mb-7
                    prose-headings:tracking-tight
                    prose-a:text-violet-600 dark:prose-a:text-violet-400
                    prose-blockquote:border-l-violet-500/40
                    prose-strong:text-gray-900 dark:prose-strong:text-white"
                  style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
                >
                  {renderContent(selectedThought.content)}
                </motion.div>

                {/* ─── Decorative Divider ─── */}
                <div className="flex items-center justify-center gap-3 py-14">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${selectedThought.gradient} opacity-60`} />
                  <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
                </div>

                {/* ─── Signature End Section ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center justify-center text-center pb-8"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 dark:from-violet-500/10 dark:to-pink-500/10 flex items-center justify-center mb-4">
                    <div
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500"
                      style={{ fontFamily: '"Dancing Script", cursive' }}
                    >
                      D
                    </div>
                  </div>
                  <div
                    className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600"
                    style={{ fontFamily: '"Dancing Script", cursive' }}
                  >
                    Dheerajj.x
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-600 mt-2 tracking-widest uppercase">
                    Written with intention
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Thoughts;
