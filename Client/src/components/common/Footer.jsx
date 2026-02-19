import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} dheerajj.x. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
