/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { fetchNextMonthAvailableHomes } from "@/service/product";
import { Product } from "@/types/imdex";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FeaturedCard from "./card/FeaturedCard";

export default function AvailableNextMonth() {
  const [featuredHomes, setFeaturedHomes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredHomes, setFilteredHomes] = useState<Product[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeaturedHomes = async () => {
      setLoading(true);
      const data = await fetchNextMonthAvailableHomes();
      const now = new Date();
      const startOfNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      );
      const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
      const filtered = data.filter((product: Product) =>
        product.availableDates?.some((d: any) => {
          const start = new Date(d.startDate);
          const end = new Date(d.endDate);
          return start <= endOfNextMonth && end >= startOfNextMonth;
        })
      );
      setFilteredHomes(filtered);
      setFeaturedHomes(filteredHomes);
      console.log(filtered, featuredHomes);
      setLoading(false);
    };
    fetchFeaturedHomes();
  }, []);

  // Scroll Right
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300 * 7,
        behavior: "smooth",
      });
    }
  };

  // Scroll Left
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300 * 7,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-12 max-w-8xl mx-auto px-16">
      {/* Title + Arrows Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          {" "}
          Available Next Month
          <ChevronRight className="w-5 h-4 text-gray-900 stroke-[3] " />
        </h2>

        {/* Arrow Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleScrollLeft}
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 shadow"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 shadow"
            aria-label="Scroll Right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth space-x-4"
      >
        {loading ? (
          <p>Loading...</p>
        ) : filteredHomes.length > 0 ? (
          filteredHomes.map((home) => (
            <div key={home._id} className=" min-w-[185px] max-w-[270px]">
              <FeaturedCard room={home} />
            </div>
          ))
        ) : (
          <p>No homes available for next month.</p>
        )}
      </div>
    </section>
  );
}
