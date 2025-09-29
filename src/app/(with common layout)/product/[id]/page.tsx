"use client";

import HostProfile from "@/component/home/detailsPageComponent/HostProfile";
import MapComponent from "@/component/home/detailsPageComponent/MapComponent";
import PhotoGallery from "@/component/home/detailsPageComponent/PhotoGalery";
import ReviewsSection from "@/component/home/detailsPageComponent/ReviewComponent";
import RoomDetails from "@/component/home/detailsPageComponent/RoomDetails";
import { getProductDetails } from "@/service/product";
import { Product } from "@/types/imdex";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface NavItem {
  id: string;
  label: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("photos");

  // Refs for each section
  const photosRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Navigation items
  const navItems: NavItem[] = [
    { id: "photos", label: "Photos", ref: photosRef },
    { id: "amenities", label: "Amenities", ref: amenitiesRef },
    { id: "reviews", label: "Reviews", ref: reviewsRef },
    { id: "location", label: "Location", ref: locationRef },
  ];

  // Handle scroll to show/hide sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Find active section based on scroll position
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (const item of navItems) {
        if (item.ref.current) {
          const element = item.ref.current;
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [700]);

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 80; // Account for sticky nav height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductDetails(id as string);
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchMap = async (p: Product) => {
      try {
        console.log(p);
        if (p.location) {
          const geoRes = await fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
              p.location
            )}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
          );
          const geoData = await geoRes.json();
          if (geoData.features?.length > 0) {
            const { lat, lon } = geoData.features[0].properties;
            setCoords({ lat, lon });
          }
        }
      } catch (error) {
        console.error("Failed to fetch map:", error);
      }
    };

    if (product) {
      fetchMap(product);
    }
  }, [product, id]);

  // console.log(product);

  if (loading) {
    return <p className="text-center py-10">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-80 transition-all duration-300 ${
          isSticky ? "translate-y-0 shadow-md" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-8 h-28 lg:h-20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item?.ref)}
                className={`relative text-sm font-medium transition-colors pb-4 ${
                  activeSection === item.id
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
                {/* Active indicator */}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="max-w-8xl mx-auto py-8 px-6 mt-44">
        <div>
          <div ref={photosRef} id="photos">
            <PhotoGallery product={product}></PhotoGallery>
          </div>
          <div ref={amenitiesRef} id="amenities">
            <RoomDetails roomData={product}></RoomDetails>
          </div>
          <div ref={reviewsRef} id="reviews">
            <ReviewsSection roomData={product} />
          </div>
          {coords && (
            <div
              ref={locationRef}
              id="location"
              className="mt-8 max-w-7xl px-6 mx-auto"
            >
              <h2 className="text-xl  font-semibold mb-2">Location</h2>
              <MapComponent
                lat={coords.lat}
                lon={coords.lon}
                title={product.title}
              />
            </div>
          )}
          <HostProfile roomData={product} />
        </div>
      </div>
    </>
  );
}
