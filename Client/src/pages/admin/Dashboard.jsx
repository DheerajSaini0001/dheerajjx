import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Plus, Search } from 'lucide-react';

const Dashboard = () => {

  // Mock stats for dashboard
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

      {/* Placeholder for Charts/Recent Activity */}
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
