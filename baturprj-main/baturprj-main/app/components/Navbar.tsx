"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white bg-opacity-50 backdrop-blur-2xl text-black sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-bold text-black">AI-Generated Video Detector</p>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/HowItWorks">
            <p className="hover:text-blue-400">How It Works</p>
          </Link>
          <Link href="/About">
            <p className="hover:text-blue-400">About</p>
          </Link>
          <Link href="/Contact">
            <p className="hover:text-blue-400">Contact</p>
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <Link href="#features">
            <p className="block px-4 py-2 hover:bg-gray-700">Features</p>
          </Link>
          <Link href="#about">
            <p className="block px-4 py-2 hover:bg-gray-700">About</p>
          </Link>
          <Link href="#contact">
            <p className="block px-4 py-2 hover:bg-gray-700">Contact</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
