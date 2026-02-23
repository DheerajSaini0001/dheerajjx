import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const MemoryCard = ({ memory, index, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${memory._id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: (index % 4) * 0.1,
        duration: 0.8,
        type: 'spring',
        stiffness: 50,
        damping: 15
      }}
      whileHover={{ y: -10, scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
      className={`cursor-pointer group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 ${memory.spanClass} border border-transparent hover:border-pink-500/30`}
    >
      {/* Image container */}
      <motion.div layoutId={`image-${memory._id}`} className="absolute inset-0 w-full h-full">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          loading="lazy"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />

      {/* Simple persistent title when NOT hovered */}
      <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white/90 font-bold tracking-wide drop-shadow-md">{memory.title}</h3>
      </div>

      {/* Rich Text content - revealed on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
        <div className="flex items-center gap-2 mb-3 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
            {memory.date}
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-500/20 backdrop-blur-xl border border-pink-500/30 text-pink-200 text-[10px] font-bold uppercase tracking-widest">
            {memory.category}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 leading-tight transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150">
          {memory.title}
        </h3>

        <p
          className="text-pink-300/90 text-xl font-medium italic transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          "{memory.quote}"
        </p>

        <div className="w-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mt-5 rounded-full group-hover:w-full transition-all duration-700 delay-300 ease-out" />
      </div>

      {/* View Icon Corner deco */}
      <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 delay-100">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
    </motion.div>
  );
};



const Memories = () => {
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [memoryData, setMemoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState(null);

  // Fetch from Mongo DB
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await fetch('http://localhost:201/api/memories');
        const data = await res.json();

        // Compute Masonry Layout Sizes dynamically
        const styledData = data.map((memory, i) => {
          let spanClass = "col-span-1 row-span-1"; // Standard 

          // Apply varied grid spans based on index math to create a beautiful async masonry block layout
          if (i === 0 || i % 7 === 0) {
            spanClass = "md:col-span-2 md:row-span-2"; // Large hero memory
          } else if (i % 5 === 0) {
            spanClass = "md:col-span-2 row-span-1"; // Wide memory
          } else if (i % 4 === 0) {
            spanClass = "col-span-1 md:row-span-2"; // Tall memory
          }
          return { ...memory, spanClass };
        });

        setMemoryData(styledData);
      } catch (error) {
        console.error("Failed to fetch memories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemories();
  }, []);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedMemory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMemory]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030305] overflow-hidden pt-24 pb-20 selection:bg-pink-500/30 selection:text-pink-200">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 dark:bg-pink-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 dark:bg-violet-700/10 rounded-full blur-[150px]" />

        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Parallax Header Section */}
        <motion.div
          style={{ y: yTransform, opacity: opacityTransform }}
          className="text-center max-w-4xl mx-auto mb-24 mt-10 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-pink-500/30 dark:border-pink-400/20 bg-pink-500/5 dark:bg-pink-400/5 backdrop-blur-md mx-auto shadow-[0_0_20px_rgba(236,72,153,0.1)]"
          >
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping delay-100" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-pink-600 dark:text-pink-300">
              Digital Archive
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: 'spring', damping: 20 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9]"
          >
            Echoes of <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Time.
              </span>
              <span className="absolute inset-0 blur-2xl opacity-40 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Time.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl md:text-4xl text-gray-600 dark:text-gray-400 font-medium italic mt-6"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Moments captured. Feelings preserved.
          </motion.p>
        </motion.div>

        {/* Loader / Masonry Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <Loader2 size={40} className="animate-spin text-pink-500" />
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Loading Archives...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[280px]">
            {memoryData.map((memory, index) => (
              <MemoryCard
                key={memory._id}
                memory={memory}
                index={index}
                onClick={() => window.location.assign(`/memories/${memory._id}`)}
              />
            ))}
          </div>
        )}

        {/* Footer Message */}
        {!isLoading && memoryData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-40 text-center flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-400">
              ✦
            </div>
            <div className="inline-flex items-center justify-center gap-6 opacity-60">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-gray-500 dark:to-gray-400" />
              <span className="text-gray-500 dark:text-gray-400 font-bold tracking-widest text-xs uppercase">End of Archive</span>
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-gray-500 dark:to-gray-400" />
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default Memories;
