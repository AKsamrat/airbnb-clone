import { Product } from "@/types/imdex";

export const getAllProducts = async (
  page?: string | number,
  limit?: string | number,
  query?: {
    destination?: string;
    checkIn?: Date;
    checkOut?: Date;
    guests?: { adults: number; children: number; infants: number };
  }
) => {
  try {
    const params = new URLSearchParams();

    if (query?.destination) {
      params.append("destination", query.destination);
    }

    if (query?.checkIn) {
      params.append("checkIn", query.checkIn.toISOString());
    }
    if (query?.checkOut) {
      params.append("checkOut", query.checkOut.toISOString());
    }

    if (query?.guests) {
      params.append("adults", query.guests.adults.toString());
      params.append("children", query.guests.children.toString());
      params.append("infants", query.guests.infants.toString());
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/products?page=${
      page?.toString() || "1"
    }&limit=${limit?.toString() || "10"}&${params}`;

    const res = await fetch(url, {
      next: { tags: ["PRODUCTS"] },
    });

    if (!res.ok) throw new Error("Failed to fetch rooms");

    return res.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getPopularHomesByDestination = async (location: string) => {
  // console.log(location);
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/products/popularHome?location=${encodeURIComponent(location)}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch popular homes: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching popular homes:", error);
    return [];
  }
};
export const getFeaturedHomes = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products/featured`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch featured homes: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(" Error in getFeaturedHomes:", error);
    return [];
  }
};
export const fetchNextMonthAvailableHomes = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products/available-next-month`
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch next month available homes", error);
    return [];
  }
};

export async function getProductDetails(id: string): Promise<Product | null> {
  try {
    console.log(id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
}
