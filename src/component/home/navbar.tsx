"use client";
import { ArrowLeft, Globe, Menu, Search, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 80;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchActive(true);
    setMessage("");
  };

  const handleBackClick = () => {
    setIsSearchActive(false);
    setMessage("");
  };

  const handleButtonClick = (action: string) => {
    setMessage(`Action: ${action} button clicked!`);
  };

  return (
    <nav className="fixed w-full top-0 left-0 bg-white z-50 shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Fixed Section: Always visible */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-8 md:h-10"
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
              alt="Airbnb Logo"
            />
          </div>

          {/* Nav Options for the initial view */}
          <div
            className={`flex items-center justify-center space-x-4 flex-grow px-12 transition-all duration-300 ${
              isScrolled || isSearchActive
                ? "opacity-0 invisible h-0 w-0"
                : "opacity-100 visible h-auto"
            }`}
          >
            <a
              href="#"
              className="font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition"
            >
              Homes
            </a>
            <a
              href="#"
              className="font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition"
            >
              Experiences
            </a>
            <a
              href="#"
              className="font-semibold px-4 py-2 hover:bg-gray-100 rounded-full transition"
            >
              Online Experiences
            </a>
          </div>

          {/* Right-side options: Always visible */}
          <div className="flex items-center space-x-2">
            <a
              href="#"
              className="font-semibold text-sm px-3 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Become a host
            </a>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => handleButtonClick("Language")}
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-lg transition"
              onClick={() => handleButtonClick("Profile")}
            >
              <Menu className="h-5 w-5" />
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="py-2">
          {/* Expanded Search Bar */}
          <div
            className={`transition-all duration-300 ${
              isSearchActive
                ? "opacity-100 visible h-auto"
                : "opacity-0 invisible h-0"
            }`}
          >
            <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
              <button
                className="p-2 mr-2 rounded-full hover:bg-gray-100 transition"
                onClick={handleBackClick}
              >
                <ArrowLeft className="h-6 w-6 text-gray-700" />
              </button>
              <div className="flex items-center flex-grow">
                <div
                  className="p-2 px-6 rounded-full hover:bg-gray-100 transition flex-1 cursor-pointer"
                  onClick={() => handleButtonClick("Where")}
                >
                  <div className="font-bold text-sm">Where</div>
                  <input
                    type="text"
                    placeholder="Search destinations"
                    className="bg-transparent outline-none w-full"
                  />
                </div>
                <div
                  className="p-2 px-6 rounded-full hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => handleButtonClick("Check in")}
                >
                  <div className="font-bold text-sm">Check in</div>
                  <div className="text-gray-500">Add dates</div>
                </div>
                <div
                  className="p-2 px-6 rounded-full hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => handleButtonClick("Check out")}
                >
                  <div className="font-bold text-sm">Check out</div>
                  <div className="text-gray-500">Add dates</div>
                </div>
                <div
                  className="flex-grow p-2 px-6 rounded-full hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => handleButtonClick("Who")}
                >
                  <div className="font-bold text-sm">Who</div>
                  <div className="text-gray-500">Add guests</div>
                </div>
              </div>
              <button className="bg-red-500 p-4 rounded-full flex items-center justify-center ml-2">
                <Search className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Collapsed Search Bar (on scroll) */}
          <div
            className={`cursor-pointer transition-all duration-300 ${
              isScrolled && !isSearchActive
                ? "opacity-100 visible"
                : "opacity-0 invisible h-0"
            }`}
            onClick={handleSearchClick}
          >
            <div className="flex items-center justify-between border border-gray-300 rounded-full shadow-md p-2 w-full max-w-sm mx-auto my-4 hover:shadow-lg">
              <div className="flex items-center justify-center space-x-2">
                <button className="bg-red-500 p-2 rounded-full">
                  <Search className="h-4 w-4 text-white" />
                </button>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-gray-800">
                    Start your search
                  </span>
                  <span className="text-gray-500 text-xs">
                    Anywhere • Any week • Add guests
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message box for button clicks */}
      {message && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-xl flex items-center space-x-4">
          <span>{message}</span>
          <button
            onClick={() => setMessage("")}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
