import React from 'react';
import { FaSun, FaGlobe } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1c1c1c] text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-400 to-green-400" />
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-green-300 to-green-500">TRUST</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 text-sm font-medium">
        <li className="hover:text-green-400 cursor-pointer">Wallet</li>
        <li className="hover:text-green-400 cursor-pointer">Features</li>
        <li className="text-blue">Build</li>
        <li className="hover:text-green-400 cursor-pointer">Support</li>
        <li className="hover:text-green-400 cursor-pointer">About</li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <FaSun className="text-lg hover:text-yellow-300 cursor-pointer" />

        <button className="border border-green-400 text-green-400 px-4 py-1.5 rounded-full text-sm hover:bg-green-500 hover:text-black transition">
          <div className="flex items-center gap-2">
            <FaGlobe size={14} />
            <span>Language</span>
          </div>
        </button>

        <button className="bg-green-400 hover:bg-green-500 text-black px-4 py-1.5 rounded-full text-sm font-medium transition">
          Download
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
