"use client";

import { useEffect, useState } from "react";
import GetAddress from "@/app/(booking)/GetAddress";

export default function Booking() {
  const [screenHeight, setScreenHeight] = useState(0);
  //   const screenHeight = window.innerHeight;

  useEffect(() => {
    setScreenHeight(window.innerHeight * 0.72);
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Booking</h2>

      <div className="rounded-md border p-5" style={{ height: screenHeight }}>
        <GetAddress />
      </div>
    </div>
  );
}
