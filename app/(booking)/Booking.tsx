"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GetAddress from "@/app/(booking)/GetAddress";
import Cars from "@/app/(booking)/Cars";
import Card from "@/app/(booking)/Card";
import { useCarAmount } from "@/store/useCarAmount";

export default function Booking() {
  const [screenHeight, setScreenHeight] = useState(0);
  const { carAmount } = useCarAmount();

  const router = useRouter();

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

        <button
          className={`mt-4 w-full rounded-md bg-yellow-400 p-1 ${
            !carAmount ? "bg-gray-100" : ""
          }`}
          onClick={() => router.push("/payment")}
          disabled={!carAmount}
        >
          Book
        </button>
      </div>
    </div>
  );
}
