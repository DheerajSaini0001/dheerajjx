import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Thoughts = () => {
  const [selectedThought, setSelectedThought] = useState(null);
  const [thoughtsData, setThoughtsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Filter unique categories
  const categories = ["All", ...new Set(thoughtsData.map(t => t.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredThoughts = activeCategory === "All"
    ? thoughtsData
    : thoughtsData.filter(t => t.category === activeCategory);

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
                onClick={() => setSelectedThought(thought)}
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

      {/* Reading Modal */}
      <AnimatePresence>
        {selectedThought && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedThought(null)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full md:w-[600px] lg:w-[800px] h-full bg-white dark:bg-[#0a0a0c] shadow-2xl border-l border-gray-200 dark:border-white/10 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Reading Progress/Accent */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${selectedThought.gradient} sticky top-0 z-10`} />

              <div className="p-8 md:p-14 relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedThought(null)}
                  className="absolute top-8 right-8 md:top-10 md:right-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Meta */}
                <div className="space-y-6 mt-6">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <span className={`text-xs font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${selectedThought.gradient}`}>
                      {selectedThought.category}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                    {selectedThought.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500 border-b border-gray-200 dark:border-white/10 pb-8">
                    <span>{selectedThought.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <span>{selectedThought.readTime}</span>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-lg dark:prose-invert prose-gray max-w-none pt-6 prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300">
                    {(selectedThought.content || "").split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Signature End */}
                  <div className="pt-16 pb-12 flex flex-col items-center justify-center text-center opacity-50">
                    <div className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700" style={{ fontFamily: '"Dancing Script", cursive' }}>
                      Dheerajj.x
                    </div>
                    <div className="h-[1px] w-12 bg-gray-300 dark:bg-gray-700 mt-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Thoughts;
