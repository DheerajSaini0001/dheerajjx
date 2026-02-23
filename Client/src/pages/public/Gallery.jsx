import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Advanced Full-Screen Carousel
const CarouselModal = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose]);

  const currentImage = images[currentIndex];

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.8, filter: 'blur(10px)' }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0, scale: 1.1, filter: 'blur(10px)' })
  };

  if (!currentImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center"
      onClick={onClose}
    >
      {/* Cinematic Letterbox Top/Bottom */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent z-[110] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-[110] pointer-events-none" />

      {/* Top Bar Navigation */}
      <div className="absolute top-0 inset-x-0 px-6 py-8 flex justify-between items-center z-[120]" onClick={e => e.stopPropagation()}>
        <div className="flex gap-4 items-center">
          <span className="text-white/50 font-mono tracking-widest text-xs uppercase border border-white/20 px-3 py-1 rounded-full">{currentImage.title}</span>
          <span className="text-white/30 font-mono tracking-widest text-[10px] uppercase">{currentImage.category}</span>
        </div>

        <button
          onClick={onClose}
          className="group relative w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all overflow-hidden"
        >
          <span className="absolute inset-0 bg-pink-500 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
          <svg className="relative z-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Slider Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-20">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={currentImage.imageUrl}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              filter: { duration: 0.4 }
            }}
            className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
          />
        </AnimatePresence>

        {/* Left/Right Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-10 z-[120] w-14 h-14 rounded-full bg-black/50 hover:bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all transform hover:scale-110"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 z-[120] w-14 h-14 rounded-full bg-black/50 hover:bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all transform hover:scale-110"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Camera Metadata Bar */}
      <div className="absolute bottom-8 z-[120] px-8 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hidden md:flex gap-8 divide-x divide-white/10">
        <div className="flex flex-col items-center pl-0">
          <span className="text-[10px] text-white/30 tracking-[0.2em] font-mono leading-none mb-1">ISO</span>
          <span className="text-white text-xs font-mono tracking-widest leading-none">{currentImage.iso}</span>
        </div>
        <div className="flex flex-col items-center pl-8">
          <span className="text-[10px] text-white/30 tracking-[0.2em] font-mono leading-none mb-1">SHUTTER</span>
          <span className="text-white text-xs font-mono tracking-widest leading-none">{currentImage.shutter}</span>
        </div>
        <div className="flex flex-col items-center pl-8">
          <span className="text-[10px] text-white/30 tracking-[0.2em] font-mono leading-none mb-1">APERTURE</span>
          <span className="text-white text-xs font-mono tracking-widest leading-none">{currentImage.aperture}</span>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-pink-500 transition-all duration-300 z-[120]" style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }} />
    </motion.div>
  );
};

const Gallery = () => {
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('http://localhost:201/api/gallery');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Apply dynamic Bento Grid classes upon fetching layout
          const styledData = data.map((img, index) => {
            let gridClass = "col-span-1 row-span-1 aspect-square";
            let isTall = false;

            if (index === 0) gridClass = "col-span-2 row-span-2 aspect-square md:aspect-auto";
            else if (index === 3 || index === 8) { gridClass = "col-span-1 row-span-2 aspect-[1/2]"; isTall = true; }
            else if (index === 5 || index === 13) gridClass = "col-span-2 row-span-1 aspect-[2/1]";

            return { ...img, gridClass, isTall };
          });
          setGalleryData(styledData);
        }
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', ...new Set(galleryData.map(img => img.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalIndex, setModalIndex] = useState(null);

  const filteredImages = activeCategory === 'All'
    ? galleryData
    : galleryData.filter(img => img.category === activeCategory);

  // Filter animations
  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#030303] text-gray-900 dark:text-white pt-28 pb-32 overflow-hidden selection:bg-pink-500/30 selection:text-pink-200">

      {/* Massive scrolling text background */}
      <div className="fixed top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-0 overflow-hidden opacity-[0.02] mix-blend-overlay">
        <motion.h1
          initial={{ x: '0%' }}
          animate={{ x: '-50%' }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="text-[20vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter"
        >
          LOOKBOOK AESTHETIC VISUALS LOOKBOOK AESTHETIC VISUALS
        </motion.h1>
      </div>

      {/* Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8">

        {/* Editorial Header */}
        <motion.header
          style={{ y: yTransform }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-32 mt-10 md:mt-20 border-b border-gray-200 dark:border-white/10 pb-10"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '40px' }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-[2px] bg-gradient-to-r from-pink-500 to-violet-500"
            />
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]"
            >
              The <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-600">Lookbook.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-sm"
          >
            <p className="text-gray-600 dark:text-gray-400 md:text-right font-light leading-relaxed">
              A curated exhibition of visual identity. Grayscale beginnings blooming into vibrant cinematic reality. Documenting raw aesthetics and unapologetic style.
            </p>
            <div className="md:text-right text-pink-500 dark:text-pink-400 mt-4 font-mono text-xs tracking-[0.3em] uppercase">
              Vol. 01 — 2026 Collection
            </div>
          </motion.div>
        </motion.header>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeCategory === cat
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-transparent text-gray-500 border border-gray-300 dark:border-white/10 hover:text-gray-900 dark:hover:text-white hover:border-gray-500 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <Loader2 className="animate-spin text-pink-500" size={40} />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[minmax(180px,auto)]">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5, type: 'spring', damping: 25 }}
                  key={img._id}
                  onClick={() => setModalIndex(galleryData.findIndex(item => item._id === img._id))}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-200 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 hover:border-gray-400 dark:hover:border-white/20 transition-colors ${img.gridClass}`}
                >
                  {/* Stunning B&W to Color Hover Effect */}
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className={`w-full h-full object-cover filter grayscale-[100%] contrast-125 brightness-75 
                                group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 
                                transform group-hover:scale-105 transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]`}
                    loading="lazy"
                  />

                  {/* Internal Grid Lines (Scanner effect on hover) */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay" />

                  {/* Typography overlays */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 group-hover:translate-x-0">
                    <div className="text-white text-sm md:text-lg font-black tracking-widest uppercase shadow-black drop-shadow-lg">
                      {img.title}
                    </div>
                    <div className="text-pink-400 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase mt-1">
                      {img.category}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0 text-right">
                    <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xl ml-auto mb-3 hover:bg-white hover:text-black transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                    </div>
                  </div>

                  {/* Persistent subtle corner tag */}
                  <div className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-white/40 uppercase group-hover:opacity-0 transition-opacity">
                    Vol. 01 / {img.shutter}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-40 uppercase tracking-[0.3em] text-gray-500 dark:text-white/30 font-bold"
          >
            No frames recovered.
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <CarouselModal
            images={galleryData}
            initialIndex={modalIndex}
            onClose={() => setModalIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
