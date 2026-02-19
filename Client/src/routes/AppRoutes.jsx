import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Memories from '../pages/public/Memories';
import Thoughts from '../pages/public/Thoughts';
import Gallery from '../pages/public/Gallery';

// Admin Pages
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import AddMemory from '../pages/admin/AddMemory';
import ManageMemories from '../pages/admin/ManageMemories';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/memories" element={<Memories />} />
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
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
