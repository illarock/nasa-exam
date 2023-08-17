import { getRandomDate } from "@/utils/randomDate";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let success = false;
  let data = [];

  const { searchParams } = new URL(request.url);
  const dateReq = searchParams.get("date");

  while (!success) {
    const randomDate = getRandomDate(true);

    let earthDate = randomDate;
    if (dateReq) {
      earthDate = dateReq;
    }

    const res = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${process.env.API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    data = await res.json();

    if (data.photos.length !== 0 && !dateReq) {
      success = true;

      const photos = [];
      for (const key in data.photos) {
        photos.push({
          id: data.photos[key].id,
          url: data.photos[key].img_src,
        });
      }

      return NextResponse.json(photos);
    }

    if (dateReq) {
      success = true;
      let photos = [];

      if (data.photos.length !== 0) {
        for (const key in data.photos) {
          photos.push({
            id: data.photos[key].id,
            url: data.photos[key].img_src,
          });
        }
      }

      return NextResponse.json(photos);
    }
  }
}
