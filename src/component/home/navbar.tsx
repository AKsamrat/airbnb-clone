"use client";
import {
  CircleQuestionMarkIcon,
  Globe,
  Menu,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CalendarMonth } from "./navComponent/calenderMonth";
import { ResponsiveSearchBar } from "./navComponent/ResponsiveSearchBar";
import { SearchSection } from "./navComponent/searchSection";

interface SearchData {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
}

const AirbnbNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [activeSearchSection, setActiveSearchSection] = useState<string | null>(
    null
  );
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchData, setSearchData] = useState<SearchData>({
    destination: "",
    checkIn: null,
    checkOut: null,
    guests: { adults: 1, children: 0, infants: 0 },
  });

  const languageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;
      setScrolled(isScrolled);
      if (isScrolled) {
        setSearchExpanded(false);
        setActiveSearchSection(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setActiveSearchSection(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    if (scrolled) {
      setSearchExpanded(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const totalGuests = searchData.guests.adults + searchData.guests.children;
  const currentDate = new Date();
  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const languages = [
    { code: "en", name: "English", region: "United States" },
    { code: "es", name: "Español", region: "España" },
    { code: "fr", name: "Français", region: "France" },
    { code: "de", name: "Deutsch", region: "Deutschland" },
    { code: "it", name: "Italiano", region: "Italia" },
    { code: "pt", name: "Português", region: "Brasil" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <div className="hidden lg:flex">
        <nav className="fixed  top-0 left-0 right-0 z-50 bg-gradient-to-t from-gray-50 to-white  border-gray-200 transition-all duration-200">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 ">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  className="h-8 md:h-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                  alt="Airbnb Logo"
                />
              </div>

              {/* Navigation Links - Hidden when scrolled */}
              <div
                className={` flex space-x-8 transition-opacity duration-300 mt-4 ${
                  scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <button className="flex items-end space-x-2 text-gray-700 hover:text-gray-900 font-medium  border-gray-900 pb-4">
                  <img src="./house.png" className="size-10"></img>
                  <span>Homes</span>
                </button>
                <button className="flex items-end space-x-2 text-gray-700 hover:text-gray-900 font-medium relative pb-4">
                  <img src="./light-bulb.png" className="size-8"></img>
                  <span>Experiences</span>
                  <span className="absolute -top-1 right-[78px] bg-gradient-to-t from-[#6f86b3] via-[#263753] to-[#5976a7] text-white text-[10px] font bold px-1.5 py-0.5 rounded-r-full rounded-t-full">
                    NEW
                  </span>
                </button>
                <button className="flex items-end space-x-2 text-gray-700 hover:text-gray-900 font-medium relative pb-4">
                  <img src="./desk-bell.png" className="size-8"></img>
                  <span>Services</span>
                  <span className="absolute -top-1 right-12 bg-gradient-to-t from-[#6f86b3] via-[#263753] to-[#5976a7] text-white text-[10px] px-1.5 py-0.5 rounded-r-full rounded-t-full">
                    NEW
                  </span>
                </button>
              </div>

              {/* Right Side */}
              <div className="flex items-center ">
                <button className="text-gray-700 text-sm font-semibold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-full transition-all">
                  Become a host
                </button>

                {/* Language Selector */}
                <div className="relative" ref={languageRef}>
                  <button
                    onClick={() =>
                      setShowLanguageDropdown(!showLanguageDropdown)
                    }
                    className="p-2 hover:bg-gray-200  bg-gray-100 rounded-full transition-all"
                  >
                    <Globe size={18} />
                  </button>
                  {showLanguageDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <div className="text-sm font-semibold">
                          Choose a language and region
                        </div>
                      </div>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          onClick={() => setShowLanguageDropdown(false)}
                        >
                          <div className="font-medium">{lang.name}</div>
                          <div className="text-sm text-gray-500">
                            {lang.region}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2  py-1 px-2  transition-shadow"
                  >
                    <div className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                      <Menu size={16} />
                    </div>
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 px-4">
                      <button className="w-full  py-3 text-left hover:bg-gray-50 font-medium flex items-center gap-3 border-b border-gray-300">
                        <span>
                          <CircleQuestionMarkIcon className="size-5 text-gray-700" />{" "}
                        </span>
                        <p>Help Center</p>
                      </button>

                      <button className="w-full  py-3 text-left hover:bg-gray-50 border-b border-gray-300">
                        Become a host
                        <p className="text-[12px] text-gray-500">
                          It is easy to start hosting & earn income
                        </p>
                      </button>

                      <button className="w-full  py-2 text-left hover:bg-gray-50">
                        Refer a Host
                      </button>
                      <button className="w-full  py-2 text-left hover:bg-gray-50">
                        Find a Co-Host
                      </button>
                      <button className="w-full  py-2 text-left hover:bg-gray-50  border-b border-gray-300">
                        Gift Card
                      </button>
                      <button className="w-full  py-2 text-left hover:bg-gray-50">
                        Login or Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Search Bar - Normal Position */}
          <div
            className={` top-16 left-0 right-0 p-4  transition-all duration-700  ${
              scrolled ? "hidden pointer-events-none" : "flex"
            }`}
          >
            <div className="max-w-[1010px] mx-auto   " ref={searchRef}>
              <div className="flex  items-center bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow ">
                <SearchSection
                  section="where"
                  title="Where"
                  subtitle={searchData.destination || "Search destinations"}
                  active={activeSearchSection === "where"}
                  onClick={() =>
                    setActiveSearchSection(
                      activeSearchSection === "where" ? null : "where"
                    )
                  }
                >
                  <input
                    type="text"
                    placeholder="Search destinations"
                    value={searchData.destination}
                    onChange={(e) =>
                      setSearchData((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                    className="w-full p-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    autoFocus
                  />
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Popular destinations
                    </div>
                    {["Paris", "Tokyo", "New York", "London", "Barcelona"].map(
                      (city) => (
                        <button
                          key={city}
                          onClick={() => {
                            setSearchData((prev) => ({
                              ...prev,
                              destination: city,
                            }));
                            setActiveSearchSection(null);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                        >
                          {city}
                        </button>
                      )
                    )}
                  </div>
                </SearchSection>
                <span className="border-l h-5 border-gray-300"></span>
                <SearchSection
                  section="checkin"
                  title="Check in"
                  subtitle={formatDate(searchData.checkIn) || "Add dates"}
                  active={activeSearchSection === "checkin"}
                  onClick={() =>
                    setActiveSearchSection(
                      activeSearchSection === "checkin" ? null : "checkin"
                    )
                  }
                >
                  <div className="flex space-x-4 max-w-2xl px-4">
                    <CalendarMonth
                      month={currentDate.getMonth()}
                      year={currentDate.getFullYear()}
                      title="Current Month"
                      searchData={searchData}
                      setSearchData={setSearchData}
                    />
                    <CalendarMonth
                      month={nextMonth.getMonth()}
                      year={nextMonth.getFullYear()}
                      title="Next Month"
                      searchData={searchData}
                      setSearchData={setSearchData}
                    />
                  </div>
                </SearchSection>
                <span className="border-l h-5 border-gray-300"></span>
                <SearchSection
                  section="checkout"
                  title="Check out"
                  subtitle={formatDate(searchData.checkOut) || "Add dates"}
                  active={activeSearchSection === "checkout"}
                  onClick={() =>
                    setActiveSearchSection(
                      activeSearchSection === "checkout" ? null : "checkout"
                    )
                  }
                >
                  <div className="flex space-x-4 max-w-2xl">
                    <CalendarMonth
                      month={currentDate.getMonth()}
                      year={currentDate.getFullYear()}
                      title={"Current Month"}
                      searchData={searchData}
                      setSearchData={setSearchData}
                    />
                    <CalendarMonth
                      month={nextMonth.getMonth()}
                      year={nextMonth.getFullYear()}
                      title="Next Month"
                      searchData={searchData}
                      setSearchData={setSearchData}
                    />
                  </div>
                </SearchSection>
                <span className="border-l h-5 border-gray-300"></span>
                <SearchSection
                  section="who"
                  title="Who"
                  subtitle={
                    totalGuests > 0
                      ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                      : "Add guests"
                  }
                  active={activeSearchSection === "who"}
                  onClick={() =>
                    setActiveSearchSection(
                      activeSearchSection === "who" ? null : "who"
                    )
                  }
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <div className="font-semibold">Adults</div>
                        <div className="text-sm text-gray-500">
                          Ages 13 or above
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            setSearchData((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                adults: Math.max(1, prev.guests.adults - 1),
                              },
                            }))
                          }
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400"
                          disabled={searchData.guests.adults <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">
                          {searchData.guests.adults}
                        </span>
                        <button
                          onClick={() =>
                            setSearchData((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                adults: prev.guests.adults + 1,
                              },
                            }))
                          }
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <div className="font-semibold">Children</div>
                        <div className="text-sm text-gray-500">Ages 2-12</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            setSearchData((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                children: Math.max(0, prev.guests.children - 1),
                              },
                            }))
                          }
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400"
                          disabled={searchData.guests.children <= 0}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">
                          {searchData.guests.children}
                        </span>
                        <button
                          onClick={() =>
                            setSearchData((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                children: prev.guests.children + 1,
                              },
                            }))
                          }
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <div className="font-semibold">Infants</div>
                        <div className="text-sm text-gray-500">Under 2</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            setSearchData((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                infants: Math.max(0, prev.guests.infants - 1),
                              },
                            }))
                          }
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400"
                          disabled={searchData.guests.infants <= 0}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">
                          {searchData.guests.infants}
                        </span>
                        <button
                          onClick={() =>
                            setSearchData((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                infants: prev.guests.infants + 1,
                              },
                            }))
                          }
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </SearchSection>

                <button className="mx-2 p-4 bg-[#FF5A5F] text-white rounded-full hover:bg-red-600 transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Compact Search Bar - Scrolled Position */}

      <div className="hidden lg:flex">
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-60 transition-all duration-200 ${
            scrolled && !searchExpanded ? "flex" : "hidden pointer-events-none"
          }`}
        >
          <button
            onClick={handleSearchClick}
            className="flex items-center space-x-3 bg-white border border-gray-300 rounded-full px-5 py-2 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-1 text-sm">
              <span className="font-semibold  text-gray-700">
                {searchData.destination || "Anywhere"}
              </span>
              <span className="text-gray-500 px-2">|</span>
              <span className="text-gray-700 font-semibold">
                {searchData.checkIn && searchData.checkOut
                  ? `${formatDate(searchData.checkIn)} - ${formatDate(
                      searchData.checkOut
                    )}`
                  : "Any week"}
              </span>
              <span className="text-gray-500 px-2">|</span>
              <span className="text-gray-700 font-semibold">
                {totalGuests > 0
                  ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                  : "Add guests"}
              </span>
              <div className="bg-[#FF5A5F] p-2 rounded-full ml-2">
                <Search size={16} className=" text-white " />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Compact Search Bar - for responsive view */}

      <div className="  lg:hidden max-w-7xl mx-auto px-4  mt-8">
        <div
          className="fixed top-2 left-1/2 transform -translate-x-1/2 
          z-50 flex items-center justify-center shadow-xl border rounded-full bg-white px-5 w-80"
        >
          <Search className="size-4 text-gray-500"></Search>
          <ResponsiveSearchBar
            section="where"
            title="Start Your Search"
            subtitle={searchData.destination || "Search destinations"}
            active={activeSearchSection === "where"}
            onClick={() =>
              setActiveSearchSection(
                activeSearchSection === "where" ? null : "where"
              )
            }
          >
            <input
              type="text"
              placeholder="Search destinations"
              value={searchData.destination}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  destination: e.target.value,
                }))
              }
              className="w-full p-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
              autoFocus
            />
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2">
                Popular destinations
              </div>
              {["Paris", "Tokyo", "New York", "London", "Barcelona"].map(
                (city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSearchData((prev) => ({
                        ...prev,
                        destination: city,
                      }));
                      setActiveSearchSection(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    {city}
                  </button>
                )
              )}
            </div>
          </ResponsiveSearchBar>
        </div>
      </div>

      {/* Navigation Links - for responsive view */}

      <div
        className={`fixed top-12 left-0 right-0 z-50 lg:hidden  shadow-md transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="flex justify-center lg:hidden space-x-6 mx-auto px-4">
          {/* Homes */}
          <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium relative">
            {!scrolled && (
              <img src="./house.png" className="size-6" alt="Homes" />
            )}
            <span>Homes</span>
          </button>

          {/* Experiences */}
          <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium relative">
            {!scrolled && (
              <img
                src="./light-bulb.png"
                className="size-6"
                alt="Experiences"
              />
            )}
            <span>Experiences</span>
            {!scrolled && (
              <span className="absolute -top-3 left-6  bg-gradient-to-t from-[#6f86b3] via-[#263753] to-[#5976a7] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-r-full rounded-t-full">
                NEW
              </span>
            )}
          </button>

          {/* Services */}
          <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium relative">
            {!scrolled && (
              <img src="./desk-bell.png" className="size-6" alt="Services" />
            )}
            <span>Services</span>
            {!scrolled && (
              <span className="absolute -top-3 left-6  bg-gradient-to-t from-[#6f86b3] via-[#263753] to-[#5976a7] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-r-full rounded-t-full">
                NEW
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AirbnbNavbar;
