"use client";

import { Product } from "@/types/imdex";
import { Grid3x3 as Grid3X3, Heart, Share } from "lucide-react";
import { useState } from "react";

interface ImageProperty {
  id: number;
  url: string;
  alt: string;
}

interface PropertyGalleryProps {
  title?: string;
  gallery: ImageProperty[];
}

export default function PropertyGallery({ product }: { product: Product }) {
  const [isSaved, setIsSaved] = useState(false);

  console.log(product);

  // Ensure we have at least one image
  if (product?.images?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center py-12">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  // First image is the main image, rest are thumbnails
  const mainImage = product?.images[0];
  const thumbnailImages = product?.images?.slice(1, 5); // Take up to 4 thumbnails

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this amazing property: ${product.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShowAllPhotos = () => {
    // This would typically open a photo product.images modal
    console.log(
      "Show all photos clicked - Total images:",
      product.images.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {product.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg font-medium underline decoration-1 underline-offset-2"
          >
            <Share className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={toggleSave}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium underline decoration-1 underline-offset-2 transition-colors ${
              isSaved
                ? "text-rose-600 hover:bg-rose-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
        {/* Main Image */}
        <div className="relative group cursor-pointer overflow-hidden rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none rounded-r-2xl">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        {/* Thumbnail Grid */}
        {thumbnailImages?.length > 0 && (
          <div className="grid grid-cols-2 gap-4 relative">
            {thumbnailImages?.map((image, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer overflow-hidden ${
                  index === 0 ? "rounded-tr-2xl lg:rounded-tr-none" : ""
                } ${index === 1 ? "rounded-tr-none lg:rounded-tr-2xl" : ""} ${
                  index === 2 ? "rounded-bl-2xl lg:rounded-bl-none" : ""
                } ${index === 3 ? "rounded-br-2xl" : ""}`}
              >
                <img
                  src={image}
                  alt={image}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                {/* Show all photos button on last visible image */}
                {index === Math.min(thumbnailImages.length - 1, 3) &&
                  product?.images?.length > 5 && (
                    <div className="absolute inset-0 bg-black bg-opacity-30">
                      <button
                        onClick={handleShowAllPhotos}
                        className="absolute bottom-4 right-4 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                      >
                        <Grid3X3 className="w-4 h-4" />
                        Show all photos
                      </button>
                    </div>
                  )}
              </div>
            ))}

            {/* Fill empty slots if less than 4 thumbnails */}
            {Array.from({
              length: Math.max(0, 4 - thumbnailImages.length),
            }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className={`bg-gray-100 ${
                  thumbnailImages.length + index === 0 ? "rounded-tr-2xl" : ""
                } ${
                  thumbnailImages.length + index === 1
                    ? "rounded-tr-2xl lg:rounded-tr-none"
                    : ""
                } ${
                  thumbnailImages.length + index === 2
                    ? "rounded-bl-2xl lg:rounded-bl-none"
                    : ""
                } ${
                  thumbnailImages.length + index === 3 ? "rounded-br-2xl" : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Show All Photos button */}
      {product?.images?.length > 1 && (
        <div className="lg:hidden mt-4">
          <button
            onClick={handleShowAllPhotos}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium"
          >
            <Grid3X3 className="w-4 h-4" />
            Show all {product.images.length} photos
          </button>
        </div>
      )}
    </div>
  );
}
