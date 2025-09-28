import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Alternative IP service
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    if (!data.success) {
      throw new Error("IP lookup failed");
    }

    return NextResponse.json({
      city: data.city,
      country_name: data.country,
      ip: data.ip,
    });
  } catch (error) {
    console.error("Location error:", error);
    return NextResponse.json(
      { error: "Failed to fetch IP location" },
      { status: 500 }
    );
  }
}
