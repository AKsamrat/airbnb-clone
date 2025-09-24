"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchBar from "./Searchbar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("homes");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      // Use a threshold to prevent flickering
      setIsScrolled(currentScrollY > 100);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const navItems = [
    { id: "homes", label: "Homes", icon: "🏠", isNew: false },
    { id: "experiences", label: "Experiences", icon: "💡", isNew: true },
    { id: "services", label: "Services", icon: "🍽️", isNew: true },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
  ];

  const profileMenuItems = [
    { label: "Messages", action: () => console.log("Messages") },
    { label: "Notifications", action: () => console.log("Notifications") },
    { label: "Trips", action: () => console.log("Trips") },
    { label: "Wishlists", action: () => console.log("Wishlists") },
    { type: "divider" },
    { label: "Manage listings", action: () => console.log("Manage listings") },
    {
      label: "Host an experience",
      action: () => console.log("Host an experience"),
    },
    { label: "Account", action: () => console.log("Account") },
    { type: "divider" },
    { label: "Help Center", action: () => console.log("Help Center") },
    { label: "Log out", action: () => console.log("Log out") },
  ];

  return (
    <motion.header
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      initial={false}
      animate={{
        height: isScrolled ? 80 : 160,
        borderBottomWidth: isScrolled ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 w-32"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 cursor-pointer group">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-white font-bold text-sm">ab</span>
              </motion.div>
              <span className="text-xl font-bold text-red-500 hidden sm:block">
                airbnb
              </span>
            </div>
          </motion.div>

          {/* Center Content */}
          <div className="flex-1 flex justify-center">
            <AnimatePresence mode="wait">
              {!isScrolled ? (
                <motion.div
                  key="nav-tabs"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="hidden md:flex items-center space-x-1 bg-gray-50 rounded-full p-1"
                >
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                        activeTab === item.id
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                      {item.isNew && (
                        <motion.span
                          className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          NEW
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="search-bar"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full max-w-md"
                >
                  <SearchBar isCompressed={true} activeTab={activeTab} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side */}
          <motion.div
            className="flex items-center space-x-4 w-32 justify-end"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:underline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Become a host
            </motion.button>

            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={20} />
              </motion.button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">
                        Choose a language and region
                      </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => {
                            console.log(`Selected language: ${lang.name}`);
                            setIsLanguageOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                          whileHover={{ backgroundColor: "#f9fafb" }}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {lang.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <motion.div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center border border-gray-300 rounded-full p-1 hover:shadow-md transition-all duration-200 cursor-pointer"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                >
                  <Menu size={16} />
                </motion.button>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center ml-1">
                  <User size={16} className="text-white" />
                </div>
              </motion.div>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50"
                  >
                    {profileMenuItems.map((item, index) =>
                      item.type === "divider" ? (
                        <div
                          key={index}
                          className="my-2 border-t border-gray-100"
                        />
                      ) : (
                        <motion.button
                          key={index}
                          onClick={() => {
                            item.action?.();
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                          whileHover={{ backgroundColor: "#f9fafb" }}
                        >
                          {item.label}
                        </motion.button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Full Search Bar - Below header when not scrolled */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="pb-8"
            >
              <SearchBar isCompressed={false} activeTab={activeTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    activeTab === item.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  whileHover={{
                    backgroundColor:
                      activeTab === item.id ? "#f3f4f6" : "#f9fafb",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.isNew && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      NEW
                    </span>
                  )}
                </motion.button>
              ))}
              <motion.button
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                whileHover={{ backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.98 }}
              >
                Become a host
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
