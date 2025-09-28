"use client";
import { useEffect, useState } from "react";

interface LocationInfo {
  city: string;
  country_name: string;
}

const useUserLocation = () => {
  const [location, setLocation] = useState<LocationInfo | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("/api/location");
        const data = await res.json();
        console.log(" Location data:", data);
        setLocation(data);
      } catch (error) {
        console.error("Failed to get location", error);
      }
    };

    fetchLocation();
  }, []);

  return location;
};

export default useUserLocation;
