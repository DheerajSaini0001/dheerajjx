import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    BookOpen,
    X,
    Loader2
} from 'lucide-react';

const ManageThoughts = () => {
    const [thoughts, setThoughts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ _id: '', title: '', category: '', readTime: '', excerpt: '', content: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const token = localStorage.getItem('adminToken');

    // Fetch API
    const fetchThoughts = async () => {
        setIsFetching(true);
        try {
            const res = await fetch('http://localhost:201/api/thoughts');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setThoughts(data);
            } else {
                setThoughts([]);
            }
        } catch (error) {
            console.error("Failed to fetch thoughts", error);
            setThoughts([]);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchThoughts();
    }, []);

    const filteredThoughts = thoughts.filter(t =>
        (t.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (t.category?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const openModal = (thought = null) => {
        setIsEditing(!!thought);
        if (thought) {
            setFormData(thought);
        } else {
            setFormData({ _id: '', title: '', category: '', readTime: '3 min read', excerpt: '', content: '' });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this essay?")) {
            try {
                const res = await fetch(`http://localhost:201/api/thoughts/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setThoughts(thoughts.filter(t => t._id !== id));
                }
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = isEditing
                ? `http://localhost:201/api/thoughts/${formData._id}`
                : `http://localhost:201/api/thoughts`;

            const res = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                if (isEditing) {
                    setThoughts(thoughts.map(t => t._id === data._id ? data : t));
                } else {
                    setThoughts([data, ...thoughts]);
                }
                setIsModalOpen(false);
            } else {
                alert(data.message || "Failed to save essay.");
            }
        } catch (error) {
            console.error("Save thought error:", error);
            alert("Network error.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const categoryOptions = ["Mindset", "Philosophy", "Design", "Growth", "Life", "Engineering"];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 relative">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Manage Thoughts</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                        Draft essays, design perspectives, and philosophy entries.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-64">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search essays..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-gray-900 dark:text-white transition-all shadow-sm"
                        />
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => openModal()}
                        className="shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        <span>Write Essay</span>
                    </button>
                </div>
            </div>

            {/* Data Grid View */}
            <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none">

                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 border-b border-gray-100 dark:border-white/5 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 bg-gray-50/50 dark:bg-white/[0.02]">
                    <div className="col-span-1">ICON</div>
                    <div className="col-span-5">Title & Excerpt</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-2">Read Time</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-white/5 max-h-[60vh] overflow-y-auto min-h-[400px]">
                    {isFetching ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 gap-4">
                            <Loader2 className="animate-spin text-violet-500" size={32} />
                            <p className="text-sm font-bold uppercase tracking-widest">Loading Thoughts...</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredThoughts.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="p-16 flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 mb-2">
                                        <BookOpen size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">No essays found</h3>
                                    <p className="text-gray-500 max-w-sm">No thoughts match this search or your database is empty.</p>
                                </motion.div>
                            ) : (
                                filteredThoughts.map((thought) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={thought._id}
                                        className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center px-6 md:px-8 py-5 hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <div className="col-span-1 hidden md:block">
                                            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 flex flex-col items-center justify-center border border-violet-100 dark:border-violet-500/20">
                                                <BookOpen size={20} />
                                            </div>
                                        </div>

                                        <div className="col-span-5 space-y-1">
                                            <div className="font-bold text-gray-900 dark:text-white capitalize truncate text-lg">
                                                {thought.title}
                                            </div>
                                            <div className="text-sm text-gray-500 line-clamp-1 italic pr-4">
                                                {thought.excerpt}
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                                                {thought.category}
                                            </span>
                                        </div>

                                        <div className="col-span-2 hidden md:block text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {thought.readTime}
                                        </div>

                                        <div className="col-span-2 flex items-center justify-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-white/5">
                                            <button
                                                onClick={() => openModal(thought)}
                                                className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(thought._id)}
                                                className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-white hover:bg-red-500 dark:hover:bg-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isLoading && setIsModalOpen(false)}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex py-10 px-4 items-center justify-center overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: -20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-[#0a0a0c] w-full max-w-3xl rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden shadow-black/50"
                        >
                            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                                <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                                    {isEditing ? 'Edit Essay' : 'Draft New Essay'}
                                </h3>
                                <button
                                    onClick={() => !isLoading && setIsModalOpen(false)}
                                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">

                                <div className="space-y-1.5 flex-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Essay Title</label>
                                    <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-lg font-bold focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white" placeholder="The Discipline of Letting Go" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Category</label>
                                        <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white uppercase tracking-widest cursor-pointer appearance-none">
                                            <option value="" disabled className="text-gray-400">SELECT CATEGORY...</option>
                                            {categoryOptions.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Read Time Marker</label>
                                        <input required name="readTime" value={formData.readTime} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white" placeholder="e.g. 5 min read" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Short Excerpt (Preview)</label>
                                    <textarea required name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white resize-none" placeholder="Growth is as much about deciding what to leave behind as it is about..." />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Content Body</label>
                                    <textarea required name="content" value={formData.content} onChange={handleInputChange} rows={8} className="w-full px-4 py-4 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-base focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white resize-none leading-relaxed" placeholder="Write your full essay here. Use paragraph breaks as needed..." />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold tracking-wide hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                                        {isEditing ? 'Save Changes' : 'Publish Essay'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ManageThoughts;
