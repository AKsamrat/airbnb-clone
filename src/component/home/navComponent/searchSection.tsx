"use client";
export const SearchSection = ({
  section,
  title,
  subtitle,
  active,
  onClick,
  children,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => (
  <div className="relative">
    <div
      className={`flex-1 px-10 py-2 cursor-pointer transition-all duration-200  ${
        active
          ? "bg-white shadow-lg rounded-full scale-105  "
          : "hover:bg-gray-100  hover:rounded-full   hover:scale-105"
      } ${section !== "who" ? "  border-gray-300" : ""}`}
      onClick={onClick}
    >
      <div className="text-[16px] font-medium text-gray-900">{title}</div>
      <div
        className={`text-sm text-gray-400 truncate max-w-[140px] ${
          section === "where" ? " w-48" : section === "who" ? "w-28" : ""
        }`}
      >
        {subtitle}
      </div>
    </div>
    {active && children && (
      <div
        className={`absolute top-full mt-2 bg-white rounded-3xl rounder-l-full shadow-xl border border-gray-200 p-6 px-6 z-50 ${
          section === "where"
            ? "left-0 w-96"
            : section === "checkin" || section === "checkout"
            ? "left-1/2 transform -translate-x-1/2 w-auto"
            : "right-0 w-96"
        }`}
      >
        {children}
      </div>
    )}
  </div>
);
