import React from 'react';
import { GithubIcon } from './icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-gray-400 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Aman Motwani. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;