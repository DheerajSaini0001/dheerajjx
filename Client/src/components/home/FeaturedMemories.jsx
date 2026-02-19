import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedMemories = ({ memories }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1, scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    if (!memories) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <section className="py-24 px-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row justify-between items-end text-center md:text-left gap-6">
                    <div className="space-y-2">
                        <span className="text-pink-500 font-medium tracking-wider uppercase text-sm">Life in Frames</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                            Captured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Moments</span>
                        </h2>
                    </div>
                    <Link to="/memories" className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        <span>View Gallery</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {memories.map((memory, index) => (
                        <motion.div
                            key={memory.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className={`relative group ${index === 1 ? 'md:mt-12' : ''}`} // Stagger effect
                        >
                            {/* Polaroid-style Card */}
                            <div className="relative bg-white dark:bg-gray-800 p-3 pb-8 rounded-sm shadow-xl transform transition-transform duration-500 group-hover:rotate-0 rotate-1">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/30 backdrop-blur-sm -rotate-2 z-10" /> {/* Tape effect */}

                                <div className="aspect-[4/5] w-full bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-sm relative">
                                    {/* Placeholder Image - In real app, memory.image would go here */}
                                    <img
                                        src={`https://images.unsplash.com/photo-${index === 0 ? '1492633423870-43d1cd2775eb' : index === 1 ? '1516483638261-f4dbaf036963' : '1523906834658-6e24ef2386f9'}?auto=format&fit=crop&w=800&q=80`}
                                        alt={memory.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

                                    {/* Overlay Content & Interactions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white text-sm font-medium line-clamp-2 mb-3">{memory.preview}</p>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => {
                                                        const url = `${window.location.origin}/memories/${memory.id}`;
                                                        navigator.clipboard.writeText(url);
                                                        alert("Memory link copied to clipboard!");
                                                    }}
                                                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors"
                                                    title="Share Memory"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 px-2 text-center font-handwriting">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 font-serif italic">
                                        {memory.title}
                                    </h3>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 block">
                                        {memory.date}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedMemories;
