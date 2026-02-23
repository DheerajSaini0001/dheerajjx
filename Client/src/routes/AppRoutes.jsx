import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Memories from '../pages/public/Memories';
import MemoryDetail from '../pages/public/MemoryDetail';
import Thoughts from '../pages/public/Thoughts';
import Gallery from '../pages/public/Gallery';

import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import AddMemory from '../pages/admin/AddMemory';
import ManageMemories from '../pages/admin/ManageMemories';
import ManageThoughts from '../pages/admin/ManageThoughts';
import ManageGallery from '../pages/admin/ManageGallery';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/memories/:id" element={<MemoryDetail />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/gallery" element={<Gallery />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route path="login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-memory" element={<AddMemory />} />
          <Route path="manage-memories" element={<ManageMemories />} />
          <Route path="thoughts" element={<ManageThoughts />} />
          <Route path="gallery" element={<ManageGallery />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
