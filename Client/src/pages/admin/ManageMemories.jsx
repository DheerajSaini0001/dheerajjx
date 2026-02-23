import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ImageIcon,
  Calendar,
  X,
  UploadCloud,
  Loader2
} from 'lucide-react';

const ManageMemories = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For handling add/edit form
  const [formData, setFormData] = useState({ _id: '', title: '', location: '', date: '', category: '', quote: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null); // The actual File object to upload
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem('adminToken'); // Secure auth token

  // Fetch Memories from Backend API
  const fetchMemories = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('http://localhost:201/api/memories');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setMemories(data);
      } else {
        setMemories([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Failed to fetch memories", error);
      setMemories([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  // Filter memory list (with safe null-checks to prevent undefined errors)
  const filteredMemories = memories.filter(m =>
    (m.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (m.location?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const openModal = (memory = null) => {
    setIsEditing(!!memory);
    if (memory) {
      setFormData(memory);
    } else {
      setFormData({ _id: '', title: '', location: '', date: '', category: '', quote: '', imageUrl: '' });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this memory?")) {
      try {
        const res = await fetch(`http://localhost:201/api/memories/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setMemories(memories.filter(m => m._id !== id));
        }
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      // Create local preview
      setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('location', formData.location);
    uploadData.append('date', formData.date);
    uploadData.append('category', formData.category);
    uploadData.append('quote', formData.quote);
    if (imageFile) {
      uploadData.append('image', imageFile); // Matched with 'upload.single("image")' route
    }

    try {
      const url = isEditing
        ? `http://localhost:201/api/memories/${formData._id}`
        : `http://localhost:201/api/memories`;

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` }, // Do NOT set Content-Type header manually for FormData
        body: uploadData,
      });

      const data = await res.json();

      if (res.ok) {
        if (isEditing) {
          setMemories(memories.map(m => m._id === data._id ? data : m));
        } else {
          setMemories([data, ...memories]);
        }
        setIsModalOpen(false);
      } else {
        alert(data.message || "Failed to save memory.");
      }
    } catch (error) {
      console.error("Save memory error:", error);
      alert("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Category Options
  const categoryOptions = ["Travel", "Urban", "Studio", "Editorial", "Lifestyle", "Raw", "Cinematic"];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 relative">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Manage Memories</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            Organize the visual archive. These cards appear publically on the Memories board.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search memories..."
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
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* Premium Data Table / Grid View */}
      <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none">

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 border-b border-gray-100 dark:border-white/5 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="col-span-1 border-gray-200">IMG</div>
          <div className="col-span-3">Title & Quote</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Rows (Or responsive cards on mobile) */}
        <div className="divide-y divide-gray-100 dark:divide-white/5 max-h-[60vh] overflow-y-auto min-h-[400px]">

          {isFetching ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 gap-4">
              <Loader2 className="animate-spin text-violet-500" size={32} />
              <p className="text-sm font-bold uppercase tracking-widest">Loading Records...</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredMemories.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-16 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 mb-2">
                    <ImageIcon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">No memories found</h3>
                  <p className="text-gray-500 max-w-sm">No memory archives match this filter or your database is empty.</p>
                </motion.div>
              ) : (
                filteredMemories.map((memory) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={memory._id}
                    className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center px-6 md:px-8 py-5 hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Image */}
                    <div className="col-span-1 hidden md:block">
                      <div className="relative w-12 h-12 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                        <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Title & Quote (Mobile includes image too) */}
                    <div className="col-span-3 space-y-1">
                      <div className="flex items-center gap-4 md:hidden mb-3">
                        <div className="w-14 h-14 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden shrink-0">
                          <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white capitalize text-lg">{memory.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                            <Calendar size={12} /> {memory.date}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block font-bold text-gray-900 dark:text-white capitalize truncate">{memory.title}</div>
                      <div className="text-sm text-gray-500 italic truncate" style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.1rem' }}>
                        "{memory.quote}"
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-span-2 text-sm font-medium text-gray-600 dark:text-gray-400 capitalize truncate">
                      {memory.location}
                    </div>

                    {/* Date (Hidden on mobile) */}
                    <div className="col-span-2 hidden md:block text-sm font-medium text-gray-500 dark:text-gray-400 font-mono tracking-wider">
                      {memory.date}
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent">
                        {memory.category}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-white/5">
                      <button
                        onClick={() => openModal(memory)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/5 text-gray-500 hover:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors tooltip-trigger"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(memory._id)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/5 text-gray-500 hover:text-white hover:bg-red-500 dark:hover:bg-red-500 transition-colors"
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

      {/* Modal for Create/Edit */}
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
              className="bg-white dark:bg-[#0a0a0c] w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden shadow-black/50"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white focus:outline-none">
                  {isEditing ? 'Edit Memory Archive' : 'Create New Memory'}
                </h3>
                <button
                  onClick={() => !isLoading && setIsModalOpen(false)}
                  disabled={isLoading}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">

                {/* Image Upload Component */}
                <div className="col-span-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Cover Visual</label>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/20 flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 text-gray-400 group hover:border-violet-500 hover:bg-violet-500/5 transition-all cursor-pointer overflow-hidden relative"
                  >
                    {formData.imageUrl ? (
                      <>
                        <img src={formData.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <UploadCloud size={30} className="text-white drop-shadow-lg mb-2" />
                          <span className="text-sm font-semibold text-white drop-shadow-lg">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={32} className="mb-3 group-hover:scale-110 group-hover:text-violet-500 transition-all" />
                        <span className="text-sm font-semibold group-hover:text-violet-500">Click to Browse Uploads</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-1">Supports JPG, PNG (Max 5MB)</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Memory Title</label>
                    <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white" placeholder="e.g. Neon Streets" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Geographic Location</label>
                    <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white" placeholder="Tokyo, Japan" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date (YYYY.MM.DD)</label>
                    <input required name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white font-mono" placeholder="2026.12.01" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Category Tag</label>
                    <select
                      required
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white uppercase tracking-widest cursor-pointer appearance-none"
                    >
                      <option value="" disabled className="text-gray-400">SELECT TAG...</option>
                      {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Thematic Quote</label>
                  <textarea required name="quote" value={formData.quote} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-lg italic focus:ring-2 focus:ring-violet-500/50 outline-none text-gray-900 dark:text-white resize-none" style={{ fontFamily: '"Dancing Script", cursive' }} placeholder="Silenced by the scale of the mountains..." />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading || (!isEditing && !imageFile)} // File required on create
                    className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold tracking-wide hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading && <Loader2 size={18} className="animate-spin" />}
                    {isEditing ? 'Save Changes' : 'Publish Memory to Board'}
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

export default ManageMemories;
