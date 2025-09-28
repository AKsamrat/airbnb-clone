interface IReviewRatings {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

interface IProductDescription {
  aboutPlace: string;
  roomFacilities: string;
  other: string;
}
export interface Product {
  _id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
  reviews: IReviewRatings;
  hostId: string;
  summary: string;
  description: IProductDescription;
  availableDates: {
    startDate: string;
    endDate: string;
  }[];
  offers: string[];
  houseRules: string[];
  safetyPolicy: string[];
  cancellationPolicy: string;
  isFeatured: boolean;
  maxGuest: string;
}
