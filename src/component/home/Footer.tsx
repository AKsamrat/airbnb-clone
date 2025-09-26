"use client";

import { Facebook, Globe, Instagram, Twitter } from "lucide-react";

const footerSections = [
  // ... (data from previous step remains the same)
  {
    title: "Support",
    links: [
      { text: "Help Center", href: "#" },
      { text: "Get help with a safety issue", href: "#" },
      { text: "AirCover", href: "#" },
      { text: "Anti-discrimination", href: "#" },
      { text: "Disability support", href: "#" },
      { text: "Cancellation options", href: "#" },
      { text: "Report neighborhood concern", href: "#" },
    ],
  },
  {
    title: "Hosting",
    links: [
      { text: "Airbnb your home", href: "#" },
      { text: "Airbnb your experience", href: "#" },
      { text: "Airbnb your service", href: "#" },
      { text: "AirCover for Hosts", href: "#" },
      { text: "Hosting resources", href: "#" },
      { text: "Community forum", href: "#" },
      { text: "Hosting responsibly", href: "#" },
      { text: "Airbnb-friendly apartments", href: "#" },
      { text: "Join a free Hosting class", href: "#" },
      { text: "Find a co-host", href: "#" },
    ],
  },
  {
    title: "Airbnb",
    links: [
      { text: "2025 Summer Release", href: "#" },
      { text: "Newsroom", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Investors", href: "#" },
      { text: "Gift cards", href: "#" },
      { text: "Airbnb.org emergency stays", href: "#" },
    ],
  },
];

const PrivacyChoicesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 14"
    width="30"
    height="14"
    fill="none"
    role="img"
    aria-hidden="true"
  >
    <rect width="30" height="14" rx="7" fill="#06F"></rect>{" "}
    <path
      d="M12.75 3.25a.75.75 0 00-1.5 0v7.5a.75.75 0 001.5 0v-7.5z"
      fill="#fff"
    ></path>{" "}
    <path
      d="M5.151 4.349a.75.75 0 10-1.06 1.06l4.242 4.243a.75.75 0 101.06-1.06L5.15 4.35z"
      fill="#fff"
    ></path>{" "}
    <path
      d="M25.914 4.349a.75.75 0 00-1.06 1.06l4.242 4.243a.75.75 0 101.06-1.06l-4.242-4.243z"
      fill="#fff"
      transform="translate(-11.5 0)"
    ></path>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-sm text-gray-800 ">
      <div className="max-w-8xl mx-auto pt-12 pb-8 px-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-gray-800 hover:underline"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
      {/* --- Main Links Section (No changes here) --- */}

      {/* --- Bottom Bar (No changes here) --- */}
      <div className="border-t border-gray-300">
        <div className="max-w-screen-xl mx-auto py-6 px-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>&copy; 2025 Airbnb, Inc.</p>{" "}
            <div className="hidden md:block">&middot;</div>{" "}
            <a href="#" className="hover:underline">
              Terms
            </a>{" "}
            <div className="hidden md:block">&middot;</div>{" "}
            <a href="#" className="hover:underline">
              Sitemap
            </a>{" "}
            <div className="hidden md:block">&middot;</div>{" "}
            <a href="#" className="hover:underline">
              Privacy
            </a>{" "}
            <div className="hidden md:block">&middot;</div>
            <a href="#" className="flex items-center gap-2 hover:underline">
              Your Privacy Choices
              <PrivacyChoicesIcon />
            </a>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="flex items-center gap-2 font-semibold hover:underline"
            >
              <Globe size={18} /> English (US)
            </a>
            <a
              href="#"
              className="flex items-center gap-1 font-semibold hover:underline"
            >
              $ <span className="underline">USD</span>
            </a>
            <a href="#" className="hover:opacity-80">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:opacity-80">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:opacity-80">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
