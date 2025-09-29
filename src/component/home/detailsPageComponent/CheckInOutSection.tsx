import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState } from "react";

// TypeScript interfaces
interface AvailableDateRange {
  startDate: string;
  endDate: string;
}

interface RoomData {
  price: number;
  availableDates: AvailableDateRange[];
}

interface BookingDatePickerProps {
  roomData?: RoomData;
  onDateChange?: (checkIn: Date | null, checkOut: Date | null) => void;
}

const BookingDatePicker: React.FC<BookingDatePickerProps> = ({
  roomData,
  onDateChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    roomData?.availableDates?.length
      ? new Date(roomData.availableDates[0].startDate)
      : null
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    roomData?.availableDates?.length
      ? new Date(roomData.availableDates[0].endDate)
      : null
  );
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(8); // September
  const [currentYear, setCurrentYear] = useState(2025);

  // Default room data
  const defaultRoomData: RoomData = {
    price: 180,
    availableDates: [{ startDate: "2025-09-28", endDate: "2025-10-31" }],
  };

  const data = roomData || defaultRoomData;

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

  const dayAbbreviations = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return "Add date";
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get days in month
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Check if date is available
  const isDateAvailable = (
    day: number,
    month: number,
    year: number
  ): boolean => {
    if (!data.availableDates || data.availableDates.length === 0) return false;

    const dateToCheck = new Date(year, month, day);

    return data.availableDates.some((range) => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      return dateToCheck >= startDate && dateToCheck <= endDate;
    });
  };

  // Check if date is in past
  const isPastDate = (day: number, month: number, year: number): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(year, month, day);
    return dateToCheck < today;
  };

  // Check if date is selected
  const isDateSelected = (
    day: number,
    month: number,
    year: number
  ): "start" | "end" | "range" | false => {
    if (!checkInDate && !checkOutDate) return false;

    const currentDate = new Date(year, month, day);
    const currentTime = currentDate.getTime();

    if (checkInDate && currentTime === checkInDate.getTime()) return "start";
    if (checkOutDate && currentTime === checkOutDate.getTime()) return "end";

    if (checkInDate && checkOutDate) {
      const startTime = checkInDate.getTime();
      const endTime = checkOutDate.getTime();
      if (currentTime > startTime && currentTime < endTime) return "range";
    }

    return false;
  };

  // Handle date click
  const handleDateClick = (day: number, month: number, year: number) => {
    if (!isDateAvailable(day, month, year) || isPastDate(day, month, year))
      return;

    const selectedDate = new Date(year, month, day);

    if (selectingCheckIn) {
      setCheckInDate(selectedDate);
      setCheckOutDate(null);
      setSelectingCheckIn(false);
    } else {
      if (checkInDate && selectedDate > checkInDate) {
        setCheckOutDate(selectedDate);
        setSelectingCheckIn(true);
      } else {
        setCheckInDate(selectedDate);
        setCheckOutDate(null);
      }
    }
  };

  // Navigate months
  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth > 0) {
        setCurrentMonth(currentMonth - 1);
      } else {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      }
    } else {
      if (currentMonth < 11) {
        setCurrentMonth(currentMonth + 1);
      } else {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      }
    }
  };

  // Apply dates and close modal
  const handleApply = () => {
    if (onDateChange) {
      onDateChange(checkInDate, checkOutDate);
    }
    setIsModalOpen(false);
  };

  // Clear dates
  const handleClear = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setSelectingCheckIn(true);
  };

  // Render calendar month
  const renderMonth = (monthOffset: number = 0) => {
    const displayMonth = currentMonth + monthOffset;
    const displayYear = displayMonth > 11 ? currentYear + 1 : currentYear;
    const adjustedMonth = displayMonth > 11 ? displayMonth - 12 : displayMonth;

    const daysInMonth = getDaysInMonth(adjustedMonth, displayYear);
    const firstDay = getFirstDayOfMonth(adjustedMonth, displayYear);
    const days: React.ReactElement[] = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-9 h-9"></div>);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDateAvailable(day, adjustedMonth, displayYear);
      const isPast = isPastDate(day, adjustedMonth, displayYear);
      const selectionType = isDateSelected(day, adjustedMonth, displayYear);

      let className =
        "w-9 h-9 flex items-center justify-center text-xs rounded-full cursor-pointer transition-colors ";

      if (isPast || !isAvailable) {
        className += "text-gray-300 cursor-not-allowed line-through";
      } else if (selectionType === "start" || selectionType === "end") {
        className += "bg-gray-900 text-white font-semibold";
      } else if (selectionType === "range") {
        className += "bg-gray-100 text-gray-900";
      } else {
        className += "text-gray-700 hover:bg-gray-100";
      }

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => handleDateClick(day, adjustedMonth, displayYear)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Calculate nights
  const calculateNights = (): number => {
    if (!checkInDate || !checkOutDate) return 0;
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const nights = calculateNights();

  return (
    <>
      {/* Date Input - Clickable */}
      <div
        className="grid grid-cols-2 border border-gray-300 rounded-lg mb-4 cursor-pointer hover:border-gray-900 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-3 border-r border-gray-300">
          <div className="text-xs font-semibold text-gray-900 mb-1">
            CHECK-IN
          </div>
          <div className="text-sm text-gray-700">{formatDate(checkInDate)}</div>
        </div>
        <div className="p-3">
          <div className="text-xs font-semibold text-gray-900 mb-1">
            CHECKOUT
          </div>
          <div className="text-sm text-gray-700">
            {formatDate(checkOutDate)}
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30  mt-16 p-0">
          <div className="bg-white rounded-l-xl shadow-2xl w-80 h-[500px] overflow-y-auto mr-12 ">
            {/* Modal Header - Compact */}
            <div className="sticky top-0 right-6 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {nights > 0
                    ? `${nights} night${nights > 1 ? "s" : ""}`
                    : "Select dates"}
                </h2>
                <p className="text-xs text-gray-600 mt-0.5">
                  {checkInDate && checkOutDate
                    ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
                    : selectingCheckIn
                    ? "Select check-in date"
                    : "Select check-out date"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Calendar Navigation */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                <h3 className="text-sm font-semibold text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </h3>

                <button
                  onClick={() => navigateMonth("next")}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Single Month Calendar */}
              <div>
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {dayAbbreviations.map((day) => (
                    <div
                      key={day}
                      className="w-9 h-7 flex items-center justify-center text-xs font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-0.5">{renderMonth(0)}</div>
              </div>

              {/* Selected dates summary */}
              {nights > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-600">Total</p>
                      <p className="text-sm font-medium text-gray-900">
                        {nights} nights
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Price</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${data.price * nights}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer - Compact */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 flex items-center justify-between">
              <button
                onClick={handleClear}
                className="text-xs font-medium text-gray-700 underline hover:text-gray-900 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                disabled={!checkInDate || !checkOutDate}
                className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingDatePicker;
