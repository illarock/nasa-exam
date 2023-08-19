import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = request.url.split("neos/")[1];

  const res = await fetch(
    `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${process.env.API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const Xaxis = [];
  for (const key in data.close_approach_data) {
    const time =
      data.close_approach_data[key].close_approach_date_full.split(" ")[1];

    Xaxis.push(time);
  }

  const Yaxis = [];
  for (const key in data.close_approach_data) {
    Yaxis.push(data.close_approach_data[key].miss_distance.kilometers);
  }

  const charts = { x_axis: Xaxis, y_axis: Yaxis };

  return NextResponse.json(charts);
}
