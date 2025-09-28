"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

// This is the large header visible at the top of the page
const ExpandedHeader = () => (
  <motion.div
    // Animation properties for entering and exiting
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="h-24 flex items-center justify-center bg-white border-b"
  >
    <div className="flex items-center p-2 border rounded-full shadow-lg">
      <div className="px-4">
        <div className="font-bold text-sm">Check in</div>
        <div className="text-gray-500">Add dates</div>
      </div>
      <div className="px-4 border-l">
        <div className="font-bold text-sm">Check out</div>
        <div className="text-gray-500">Add dates</div>
      </div>
      <div className="px-4 border-l">
        <div className="font-bold text-sm">Who</div>
        <div className="text-gray-500">Add guests</div>
      </div>
    </div>
  </motion.div>
);

// This is the small, compact header that appears on scroll
const CompactHeader = () => (
  <motion.div
    // Animation properties for entering and exiting
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="h-16 flex items-center justify-center bg-white shadow-md"
  >
    <button className="flex items-center px-4 py-2 border rounded-full shadow-sm hover:shadow-md transition">
      <span>Anywhere</span>
      <span className="mx-4 border-l h-6"></span>
      <span>Anytime</span>
      <span className="mx-4 border-l h-6"></span>
      <span className="text-gray-500">Add guests</span>
      <div className="ml-3 bg-red-500 text-white rounded-full p-2">
        <Search size={16} />
      </div>
    </button>
  </motion.div>
);

// Main component that controls the logic
const ScrollingNavbar = () => {
  // 1. State to track if the page is scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // 2. useEffect to add a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // 3. Set state based on scroll position (threshold is 10px)
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add the listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* AnimatePresence handles the animation when components are added or removed */}
      <AnimatePresence>
        {/* 4. Conditionally render the correct header based on state */}
        {isScrolled ? <CompactHeader /> : <ExpandedHeader />}
      </AnimatePresence>
    </header>
  );
};

export default ScrollingNavbar;
