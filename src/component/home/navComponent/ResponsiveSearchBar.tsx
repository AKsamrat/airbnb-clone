"use client";
export const ResponsiveSearchBar = ({
  section,
  title,
  subtitle,
  active,
  onClick,
  children,
}: any) => (
  <div className="relative">
    <div
      className={`flex-1 px-2 py-2 cursor-pointer transition-all duration-200 `}
      onClick={onClick}
    >
      <div className="text-[14px] font-medium text-gray-700">{title}</div>
      {/* <div className="text-sm text-gray-400">{subtitle}</div> */}
    </div>
    {active && children && (
      <div
        className={`absolute top-full mt-2 bg-white rounded-3xl rounder-l-full shadow-xl border border-gray-200 p-6 px-6 z-70 ${
          section === "where"
            ? "left-0 w-64"
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
