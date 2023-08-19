import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  if (!startDate || !endDate)
    return NextResponse.json("Add a start date or end date");

  const res = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const neos = [] as any;
  for (const key in data.near_earth_objects) {
    data.near_earth_objects[key].map((item: any) => {
      const LD = 384400;
      const halfLD = LD / 2;
      const kilometers = parseInt(
        item.close_approach_data[0].miss_distance.kilometers
      );

      let colorStatus = "green";

      if (kilometers >= LD) {
        colorStatus = "green";
      } else if (kilometers < LD && kilometers > halfLD) {
        colorStatus = "orange";
      } else if (kilometers <= halfLD) {
        colorStatus = "red";
      }

      neos.push({
        id: item.id,
        date: key,
        name: item.name,
        colorStatus,
        kilometers: kilometers.toString(),
      });
    });
  }

  return NextResponse.json(neos);
}
