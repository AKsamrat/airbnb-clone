/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircle,
  Droplet,
  Map,
  MessageSquare,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";
import React from "react";

// TypeScript interfaces
interface Reviews {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

interface RoomData {
  title: string;
  location: string;
  price: number;
  rating: number;
  category: string;
  reviews: Reviews;
  summary: string;
  maxGuest: string;
  isFeatured: boolean;
}

interface ReviewsSectionProps {
  roomData?: RoomData;
  totalReviews?: number;
}

interface ReviewCategory {
  key: keyof Reviews;
  label: string;
  icon: React.ComponentType<any>;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  roomData,
  totalReviews = 59,
}) => {
  // Default room data
  const defaultRoomData: RoomData = {
    title: "Modern Loft in New York City",
    location: "Manhattan, New York",
    price: 180,
    rating: 4.7,
    category: "Loft",
    reviews: {
      cleanliness: 4.9,
      accuracy: 5.0,
      checkIn: 4.9,
      communication: 5.0,
      location: 4.7,
      value: 4.9,
    },
    summary: "1 queen bed · 1 bathroom · Open kitchen",
    maxGuest: "4",
    isFeatured: true,
  };

  const data = roomData || defaultRoomData;

  // Review categories with icons
  const reviewCategories: ReviewCategory[] = [
    { key: "cleanliness", label: "Cleanliness", icon: Droplet },
    { key: "accuracy", label: "Accuracy", icon: CheckCircle },
    { key: "checkIn", label: "Check-in", icon: Search },
    { key: "communication", label: "Communication", icon: MessageSquare },
    { key: "location", label: "Location", icon: Map },
    { key: "value", label: "Value", icon: Tag },
  ];

  // Calculate overall rating distribution (simulated)
  const ratingDistribution = [
    { stars: 5, count: 52, percentage: 88 },
    { stars: 4, count: 5, percentage: 8 },
    { stars: 3, count: 2, percentage: 3 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  // Format rating to one decimal place
  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Main Header with Rating */}
      <div className="text-center mb-12">
        {/* Large Rating Display with Decorative Elements */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Left laurel */}
            <div className="absolute -left-24 top-1/2 transform -translate-y-1/2">
              <svg
                width="60"
                height="80"
                viewBox="0 0 60 80"
                fill="none"
                className="text-gray-600"
              >
                <path
                  d="M30 10 Q20 20, 15 35 Q10 50, 10 70 Q15 65, 20 60 Q25 55, 30 50 Q25 45, 22 40 Q19 35, 18 30 Q20 25, 25 20 Q28 15, 30 10"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M30 15 Q35 25, 38 35 Q41 45, 42 60 Q37 55, 32 50 Q30 45, 28 40"
                  fill="currentColor"
                  opacity="0.2"
                />
              </svg>
            </div>

            {/* Rating */}
            <h1 className="text-8xl font-bold text-gray-900">
              {formatRating(data.rating)}
            </h1>

            {/* Right laurel */}
            <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 scale-x-[-1]">
              <svg
                width="60"
                height="80"
                viewBox="0 0 60 80"
                fill="none"
                className="text-gray-600"
              >
                <path
                  d="M30 10 Q20 20, 15 35 Q10 50, 10 70 Q15 65, 20 60 Q25 55, 30 50 Q25 45, 22 40 Q19 35, 18 30 Q20 25, 25 20 Q28 15, 30 10"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M30 15 Q35 25, 38 35 Q41 45, 42 60 Q37 55, 32 50 Q30 45, 28 40"
                  fill="currentColor"
                  opacity="0.2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Guest Favorite Badge */}
        {data.isFeatured && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Guest favorite
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              This home is a guest favorite based on ratings, reviews, and
              reliability
            </p>
          </div>
        )}
      </div>

      {/* Rating Details Grid */}
      <div className="grid md:grid-cols-7 gap-3 mb-8">
        {/* Overall Rating Distribution */}
        <div className="">
          <h3 className="font-semibold text-gray-900 mb-4">Overall rating</h3>
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-4">{item.stars}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gray-900 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Category Ratings */}
        {reviewCategories.map((category) => {
          const IconComponent = category.icon;
          const rating = data.reviews[category.key];

          return (
            <div key={category.key} className="border-l border-gray-200 pl-6">
              <h3 className="font-medium text-gray-900 mb-2">
                {category.label}
              </h3>
              <div className="text-3xl font-semibold text-gray-900 mb-3">
                {formatRating(rating)}
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                <IconComponent className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Reviews Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Based on{" "}
          <span className="font-semibold text-gray-900">
            {totalReviews} reviews
          </span>
        </p>
      </div>

      {/* Additional Stats */}
      <div className="mt-8 grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {formatRating(data.rating)}
          </div>
          <div className="text-sm text-gray-600">Overall Rating</div>
        </div>
        <div className="text-center border-x border-gray-200">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {totalReviews}
          </div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Math.round(
              (ratingDistribution[0].percentage / 100) * totalReviews
            )}
          </div>
          <div className="text-sm text-gray-600">5-Star Reviews</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
