import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Calendar, MapPin, Tag } from 'lucide-react';

const MemoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [memory, setMemory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMemory = async () => {
            try {
                const res = await fetch(`http://localhost:201/api/memories/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setMemory(data);
                } else {
                    console.error('Memory not found');
                    navigate('/memories', { replace: true });
                }
            } catch (error) {
                console.error("Failed to fetch specific memory:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMemory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#030303] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={40} className="animate-spin text-pink-500" />
                    <p className="font-bold uppercase tracking-widest text-sm text-gray-500">Decrypting Memory...</p>
                </div>
            </div>
        );
    }

    if (!memory) return null;

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#030303] text-gray-900 dark:text-white pt-24 md:pt-32 pb-20 selection:bg-pink-500/30 selection:text-pink-200">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-violet-600/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

                {/* Navigation Action */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/memories')}
                    className="group mb-12 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-white/10 transition-colors border border-gray-300 dark:border-white/10">
                        <ArrowLeft size={16} />
                    </div>
                    <span>Back to Archive</span>
                </motion.button>

                {/* Hero Showcase Image */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-200 dark:bg-[#111] shadow-2xl shadow-pink-500/10 group mb-16 border border-gray-300 dark:border-white/10"
                >
                    <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none mix-blend-multiply" />
                </motion.div>

                {/* Content Block */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">

                    {/* Left Meta Data */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-full md:w-1/3 space-y-8"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10">
                                    <Calendar size={18} className="text-pink-500" />
                                </span>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Date</div>
                                    <div className="font-medium text-gray-900 dark:text-white leading-none">{memory.date}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10">
                                    <MapPin size={18} className="text-pink-500" />
                                </span>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Coordinates</div>
                                    <div className="font-medium text-gray-900 dark:text-white leading-none capitalize">{memory.location}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10">
                                    <Tag size={18} className="text-pink-500" />
                                </span>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Classification</div>
                                    <div className="font-medium text-gray-900 dark:text-white leading-none uppercase tracking-wider">{memory.category}</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-gradient-to-r from-gray-300 dark:from-white/10 to-transparent" />

                        <div className="opacity-40">
                            <div className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-500 dark:to-gray-700" style={{ fontFamily: '"Dancing Script", cursive' }}>
                                Dheerajj.x
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Story Structure */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-full md:w-2/3"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white capitalize leading-[1.1] tracking-tight mb-8">
                            {memory.title}
                        </h1>

                        <p className="text-3xl md:text-4xl leading-relaxed text-pink-600 shadow-pink-500 drop-shadow-sm dark:text-pink-300/90 font-medium italic mb-12" style={{ fontFamily: '"Dancing Script", cursive' }}>
                            "{memory.quote}"
                        </p>

                        <div className="prose prose-lg dark:prose-invert prose-gray max-w-none prose-p:leading-loose prose-p:text-gray-600 dark:prose-p:text-gray-400 font-light">
                            <p>
                                The moment captured above holds a specific timestamp within the grander narrative of life.
                                Recorded in <span className="capitalize font-bold text-gray-700 dark:text-white">{memory.location}</span> during the framing of {memory.date}. Space, light, and composition intersect permanently.
                            </p>
                            <p>
                                This digital archive ensures that as time passes, the precise aesthetic feeling
                                and core philosophy behind this single captured second will perpetually echo
                                precisely as it felt originally.
                            </p>
                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default MemoryDetail;
