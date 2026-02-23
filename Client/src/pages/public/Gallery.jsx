import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Import images
import img0 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.58.jpeg';
import img1 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.59 (1).jpeg';
import img2 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.34.59.jpeg';
import img3 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.09.jpeg';
import img4 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10 (1).jpeg';
import img5 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10 (2).jpeg';
import img6 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.10.jpeg';
import img7 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.11.jpeg';
import img8 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.12 (1).jpeg';
import img9 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.12.jpeg';
import img10 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.36.13.jpeg';
import img11 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.38.30 (1).jpeg';
import img12 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.38.30.jpeg';
import img13 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.39.jpeg';
import img14 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40 (1).jpeg';
import img15 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40 (2).jpeg';
import img16 from '../../assets/images/MyStory/WhatsApp Image 2026-02-20 at 10.43.40.jpeg';

const allImages = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16];

// Assign mock data and sophisticated "Bento Grid" sizing
const galleryData = allImages.map((src, index) => {
  // Generate editorial categories
  const categories = ['All', 'Editorial', 'Raw', 'Studio', 'Cinematic'];
  const category = categories[(index % 4) + 1];

  // Bento grid classes - some tall, some wide, some large, mostly squares
  let gridClass = "col-span-1 row-span-1 aspect-square";
  let isTall = false;

  if (index === 0) gridClass = "col-span-2 row-span-2 aspect-square md:aspect-auto"; // Hero
  else if (index === 3 || index === 8) { gridClass = "col-span-1 row-span-2 aspect-[1/2]"; isTall = true; } // Tall
  else if (index === 5 || index === 13) gridClass = "col-span-2 row-span-1 aspect-[2/1]"; // Wide

  return {
    id: index,
    src,
    category,
    gridClass,
    isTall,
    title: `Frame ${String(index + 1).padStart(3, '0')}`,
    iso: `ISO ${[100, 200, 400, 800, 1600][index % 5]}`,
    shutter: `1/${[125, 250, 500, 1000][index % 4]}s`,
    aperture: `f/${['1.4', '1.8', '2.8', '4.0'][index % 4]}`,
  };
});

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
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentImage = images[currentIndex];

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.8, filter: 'blur(10px)' }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0, scale: 1.1, filter: 'blur(10px)' })
  };

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
        <div className="flex gap-4">
          <span className="text-white/50 font-mono tracking-widest text-xs uppercase border border-white/20 px-3 py-1 rounded-full">{currentImage.title}</span>
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
            src={currentImage.src}
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
          className="absolute left-4 md:left-10 w-16 h-16 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md z-[120] transition-all hover:scale-110 group"
        >
          <svg className="transform group-hover:-translate-x-1 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 w-16 h-16 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md z-[120] transition-all hover:scale-110 group"
        >
          <svg className="transform group-hover:translate-x-1 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Camera Metadata Bar */}
      <div
        className="absolute bottom-8 inset-x-0 flex flex-col md:flex-row items-center justify-center gap-4 text-white z-[120]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex gap-3 text-xs font-mono tracking-widest opacity-60">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">{currentImage.iso}</span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">{currentImage.aperture}</span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">{currentImage.shutter}</span>
        </div>
        <div className="hidden md:block w-12 h-[1px] bg-white/20" />
        <span className="font-semibold tracking-[0.3em] uppercase text-sm bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">
          {currentImage.category}
        </span>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-pink-500 transition-all duration-300 z-[120]" style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }} />
    </motion.div>
  );
};

const Gallery = () => {
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const categories = ['All', 'Editorial', 'Raw', 'Studio', 'Cinematic'];
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-32 mt-10 md:mt-20 border-b border-white/10 pb-10"
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

        {/* Advanced Bento/Masonry Grid */}
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
                key={img.id}
                onClick={() => setModalIndex(galleryData.findIndex(item => item.id === img.id))}
                className={`group relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-200 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 hover:border-gray-400 dark:hover:border-white/20 transition-colors ${img.gridClass}`}
              >
                {/* Stunning B&W to Color Hover Effect */}
                <img
                  src={img.src}
                  alt={img.title}
                  className={`w-full h-full ${img.isTall ? 'object-cover md:object-[center_20%]' : 'object-cover'} 
                                        filter grayscale-[100%] contrast-125 brightness-75 
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
                  Vol. 01 / {String(img.id + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
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
