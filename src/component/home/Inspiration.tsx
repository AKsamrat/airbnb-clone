"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
// Data for the first tab
const inspirationLinks = [
  { title: "Family travel hub", subtitle: "Tips and inspiration", href: "#" },
  { title: "Family budget travel", subtitle: "Get there for less", href: "#" },
  {
    title: "Vacation ideas for any budget",
    subtitle: "Make it special without making it spendy",
    href: "#",
  },
  {
    title: "Travel Europe on a budget",
    subtitle: "How to take the kids to Europe for less",
    href: "#",
  },
  {
    title: "Outdoor adventure",
    subtitle: "Explore nature with the family",
    href: "#",
  },
  {
    title: "Bucket list national parks",
    subtitle: "Must-see parks for family travel",
    href: "#",
  },
  {
    title: "Kid-friendly state parks",
    subtitle: "Check out these family-friendly hikes",
    href: "#",
  },
];

// NEW: Data for the "Airbnb-friendly apartments" tab
const apartmentLinks = [
  { city: "Albuquerque", state: "New Mexico", href: "#" },
  { city: "Atlanta Metro", state: "Georgia", href: "#" },
  { city: "Augusta", state: "Georgia", href: "#" },
  { city: "Austin Metro", state: "Texas", href: "#" },
  { city: "Baton Rouge", state: "Louisiana", href: "#" },
  { city: "Bentonville", state: "Arkansas", href: "#" },
  { city: "Birmingham", state: "Alabama", href: "#" },
  { city: "Boise", state: "Idaho", href: "#" },
  { city: "Boston Metro", state: "Massachusetts", href: "#" },
  { city: "Boulder", state: "Colorado", href: "#" },
  { city: "Charlotte", state: "North Carolina", href: "#" },
  { city: "Chicago Metro", state: "Illinois", href: "#" },
  { city: "Cincinnati", state: "Ohio", href: "#" },
  { city: "Columbus", state: "Ohio", href: "#" },
  { city: "Crestview", state: "Florida", href: "#" },
  { city: "Dallas", state: "Texas", href: "#" },
  { city: "Denver", state: "Colorado", href: "#" },
  { city: "Detroit", state: "Michigan", href: "#" },
  { city: "Fort Lauderdale", state: "Florida", href: "#" },
  { city: "Houston", state: "Texas", href: "#" },
  { city: "Indianapolis", state: "Indiana", href: "#" },
  { city: "Jacksonville", state: "Florida", href: "#" },
  { city: "Kansas City", state: "Missouri", href: "#" },
  { city: "Las Vegas", state: "Nevada", href: "#" },
];
const Inspiration = () => {
  const [activeTab, setActiveTab] = useState("inspiration");
  const [showAllCities, setShowAllCities] = useState(false);

  const CITIES_TO_SHOW_INITIALLY = 17;
  const citiesToShow = showAllCities
    ? apartmentLinks
    : apartmentLinks.slice(0, CITIES_TO_SHOW_INITIALLY);
  return (
    <div className="bg-gray-50 text-sm text-gray-800">
      <div className="max-w-[1360px] mx-auto pt-12 pb-8 px-2">
        {/* --- Inspiration Section --- */}
        <section>
          <h2 className="text-lg font-semibold">
            Inspiration for future getaways
          </h2>
          <div className="mt-4 border-b border-gray-300">
            {/* UPDATED: Tabs are now buttons to control state */}
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("inspiration")}
                className={`whitespace-nowrap pb-3 px-1 border-b-2 ${
                  activeTab === "inspiration"
                    ? "border-black font-semibold text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                Travel tips & inspiration
              </button>
              <button
                onClick={() => setActiveTab("apartments")}
                className={`whitespace-nowrap pb-3 px-1 border-b-2 ${
                  activeTab === "apartments"
                    ? "border-black font-semibold text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                Airbnb-friendly apartments
              </button>
            </nav>
          </div>

          {/* UPDATED: Conditionally render content based on activeTab */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4 mt-6 min-h-[120px]">
            {activeTab === "inspiration" ? (
              inspirationLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="hover:underline"
                >
                  <p className="font-semibold">{link.title}</p>
                  <p className="text-gray-500">{link.subtitle}</p>
                </a>
              ))
            ) : (
              // NEW: Render apartment links
              <>
                {citiesToShow.map((link) => (
                  <a
                    key={link.city}
                    href={link.href}
                    className="hover:underline"
                  >
                    <p className="font-semibold">{link.city}</p>
                    <p className="text-gray-500">{link.state}</p>
                  </a>
                ))}
                {/* NEW: Show more/less button */}
                {apartmentLinks.length > CITIES_TO_SHOW_INITIALLY && (
                  <button
                    onClick={() => setShowAllCities(!showAllCities)}
                    className="text-left hover:underline"
                  >
                    <div className="font-semibold flex items-center">
                      {showAllCities ? "Show less" : "Show more"}
                      {showAllCities ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )}
                    </div>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inspiration;
