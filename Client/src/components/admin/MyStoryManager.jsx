import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, ChevronDown, ChevronUp, Plus, Trash2, Save,
    CheckCircle2, Loader2, PenLine, Sparkles, GripVertical, X
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:201';
const token = () => localStorage.getItem('adminToken') || '';

// ── Small reusable Toast ────────────────────────────────────────────────────
const Toast = ({ toast }) => (
    <AnimatePresence>
        {toast && (
            <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed top-6 right-6 z-[999] flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold shadow-2xl
                    ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}
            >
                <CheckCircle2 size={15} />
                {toast.msg}
            </motion.div>
        )}
    </AnimatePresence>
);

// ── Collapsible section wrapper ─────────────────────────────────────────────
const AdminSection = ({ title, icon: Icon, accent = 'violet', children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    const colors = {
        violet: 'from-violet-500 to-purple-600',
        pink: 'from-pink-500 to-rose-500',
        amber: 'from-amber-400 to-orange-500',
    };
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden bg-white dark:bg-[#111]">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${colors[accent]} flex items-center justify-center shrink-0`}>
                        <Icon size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{title}</span>
                </div>
                {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-white/5 pt-5 space-y-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Highlights editor ───────────────────────────────────────────────────────
const HighlightsEditor = ({ highlights, onChange }) => {
    const update = (i, key, val) => {
        const next = highlights.map((h, idx) => idx === i ? { ...h, [key]: val } : h);
        onChange(next);
    };
    return (
        <div className="space-y-4">
            {highlights.map((h, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center gap-2">
                        <input
                            value={h.icon}
                            onChange={e => update(i, 'icon', e.target.value)}
                            className="w-12 text-center text-xl p-1 rounded-lg bg-white dark:bg-[#222] border border-gray-300 dark:border-white/10 outline-none focus:border-violet-500"
                        />
                        <input
                            value={h.label}
                            onChange={e => update(i, 'label', e.target.value)}
                            placeholder="Label"
                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-white dark:bg-[#222] border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white outline-none focus:border-violet-500"
                        />
                    </div>
                    <input
                        value={h.value}
                        onChange={e => update(i, 'value', e.target.value)}
                        placeholder="Description"
                        className="w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-[#222] border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white outline-none focus:border-violet-500"
                    />
                </div>
            ))}
        </div>
    );
};

// ── Chapter editor ──────────────────────────────────────────────────────────
const ChapterEditor = ({ chapters, onChange }) => {
    const update = (i, key, val) => {
        const next = chapters.map((c, idx) => idx === i ? { ...c, [key]: val } : c);
        onChange(next);
    };
    const updateLines = (i, text) => update(i, 'lines', text.split('\n'));
    const addChapter = () => onChange([...chapters, { title: 'New Chapter', lines: ['Write your story here.'], order: chapters.length }]);
    const remove = (i) => onChange(chapters.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-4">
            {chapters.map((ch, i) => (
                <div key={i} className="rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5">
                        <GripVertical size={16} className="text-gray-300 dark:text-gray-600 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 shrink-0">
                            Ch {String(i + 1).padStart(2, '0')}
                        </span>
                        <input
                            value={ch.title}
                            onChange={e => update(i, 'title', e.target.value)}
                            className="flex-1 bg-transparent font-bold text-gray-900 dark:text-white outline-none text-sm placeholder:text-gray-400"
                            placeholder="Chapter title"
                        />
                        <button onClick={() => remove(i)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                        </button>
                    </div>
                    <div className="p-4">
                        <textarea
                            rows={6}
                            value={ch.lines.join('\n')}
                            onChange={e => updateLines(i, e.target.value)}
                            placeholder="One line per row. Empty line = spacing break."
                            className="w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 outline-none focus:border-violet-500 resize-y font-mono leading-relaxed"
                        />
                        <p className="text-[10px] text-gray-400 mt-1.5">Tip: leave a blank line for paragraph spacing</p>
                    </div>
                </div>
            ))}
            <button
                onClick={addChapter}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-violet-500/30 text-violet-500 text-sm font-bold hover:bg-violet-500/5 transition-colors"
            >
                <Plus size={16} /> Add Chapter
            </button>
        </div>
    );
};

// ── Signature editor ────────────────────────────────────────────────────────
const SignatureEditor = ({ quote, tags, onChangeQuote, onChangeTags }) => {
    const updateTag = (i, val) => {
        const next = [...tags]; next[i] = val; onChangeTags(next);
    };
    const removeTag = (i) => onChangeTags(tags.filter((_, idx) => idx !== i));
    const addTag = () => onChangeTags([...tags, 'New Tag']);

    return (
        <div className="space-y-5">
            <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Closing Quote</label>
                <textarea
                    rows={3}
                    value={quote}
                    onChange={e => onChangeQuote(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white text-sm outline-none focus:border-pink-500 resize-none"
                />
            </div>
            <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <div key={i} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                            <input
                                value={tag}
                                onChange={e => updateTag(i, e.target.value)}
                                className="bg-transparent text-pink-500 text-xs font-bold outline-none w-28"
                            />
                            <button onClick={() => removeTag(i)} className="text-pink-400 hover:text-red-500 transition-colors">
                                <X size={11} />
                            </button>
                        </div>
                    ))}
                    <button onClick={addTag} className="px-3 py-1.5 rounded-full border-2 border-dashed border-pink-500/30 text-pink-500 text-xs font-bold hover:bg-pink-500/5 transition-colors flex items-center gap-1">
                        <Plus size={12} /> Tag
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Main My Story Manager ───────────────────────────────────────────────────
const MyStoryManager = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3200);
    };

    const fetchStory = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/story`);
            const json = await res.json();
            setData(json);
        } catch {
            showToast('Failed to load story data', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchStory(); }, [fetchStory]);

    const save = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API}/api/story`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token()}`,
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error();
            showToast('My Story saved successfully!');
        } catch {
            showToast('Save failed — check auth', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 size={28} className="animate-spin text-violet-500" />
            </div>
        );
    }

    return (
        <>
            <Toast toast={toast} />

            <div className="p-8 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center">
                            <BookOpen size={18} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">My Story</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Edit highlights, chapters & signature</p>
                        </div>
                    </div>
                    <button
                        onClick={save}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        {saving ? 'Saving…' : 'Save All'}
                    </button>
                </div>

                {/* Sections */}
                <AdminSection title="Highlight Cards" icon={Sparkles} accent="pink" defaultOpen>
                    <HighlightsEditor
                        highlights={data.highlights}
                        onChange={h => setData(d => ({ ...d, highlights: h }))}
                    />
                </AdminSection>

                <AdminSection title={`Story Chapters (${data.chapters.length})`} icon={PenLine} accent="violet">
                    <ChapterEditor
                        chapters={data.chapters}
                        onChange={c => setData(d => ({ ...d, chapters: c }))}
                    />
                </AdminSection>

                <AdminSection title="Closing Signature" icon={BookOpen} accent="amber">
                    <SignatureEditor
                        quote={data.signatureQuote}
                        tags={data.signatureTags}
                        onChangeQuote={q => setData(d => ({ ...d, signatureQuote: q }))}
                        onChangeTags={t => setData(d => ({ ...d, signatureTags: t }))}
                    />
                </AdminSection>
            </div>
        </>
    );
};

export default MyStoryManager;
