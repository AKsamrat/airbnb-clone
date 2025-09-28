import { Product } from "@/types/imdex";
import { Car, Crown, Flag, Shield, Star } from "lucide-react";
import CalenderComponent from "./CalenderComponent";

const RoomDetails = ({ roomData }: { roomData: Product }) => {
  // Default amenities data (will be shared locally as mentioned)
  const defaultAmenities = [
    {
      icon: Shield,
      title: "Self check-in",
      description: "Check yourself in with the keypad.",
    },
    {
      icon: Car,
      title: "Free parking available",
      description:
        "This is one of the few places in the area with free parking.",
    },
    {
      icon: Crown,
      title: "Featured property",
      description: "This is a highly rated and featured property.",
    },
  ];

  // Default data structure matching your format
  const defaultData = {
    title: "Entire rental unit in Khet Phaya Thai, Thailand",
    location: "Phaya Thai, Thailand",
    price: 195,
    rating: 4.95,
    category: "Studio",
    reviews: {
      cleanliness: 4.6,
      accuracy: 4.7,
      checkIn: 4.8,
      communication: 4.9,
      location: 5.0,
      value: 4.5,
    },
    summary: "2 guests · Studio · 1 bed · 1 bathroom",
    maxGuest: "2",
    isFeatured: true,
    offers: ["High-speed Wi-Fi", "Kitchen", "Free parking", "Self check-in"],
    description: {
      aboutPlace:
        "Experience authentic Thai culture in this modern studio apartment.",
      roomFacilities:
        "The space features modern amenities and comfortable furnishings.",
      other:
        "Great location with easy access to transportation and attractions.",
    },
  };

  const data = roomData || defaultData;

  // Calculate total reviews (you can modify this logic based on your needs)
  const totalReviews = 59; // Default, or calculate from your data structure

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Scrollable content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {data.title}
            </h1>
            <p className="text-gray-600">{data.summary}</p>
          </div>

          {/* Featured Property Badge */}
          {data.isFeatured && (
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border">
              <div className="flex items-center space-x-4 text-gray-800 font-semibold">
                <div className="flex space-x-1">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="text-xl  text-gray-800">Featured</p>
                    <p className="text-xl  text-gray-800">property</p>
                  </div>
                  <Crown className="w-6 h-6 text-yellow-500" />
                </div>
                <p className="text-gray-800 flex-1">
                  One of the most loved homes on Airbnb
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-800 ">
                <div className=" mb-1">
                  <span className="text-2xl flex justify-center ">
                    {data.rating}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-current text-gray-800" />
                    <Star className="w-4 h-4 fill-current text-gray-800" />
                    <Star className="w-4 h-4 fill-current text-gray-800" />
                    <Star className="w-4 h-4 fill-current text-gray-800" />
                    <Star className="w-4 h-4 fill-current text-gray-800" />
                  </div>
                </div>
                <span className="border-l h-10 border-gray-500 "></span>
                <div>
                  <p className=" text-gray-800 text-2xl flex justify-center font-semibold">
                    {totalReviews}
                  </p>
                  <span>Reviews</span>
                </div>
              </div>
            </div>
          )}

          {/* Host Info - Using hostId as placeholder */}
          <div className="flex items-center space-x-3 py-4">
            <img
              src={"/man.png"}
              alt="Host"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">
                Hosted by {data.hostId?.replace("host_", "Host ") || "Host"}
              </p>
              <p className="text-sm text-gray-600">
                {data.isFeatured && "Featured Host · "}
                Experienced host
              </p>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            {defaultAmenities.map((amenity, index) => (
              <div key={index} className="flex items-start space-x-4 py-4">
                <amenity.icon className="w-6 h-6 text-gray-700 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {amenity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional content for scrolling demonstration */}
          <div className="space-y-6 pt-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-600 leading-relaxed">
                {data.description?.aboutPlace ||
                  "Experience the vibrant culture from this beautifully designed space."}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {data.description?.roomFacilities}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {data.description?.other}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Where you will sleep
              </h2>
              <div className="border rounded-lg p-4 w-[420px]">
                <img
                  src={roomData.images[1]}
                  alt={roomData.title}
                  className="w-[400px] h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="font-medium mb-2">{data.category || "Room"}</h3>
                <p className="text-gray-600 text-sm">{data.summary}</p>
              </div>
            </div>
            <hr className="text-gray-200 my-4" />
            <div>
              <h2 className="text-xl font-semibold mb-4">
                What this place offers
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.offers?.map((offer, index) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{offer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional info */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Good to know</h2>
              <div className="space-y-4">
                {data.houseRules && (
                  <div>
                    <h3 className="font-medium mb-2">House Rules</h3>
                    <p className="text-gray-600 text-sm">{data.houseRules}</p>
                  </div>
                )}
                {data.safetyPolicy && (
                  <div>
                    <h3 className="font-medium mb-2">Safety & Property</h3>
                    <p className="text-gray-600 text-sm">{data.safetyPolicy}</p>
                  </div>
                )}
                {data.cancellationPolicy && (
                  <div>
                    <h3 className="font-medium mb-2">Cancellation Policy</h3>
                    <p className="text-gray-600 text-sm">
                      {data.cancellationPolicy}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr className="text-gray-200" />
          <div className="flex justify-start">
            <CalenderComponent
              roomData={roomData}
              onDateSelect={(date: Date) => console.log("Selected:", date)}
            ></CalenderComponent>
          </div>
        </div>

        {/* Right side - Fixed booking panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="border border-gray-300 rounded-xl p-6 shadow-lg">
              {/* Price header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-semibold">${data.price}</span>
                  <span className="text-gray-600">night</span>
                </div>
                <div className="bg-pink-50 px-2 py-1 rounded-full">
                  <span className="text-xs text-pink-600 font-medium">
                    Prices include all fees
                  </span>
                </div>
              </div>

              {/* Check-in/out dates */}
              <div className="grid grid-cols-2 border border-gray-300 rounded-lg mb-4">
                <div className="p-3 border-r border-gray-300">
                  <div className="text-xs font-semibold text-gray-900 mb-1">
                    CHECK-IN
                  </div>
                  <div className="text-sm">9/28/2025</div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-900 mb-1">
                    CHECKOUT
                  </div>
                  <div className="text-sm">10/4/2025</div>
                </div>
              </div>

              {/* Guests selector */}
              <div className="border border-gray-300 rounded-lg p-3 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-900 mb-1">
                      GUESTS
                    </div>
                    <div className="text-sm">{data.maxGuest} guests</div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Reserve button */}
              <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:from-pink-600 hover:to-red-600 transition-colors mb-4">
                Reserve
              </button>

              <p className="text-center text-sm text-gray-600 mb-4">
                You wont be charged yet
              </p>

              {/* Report listing */}
              <div className="pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Flag className="w-4 h-4" />
                  <span className="underline">Report this listing</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
