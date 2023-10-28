"use client";

import { useEffect, useState } from "react";

import GetAddress from "@/app/(booking)/GetAddress";
import Cars from "@/app/(booking)/Cars";
import Card from "@/app/(booking)/Card";

export default function Booking() {
  const [screenHeight, setScreenHeight] = useState(0);
  //   const screenHeight = window.innerHeight;

  useEffect(() => {
    setScreenHeight(window.innerHeight * 0.79);
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Booking</h2>

      <div className="rounded-md border p-5" style={{ height: screenHeight }}>
        <GetAddress />

        <Cars />

        <Card />

        <button className="mt-4 w-full rounded-md bg-yellow-400 p-1">
          Book
        </button>
      </div>
    </div>
  );
}
