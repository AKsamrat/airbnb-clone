"use client";

import { getFeaturedHomes } from "@/service/product";
import { Product } from "@/types/imdex";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FeaturedCard from "./card/FeaturedCard";

export default function FeaturedSection() {
  const [featuredHomes, setFeaturedHomes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeaturedHomes = async () => {
      setLoading(true);
      const data = await getFeaturedHomes();
      setFeaturedHomes(data);
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
          Featured Homes
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
        ) : featuredHomes.length > 0 ? (
          featuredHomes.map((home) => (
            <div key={home._id} className=" min-w-[185px] max-w-[270px]">
              <FeaturedCard room={home} />
            </div>
          ))
        ) : (
          <p>No featured homes available.</p>
        )}
      </div>
    </section>
  );
}
