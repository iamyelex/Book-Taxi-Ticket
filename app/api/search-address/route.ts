// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(req: Request) {
  // const { userId } = auth();

  // if (!userId) {
  //   console.log("no auth");
  //   return null;
  // }

  // console.log("userId", userId);

  const { searchParams } = new URL(req.url);

  const searchText = searchParams.get("q");

  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "?language=en&limit=8&session_token=b0892745-ae4a-4846-b6ae-f25966689e97&country=US" +
      "&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  const searchResult = await res.json();

  return NextResponse.json(searchResult);
}
