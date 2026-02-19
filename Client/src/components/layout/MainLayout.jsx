import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-200 transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-20 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
