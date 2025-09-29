import { Product } from "@/types/imdex";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

// TypeScript interfaces

interface AirbnbDatePickerProps {
  roomData?: Product;
  onDateSelect?: (
    startDate: Date | null,
    endDate: Date | null,
    nights: number
  ) => void;
}

const CalenderComponent: React.FC<AirbnbDatePickerProps> = ({
  roomData,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(8); // September 2025 (0-based)
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    roomData?.availableDates?.length
      ? new Date(roomData.availableDates[0].startDate)
      : null
  );

  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    roomData?.availableDates?.length
      ? new Date(roomData.availableDates[0].endDate)
      : null
  );
  const [isSelectingEnd, setIsSelectingEnd] = useState<boolean>(false);

  //   const data = roomData ;

  // Extract location from title or use location field
  const getLocationFromData = (): string => {
    if (roomData?.location) return roomData?.location;

    // Try to extract location from title
    const titleMatch = roomData?.title.match(/in (.+)$/);
    if (titleMatch) return titleMatch[1];

    return "this location";
  };

  // Month names and day abbreviations
  const monthNames: string[] = [
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

  const dayAbbreviations: string[] = ["S", "M", "T", "W", "T", "F", "S"];

  // Calculate nights between two dates
  const calculateNights = (start: Date | null, end: Date | null): number => {
    if (!start || !end) return 0;
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Format date range for display
  const formatDateRange = (): string => {
    if (!selectedStartDate || !selectedEndDate) return "Select dates";

    const formatOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const startStr = selectedStartDate.toLocaleDateString(
      "en-US",
      formatOptions
    );
    const endStr = selectedEndDate.toLocaleDateString("en-US", formatOptions);

    return `${startStr} - ${endStr}`;
  };

  // Get days in month
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Check if date is available based on availableDates from room roomData?
  const isDateAvailable = (
    day: number,
    month: number,
    year: number
  ): boolean => {
    if (!roomData?.availableDates || roomData?.availableDates.length === 0)
      return false;

    const dateToCheck = new Date(year, month, day);

    return roomData?.availableDates.some((range) => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      return dateToCheck >= startDate && dateToCheck <= endDate;
    });
  };

  // Check if date is selected and return selection type
  const isDateSelected = (
    day: number,
    month: number,
    year: number
  ): "start" | "end" | "range" | false => {
    if (!selectedStartDate || !selectedEndDate) return false;

    const currentDate = new Date(year, month, day);
    const startTime = selectedStartDate.getTime();
    const endTime = selectedEndDate.getTime();
    const currentTime = currentDate.getTime();

    if (currentTime === startTime) return "start";
    if (currentTime === endTime) return "end";
    if (currentTime > startTime && currentTime < endTime) return "range";

    return false;
  };

  // Handle date click
  const handleDateClick = (day: number, month: number, year: number): void => {
    if (!isDateAvailable(day, month, year)) return;

    const clickedDate = new Date(year, month, day);

    if (!isSelectingEnd || !selectedStartDate) {
      // Selecting start date
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
      setIsSelectingEnd(true);
    } else {
      // Selecting end date
      if (clickedDate > selectedStartDate) {
        setSelectedEndDate(clickedDate);
        setIsSelectingEnd(false);

        // Calculate nights and call callback
        const nights = calculateNights(selectedStartDate, clickedDate);
        if (onDateSelect) {
          onDateSelect(selectedStartDate, clickedDate, nights);
        }
      } else {
        // If clicked date is before start, make it the new start
        setSelectedStartDate(clickedDate);
        setSelectedEndDate(null);
        setIsSelectingEnd(true);
      }
    }
  };

  // Clear dates
  const clearDates = (): void => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setIsSelectingEnd(false);
    if (onDateSelect) {
      onDateSelect(null, null, 0);
    }
  };

  // Navigate months
  const navigateMonth = (direction: "prev" | "next"): void => {
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

  // Render calendar month
  const renderMonth = (monthOffset: number = 0) => {
    const displayMonth = currentMonth + monthOffset;
    const displayYear = displayMonth > 11 ? currentYear + 1 : currentYear;
    const adjustedMonth = displayMonth > 11 ? displayMonth - 12 : displayMonth;

    const daysInMonth = getDaysInMonth(adjustedMonth, displayYear);
    const firstDay = getFirstDayOfMonth(adjustedMonth, displayYear);
    const days: React.ReactElement[] = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-11 h-11"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDateAvailable(day, adjustedMonth, displayYear);
      const selectionType = isDateSelected(day, adjustedMonth, displayYear);

      let className =
        "w-11 h-11 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors ";

      if (!isAvailable) {
        className += "text-gray-300 cursor-not-allowed line-through";
      } else if (selectionType === "start" || selectionType === "end") {
        className += "bg-gray-900 text-white font-medium";
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

    return (
      <div className="flex-1">
        <h3 className="text-lg font-medium text-center mb-4">
          {monthNames[adjustedMonth]} {displayYear}
        </h3>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayAbbreviations.map((day: string, index) => (
            <div
              key={index}
              className="w-11 h-8 flex items-center justify-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const nights = calculateNights(selectedStartDate, selectedEndDate);
  const location = getLocationFromData();

  return (
    <div className="max-w-4xl  bg-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {nights > 0
            ? `${nights} nights in ${location}`
            : `Select dates in ${location}`}
        </h2>
        <p className="text-gray-600">{formatDateRange()}</p>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex space-x-8">
          {renderMonth(0)}
          {renderMonth(1)}
        </div>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Selected dates info */}
      {nights > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Selected dates</p>
              <p className="font-medium">{formatDateRange()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{nights} nights</p>
              <p className="font-medium">${(roomData?.price || 0) * nights}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">Exact dates</span>
        </button>

        <button
          onClick={clearDates}
          className="text-sm text-gray-700 underline hover:text-gray-900 transition-colors"
        >
          Clear dates
        </button>
      </div>
    </div>
  );
};

export default CalenderComponent;
