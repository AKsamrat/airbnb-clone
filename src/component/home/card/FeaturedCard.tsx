"use client";

import { Product } from "@/types/imdex";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FeaturedCardProps {
  room: Product;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ room }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/product/${room._id}`} className="block group">
      <div className="flex flex-col space-y-2">
        {/* --- Image Section --- */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={room.images[0]}
            alt={`Image of a place to stay in ${room.location}`}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
          />

          {/* Guest Favorite Badge */}

          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
            Guest favorite
          </div>

          {/* Heart/Favorite Button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition"
              aria-label="Favorite this listing"
            >
              <Heart
                size={20}
                className={`transition-all duration-300 ${
                  isFavorited
                    ? "text-red-500 fill-red-500"
                    : "text-black fill-black/30"
                }`}
              />
            </button>
          </div>
        </div>

        {/* --- Text Section --- */}
        <div className="flex flex-col">
          <h3 className="text-base  font-medium text-[14px]">
            {room.title || `Place in ${room.location}`}
          </h3>
          <div className="flex text-gray-600 text-[12px]">
            <span className="font-medium text-gray-500 mr-0.5">
              ${room.price}{" "}
            </span>
            {/* <span className="mx-1">&middot;</span> */}
            for <span>{3} nights</span>
            <div className="flex items-center gap-1 ml-1 ">
              <Star size={14} className="text-gray-400 fill-current" />
              <span className="text-sm font-medium">
                {room.rating?.toFixed(2) || "4.90"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
