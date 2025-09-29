"use client";
import FeaturedCard from "@/component/home/card/FeaturedCard";
import { getAllProducts } from "@/service/product";
import { Product } from "@/types/imdex";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const query = {
        destination: searchParams.get("destination") || undefined,
        checkIn: searchParams.get("checkIn")
          ? new Date(searchParams.get("checkIn") as string)
          : undefined,
        checkOut: searchParams.get("checkOut")
          ? new Date(searchParams.get("checkOut") as string)
          : undefined,
        adults: searchParams.get("adults")
          ? Number(searchParams.get("adults"))
          : undefined,
        children: searchParams.get("children")
          ? Number(searchParams.get("children"))
          : undefined,
        infants: searchParams.get("infants")
          ? Number(searchParams.get("infants"))
          : undefined,
      };

      const page = Number(searchParams.get("page") || "1");
      const limit = Number(searchParams.get("limit") || "10");

      const result = await getAllProducts(page, limit, query);
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  console.log(data);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-8xl mx-auto px-20 mt-44">
      <h2 className=" text-xl font-bold ">Search Results</h2>
      <div className="grid grid-cols-7 gap-2.5">
        {data?.data?.length ? (
          data?.data.map((room: Product) => (
            <FeaturedCard key={room._id} room={room} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
