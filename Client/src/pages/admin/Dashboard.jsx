import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Activity, ImagePlus, Trash2, Upload, CheckCircle2, Loader2, X, Image } from 'lucide-react';
import MyStoryManager from '../../components/admin/MyStoryManager';

const API = import.meta.env.VITE_API_URL || 'http://localhost:201';

// ── Tiny hook to get auth token ────────────────────────────────────────────
const useToken = () => localStorage.getItem('adminToken') || '';

// ── Hero BG Manager card ───────────────────────────────────────────────────
const HeroBgManager = () => {
  const token = useToken();
  const fileRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [label, setLabel] = useState('');
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/herobg`);
      const data = await res.json();
      setImages(data);
    } catch {
      showToast('Failed to fetch images', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('label', label);
    try {
      setUploading(true);
      const res = await fetch(`${API}/api/herobg`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error();
      showToast('Photo uploaded! It will appear in rotation.');
      setFile(null);
      setPreview(null);
      setLabel('');
      if (fileRef.current) fileRef.current.value = '';
      fetchImages();
    } catch {
      showToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/api/herobg/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setImages(prev => prev.filter(img => img._id !== id));
      showToast('Removed from rotation.');
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 space-y-8 relative">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg z-50
                            ${toast.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-emerald-500 text-white'}`}
          >
            <CheckCircle2 size={15} />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
          <Image size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900 dark:text-white">Home Page Hero Photos</h3>
          <p className="text-xs text-gray-400 mt-0.5">Rotates every 3 hours · {images.length} photo{images.length !== 1 ? 's' : ''} in pool</p>
        </div>
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-6 space-y-4">
        <div
          className="flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() => fileRef.current?.click()}
        >
          {preview ? (
            <div className="relative w-full max-w-xs mx-auto">
              <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-xl" />
              <button
                onClick={(e) => { e.stopPropagation(); setPreview(null); setFile(null); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-violet-500/10 transition-colors">
                <ImagePlus size={22} className="text-gray-400 group-hover:text-violet-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-400 text-center">
                <span className="font-bold text-gray-700 dark:text-gray-200">Click to select</span> a photo<br />
                <span className="text-xs">JPG, PNG · max 10MB</span>
              </p>
            </>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

        {file && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Label (optional, e.g. Rani Khet 2026)"
              value={label}
              onChange={e => setLabel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-800 dark:text-white outline-none focus:border-violet-500 transition-colors"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {uploading ? (
                <><Loader2 size={15} className="animate-spin" /> Uploading…</>
              ) : (
                <><Upload size={15} /> Add to Rotation</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Current photos grid */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 size={28} className="animate-spin text-violet-500" />
        </div>
      ) : images.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-sm">
          No photos yet — upload your first one above.
        </div>
      ) : (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Current Rotation Pool</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {images.map((img, i) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-white/10"
                >
                  <img src={img.imageUrl} alt={img.label || `bg-${i + 1}`} className="w-full h-full object-cover" loading="lazy" />

                  {/* Slot badge */}
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-mono">
                    #{i + 1}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                    {img.label && (
                      <span className="text-white text-[10px] font-bold text-center leading-snug line-clamp-2">{img.label}</span>
                    )}
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors"
                    >
                      <Trash2 size={11} /> Remove
                    </button>
                  </div>
                </motion.div>

              ))}
            </AnimatePresence>
          </div>
        </div>
      )
      }
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────────────────
const Dashboard = () => {
  const stats = [
    { label: 'Total Memories', value: '124', trend: '+12% this month' },
    { label: 'Published Thoughts', value: '48', trend: '+3 this week' },
    { label: 'Gallery Views', value: '12.4K', trend: '+1.2K this week' },
    { label: 'System Health', value: '100%', trend: 'No issues found' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome Back, Admin.</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Here's what's happening in your digital universe today.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-max group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          Create New Entry
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="p-6 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden group hover:border-violet-500/50 transition-colors"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={40} className="text-violet-500" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">{stat.label}</h3>
            <p className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Hero BG Manager ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <HeroBgManager />
      </motion.div>

      {/* ── My Story Manager ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <MyStoryManager />
      </motion.div>

      {/* Charts / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Activity Overview</h3>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Past 30 Days</span>
          </div>
          <div className="flex-1 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center">
            <span className="text-gray-400 font-mono text-sm uppercase tracking-widest">[ Graph Module Placeholder ]</span>
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 min-h-[400px]">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Quick Actions</h3>
          <div className="space-y-4">
            {['Upload to Gallery', 'Draft new Thought', 'Update Story Bio', 'Review Analytics'].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-transparent dark:border-white/5 transition-colors group">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{action}</span>
                <Plus size={18} className="text-gray-400 group-hover:text-violet-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
