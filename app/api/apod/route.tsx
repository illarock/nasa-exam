import { getRandomDate } from "@/utils/randomDate";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const randomDate = getRandomDate();

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${randomDate}&api_key=${process.env.API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const dataName = await res.json();
  const data = dataName.hdurl;

  return NextResponse.json(data);
}
