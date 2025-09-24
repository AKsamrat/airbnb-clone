import React from "react";

// Types for the component
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

interface CalendarMonthProps {
  month: number;
  year: number;
  title: string;
  searchData: SearchData;
  setSearchData: React.Dispatch<React.SetStateAction<SearchData>>;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  year,
  title,
  searchData,
  setSearchData,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
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

  // Check if date is in selected range
  const isDateInRange = (date: Date) => {
    if (!searchData.checkIn || !searchData.checkOut) return false;
    return date >= searchData.checkIn && date <= searchData.checkOut;
  };

  // Check if date is selected (check-in or check-out)
  const isDateSelected = (date: Date) => {
    return (
      (searchData.checkIn &&
        date.toDateString() === searchData.checkIn.toDateString()) ||
      (searchData.checkOut &&
        date.toDateString() === searchData.checkOut.toDateString())
    );
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (!searchData.checkIn || (searchData.checkIn && searchData.checkOut)) {
      // Set check-in date, clear check-out
      setSearchData((prev) => ({
        ...prev,
        checkIn: date,
        checkOut: null,
      }));
    } else if (date >= searchData.checkIn) {
      // Set check-out date
      setSearchData((prev) => ({
        ...prev,
        checkOut: date,
      }));
    } else {
      // If selected date is before check-in, set it as new check-in
      setSearchData((prev) => ({
        ...prev,
        checkIn: date,
        checkOut: null,
      }));
    }
  };

  const days = generateCalendarDays();

  return (
    <div className="min-w-0 w-[480px] flex-1 px-4">
      <h3 className="text-lg font-semibold mb-4 text-center text-black">
        {monthNames[month]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-xs font-medium text-gray-700 text-center py-2"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-blue-600">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
          const selected = isDateSelected(date);
          const inRange = isDateInRange(date);

          return (
            <button
              key={index}
              onClick={() => !isPast && isCurrentMonth && handleDateClick(date)}
              disabled={isPast || !isCurrentMonth}
              className={`
                  w-10 h-10 text-sm rounded-full transition-all duration-200 mx-auto
                  ${!isCurrentMonth ? "text-gray-300 cursor-not-allowed" : ""}
                  ${isPast ? "text-gray-300 cursor-not-allowed" : ""}
                  ${selected ? "bg-gray-900 text-white" : ""}
                  ${inRange && !selected ? "bg-gray-100" : ""}
                  ${
                    !selected && !inRange && !isPast && isCurrentMonth
                      ? "hover:bg-gray-200"
                      : ""
                  }
                `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;
