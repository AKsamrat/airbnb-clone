import { Globe, MapPin, MessageCircle, Shield, Star } from "lucide-react";
import React from "react";

// TypeScript interfaces
interface CoHost {
  name: string;
  avatar: string;
}

interface HostInfo {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  reviewCount: number;
  rating: number;
  yearsHosting: number;
  responseRate: number;
  responseTime: string;
  languages: string[];
  location: string;
  bio?: string;
  coHosts?: CoHost[];
}

interface RoomData {
  hostId: string;
  hostInfo?: HostInfo;
}

interface HostProfileProps {
  roomData?: RoomData;
}

const HostProfile: React.FC<HostProfileProps> = ({ roomData }) => {
  // Default host data
  const defaultHostInfo: HostInfo = {
    name: "Pimsupa",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User-1234/original/abcd-1234.jpg", // Placeholder
    isSuperhost: true,
    reviewCount: 87,
    rating: 4.97,
    yearsHosting: 5,
    responseRate: 100,
    responseTime: "within an hour",
    languages: ["English", "Thai"],
    location: "Bangkok, Thailand",
    bio: "I love hosting guests and sharing the beauty of Bangkok with visitors from around the world.",
    coHosts: [
      {
        name: "David",
        avatar:
          "https://a0.muscache.com/im/pictures/user/User-5678/original/efgh-5678.jpg",
      },
    ],
  };

  const hostInfo = roomData?.hostInfo || defaultHostInfo;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Meet your host
      </h2>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Left Column - Host Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 lg:col-span-2">
          <div className="flex gap-3 items-center">
            {/* Host Avatar with Badge */}
            <div>
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={hostInfo.avatar}
                    alt={hostInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRTVFN0VCIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNTAiIHI9IjI0IiBmaWxsPSIjOUM5Q0EzIi8+CjxwYXRoIGQ9Ik0yMCAxMjBDMjAgOTUuNDcgMzkuNDcgNzYgNjQgNzZDODguNTMgNzYgMTA4IDk1LjQ3IDEwOCAxMjBIMjBaIiBmaWxsPSIjOUM5Q0EzIi8+Cjwvc3ZnPg==";
                    }}
                  />
                </div>

                {/* Superhost Badge */}
                {hostInfo.isSuperhost && (
                  <div className="absolute bottom-0 right-0 bg-pink-500 rounded-full p-2 border-4 border-white">
                    <Shield className="w-5 h-5 text-white fill-current" />
                  </div>
                )}
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {hostInfo.name}
              </h3>

              {hostInfo.isSuperhost && (
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-6">
                  <Shield className="w-4 h-4" />
                  <span>Superhost</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="w-full border-t border-gray-200 pt-6 space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {hostInfo.reviewCount}
                </div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>

              <div className="border-t border-gray-200"></div>

              {/* Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {hostInfo.rating}
                  </span>
                  <Star className="w-5 h-5 fill-current text-gray-900" />
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>

              <div className="border-t border-gray-200"></div>

              {/* Years Hosting */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {hostInfo.yearsHosting}
                </div>
                <div className="text-sm text-gray-600">Years hosting</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-3 space-y-8">
          {/* Superhost Info */}
          {hostInfo.isSuperhost && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {hostInfo.name} is a Superhost
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </p>
            </div>
          )}

          {/* Co-hosts */}
          {hostInfo.coHosts && hostInfo.coHosts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Co-hosts
              </h3>
              <div className="space-y-3">
                {hostInfo.coHosts.map((coHost, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={coHost.avatar}
                        alt={coHost.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRTVFN0VCIi8+CjxjaXJjbGUgY3g9IjI0IiBjeT0iMjAiIHI9IjgiIGZpbGw9IiM5QzlDQTMiLz4KPHBhdGggZD0iTTggNDRDOCAzNS43MTU3IDE0LjcxNTcgMjkgMjMgMjlDMzEuMjg0MyAyOSAzOCAzNS43MTU3IDM4IDQ0SDhaIiBmaWxsPSIjOUM5Q0EzIi8+Cjwvc3ZnPg==";
                        }}
                      />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {coHost.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Host details
            </h3>
            <div className="space-y-3">
              {/* Response Rate */}
              <div className="text-gray-900">
                <span className="font-medium">
                  Response rate: {hostInfo.responseRate}%
                </span>
              </div>

              {/* Response Time */}
              <div className="text-gray-900">
                <span>Responds {hostInfo.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Message Host Button */}
          <button className="w-full bg-gray-200 hover:bg-gray-300  font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Message host</span>
          </button>

          {/* Payment Protection Notice */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">
                  To protect your payment, never transfer money or communicate
                  outside of the Airbnb website or app.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Languages */}
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900 mb-1">
                Speaks {hostInfo.languages.join(" and ")}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900 mb-1">
                Lives in {hostInfo.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
