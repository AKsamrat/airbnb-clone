"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SearchBarProps {
  activeTab: string;
  isCompressed: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ activeTab, isCompressed }) => {
  const [activeField, setActiveField] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchData, setSearchData] = useState({
    where: "",
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 0,
  });

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setActiveField("");
        if (isCompressed) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCompressed]);

  const handleFieldClick = (field: string) => {
    setActiveField(field);
    if (isCompressed && !isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleCompressedClick = () => {
    if (isCompressed && !isExpanded) {
      setIsExpanded(true);
      setActiveField("where");
    }
  };

  const handleInputChange = (
    field: string,
    value: string | Date | null | number
  ) => {
    setSearchData((prev) => ({ ...prev, [field]: value }));
  };

  const getPlaceholder = (field: string) => {
    switch (field) {
      case "where":
        return activeTab === "experiences"
          ? "Search experiences"
          : "Search destinations";
      case "checkIn":
        return "Add dates";
      case "checkOut":
        return "Add dates";
      case "guests":
        return "Add guests";
      default:
        return "";
    }
  };

  const searchFields = [
    {
      key: "where",
      label: "Where",
      icon: MapPin,
      placeholder: getPlaceholder("where"),
    },
    {
      key: "checkIn",
      label: "Check in",
      icon: Calendar,
      placeholder: getPlaceholder("checkIn"),
    },
    {
      key: "checkOut",
      label: "Check out",
      icon: Calendar,
      placeholder: getPlaceholder("checkOut"),
    },
    {
      key: "guests",
      label: "Who",
      icon: Users,
      placeholder: getPlaceholder("guests"),
    },
  ];

  // Compressed search bar (when scrolled)
  if (isCompressed && !isExpanded) {
    return (
      <div className="flex justify-center">
        <motion.div
          onClick={handleCompressedClick}
          className="bg-white rounded-full border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          whileHover={{
            scale: 1.02,
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
        >
          <div className="flex items-center px-6 py-3 space-x-4">
            <Search size={16} className="text-gray-600" />
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium text-gray-900">
                {searchData.where || "Anywhere"}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {searchData.checkIn
                  ? searchData.checkIn.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Any week"}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {searchData.guests > 0
                  ? `${searchData.guests} guests`
                  : "Add guests"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Full search bar (expanded or not compressed)
  return (
    <AnimatePresence>
      <div
        className={`${
          isCompressed
            ? "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
            : "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        }`}
      >
        <motion.div
          ref={searchBarRef}
          className={`bg-white rounded-full border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 ${
            activeField ? "shadow-2xl" : ""
          } ${isCompressed ? "w-full max-w-4xl mx-4" : ""}`}
          initial={
            isCompressed ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }
          }
          animate={{ scale: 1, opacity: 1 }}
          exit={
            isCompressed ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
        >
          <div className="flex items-center p-2">
            {searchFields.map((field, index) => {
              const Icon = field.icon;
              const isActive = activeField === field.key;
              const hasValue =
                field.key === "guests"
                  ? searchData.guests > 0
                  : searchData[field.key as keyof typeof searchData];

              return (
                <React.Fragment key={field.key}>
                  <motion.div
                    onClick={() => handleFieldClick(field.key)}
                    className={`flex-1 cursor-pointer rounded-full transition-all duration-200 relative ${
                      isActive ? "bg-white shadow-lg" : "hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: isActive ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      backgroundColor: isActive ? "#ffffff" : "transparent",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{
                            color: isActive ? "#ef4444" : "#6b7280",
                            scale: isActive ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon size={18} />
                        </motion.div>
                        <div className="flex-1">
                          <motion.label
                            className={`block text-xs font-medium mb-1 transition-colors duration-200 ${
                              isActive ? "text-red-500" : "text-gray-700"
                            }`}
                            animate={{
                              color: isActive ? "#ef4444" : "#374151",
                            }}
                          >
                            {field.label}
                          </motion.label>
                          {field.key === "where" ? (
                            <input
                              type="text"
                              value={searchData.where}
                              onChange={(e) =>
                                handleInputChange("where", e.target.value)
                              }
                              placeholder={field.placeholder}
                              className="w-full text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                              onFocus={() => setActiveField(field.key)}
                            />
                          ) : field.key === "checkIn" ||
                            field.key === "checkOut" ? (
                            <DatePicker
                              selected={
                                searchData[field.key as "checkIn" | "checkOut"]
                              }
                              onChange={(date) =>
                                handleInputChange(field.key, date)
                              }
                              placeholderText={field.placeholder}
                              className="w-full text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none cursor-pointer"
                              onFocus={() => setActiveField(field.key)}
                              dateFormat="MMM d"
                              minDate={
                                field.key === "checkOut"
                                  ? searchData.checkIn || new Date()
                                  : new Date()
                              }
                              popperClassName="custom-datepicker-popper"
                              calendarClassName="custom-datepicker-calendar"
                            />
                          ) : (
                            <input
                              type="text"
                              value={
                                searchData.guests > 0
                                  ? `${searchData.guests} guests`
                                  : ""
                              }
                              placeholder={field.placeholder}
                              className="w-full text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none cursor-pointer"
                              onFocus={() => setActiveField(field.key)}
                              readOnly
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Active field dropdown */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 mt-2 p-6 z-10"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <div className="text-center text-gray-500 text-sm">
                            {field.key === "where" && (
                              <div className="space-y-3">
                                <p className="font-medium text-gray-900">
                                  Popular destinations
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    "New York",
                                    "Los Angeles",
                                    "Miami",
                                    "San Francisco",
                                  ].map((city) => (
                                    <motion.button
                                      key={city}
                                      onClick={() =>
                                        handleInputChange("where", city)
                                      }
                                      className="p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                      whileHover={{
                                        backgroundColor: "#f9fafb",
                                        scale: 1.02,
                                      }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                        <span className="text-sm font-medium text-gray-900">
                                          {city}
                                        </span>
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {field.key === "guests" && (
                              <div className="space-y-4">
                                <p className="font-medium text-gray-900">
                                  Add guests
                                </p>
                                <div className="space-y-3">
                                  {[
                                    {
                                      label: "Adults",
                                      desc: "Ages 13 or above",
                                      key: "adults",
                                    },
                                    {
                                      label: "Children",
                                      desc: "Ages 2-12",
                                      key: "children",
                                    },
                                    {
                                      label: "Infants",
                                      desc: "Under 2",
                                      key: "infants",
                                    },
                                  ].map((guest) => (
                                    <div
                                      key={guest.label}
                                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                                    >
                                      <div className="text-left">
                                        <p className="font-medium text-gray-900">
                                          {guest.label}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {guest.desc}
                                        </p>
                                      </div>
                                      <div className="flex items-center space-x-3">
                                        <motion.button
                                          onClick={() => {
                                            if (searchData.guests > 0) {
                                              handleInputChange(
                                                "guests",
                                                searchData.guests - 1
                                              );
                                            }
                                          }}
                                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 transition-colors duration-200 disabled:opacity-50"
                                          disabled={searchData.guests === 0}
                                          whileHover={{
                                            scale: 1.05,
                                            borderColor: "#111827",
                                          }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          -
                                        </motion.button>
                                        <span className="w-8 text-center font-medium">
                                          {Math.floor(searchData.guests / 3)}
                                        </span>
                                        <motion.button
                                          onClick={() =>
                                            handleInputChange(
                                              "guests",
                                              searchData.guests + 1
                                            )
                                          }
                                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 transition-colors duration-200"
                                          whileHover={{
                                            scale: 1.05,
                                            borderColor: "#111827",
                                          }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          +
                                        </motion.button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {index < searchFields.length - 1 && (
                    <div className="w-px h-8 bg-gray-300"></div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Search Button */}
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 ml-2 transition-all duration-200 shadow-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#dc2626",
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Search size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchBar;
