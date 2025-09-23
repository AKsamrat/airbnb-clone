"use client";

import { Popover, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, Search, UserCircle } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import GuestSelector from "./GuestSelector"; // We will create this next

// Main Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // State for search functionality
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });

  const totalGuests = guests.adults + guests.children;

  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    setDateRange(rangesByKey.selection);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "where":
        return (
          <div className="p-6 w-96">
            <h3 className="font-semibold text-sm">Search by region</h3>
            {/* Simple location input for demonstration */}
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search destinations"
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
        );
      case "check-in":
      case "check-out":
        return (
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleDateChange}
            months={2}
            direction="horizontal"
            rangeColors={["#FF385C"]}
            minDate={new Date()}
          />
        );
      case "who":
        return <GuestSelector guests={guests} setGuests={setGuests} />;
      default:
        return null;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-white">
      <div
        className={`relative transition-all duration-300 ${
          isScrolled ? "h-20" : "h-44"
        }`}
      >
        {/* === TOP BAR SECTION === */}
        <div className="h-20 flex items-center justify-between px-6 lg:px-20 border-b border-gray-200">
          <div className="flex-1 flex justify-start">
            <Image src="/airbnb-logo.svg" alt="Logo" width={102} height={32} />
          </div>
          <div className="flex-1 flex justify-center">
            <AnimatePresence mode="wait">
              {isScrolled ? (
                <motion.div
                  key="compact"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={scrollToTop}
                  className="flex items-center h-12 w-[348px] border rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <span className="pl-6 pr-2 text-sm font-medium">
                    Start your search
                  </span>
                  <div className="ml-auto mr-2 bg-red-500 text-white rounded-full p-2">
                    <Search size={16} />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex-1 flex items-center justify-end gap-2">
            <a
              href="#"
              className="text-sm font-medium p-3 rounded-full hover:bg-gray-100"
            >
              Become a host
            </a>
            <button className="p-3 rounded-full hover:bg-gray-100">
              <Globe size={20} />
            </button>
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow outline-none">
                <Menu size={20} />
                <UserCircle size={24} className="text-gray-500" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-2">
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Sign up
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                    <div className="border-t my-2"></div>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Airbnb your home
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Help
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>

        {/* === EXPANDED SEARCH BAR & POPOVER SECTION === */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-full flex justify-center"
            >
              <Popover as="div" className="relative">
                {({ open, close }) => (
                  <>
                    <div className="flex items-center bg-gray-100 h-16 rounded-full border border-gray-200 shadow-sm">
                      {/* Where */}
                      <Popover.Button
                        onClick={() => setActiveTab("where")}
                        className={`px-6 h-full rounded-full text-left focus:outline-none transition-all duration-200 ${
                          activeTab === "where" && open
                            ? "bg-white shadow-md"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <div className="font-bold text-xs">Where</div>
                        <div className="text-sm text-gray-500">
                          {location || "Search destinations"}
                        </div>
                      </Popover.Button>
                      <div className="h-8 w-px bg-gray-300"></div>

                      {/* Check-in */}
                      <Popover.Button
                        onClick={() => setActiveTab("check-in")}
                        className={`px-6 h-full rounded-full text-left focus:outline-none transition-all duration-200 ${
                          activeTab === "check-in" && open
                            ? "bg-white shadow-md"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <div className="font-bold text-xs">Check in</div>
                        <div className="text-sm text-gray-500">Add dates</div>
                      </Popover.Button>
                      <div className="h-8 w-px bg-gray-300"></div>

                      {/* Check-out */}
                      <Popover.Button
                        onClick={() => setActiveTab("check-out")}
                        className={`px-6 h-full rounded-full text-left focus:outline-none transition-all duration-200 ${
                          activeTab === "check-out" && open
                            ? "bg-white shadow-md"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <div className="font-bold text-xs">Check out</div>
                        <div className="text-sm text-gray-500">Add dates</div>
                      </Popover.Button>
                      <div className="h-8 w-px bg-gray-300"></div>

                      {/* Who & Search Button */}
                      <div
                        className={`pl-6 pr-2 h-full rounded-full flex items-center transition-all duration-200 ${
                          activeTab === "who" && open
                            ? "bg-white shadow-md"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <Popover.Button
                          onClick={() => setActiveTab("who")}
                          className="text-left focus:outline-none"
                        >
                          <div className="font-bold text-xs">Who</div>
                          <div className="text-sm text-gray-500">
                            {totalGuests > 0
                              ? `${totalGuests} guests`
                              : "Add guests"}
                          </div>
                        </Popover.Button>
                        <button
                          onClick={() => close()}
                          className="bg-red-500 text-white rounded-full p-3 ml-4"
                        >
                          <Search size={20} />
                        </button>
                      </div>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white rounded-3xl shadow-2xl border">
                        {renderActiveTabContent()}
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
