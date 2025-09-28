"use client";

import PhotoGallery from "@/component/home/detailsPageComponent/PhotoGalery";
import RoomDetails from "@/component/home/detailsPageComponent/RoomDetails";
import { getProductDetails } from "@/service/product";
import { Product } from "@/types/imdex";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(id);

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

  console.log(product);

  if (loading) {
    return <p className="text-center py-10">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  return (
    <div className="max-w-8xl mx-auto py-8 px-6 mt-44">
      <div>
        <PhotoGallery product={product}></PhotoGallery>
        <RoomDetails roomData={product}></RoomDetails>
      </div>
    </div>
  );
}
