import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex font-sans">
      <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        {/* Sidebar content (navigation) would go here */}
        <div>Navigation Placeholder</div>
      </div>
      <main className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
