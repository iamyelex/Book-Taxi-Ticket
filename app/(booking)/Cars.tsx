"use state";

import Image from "next/image";
import { useState } from "react";

import { carList } from "@/data/carList";

export default function Cars() {
  const [selectedCar, setSelectedCar] = useState(0);

  return (
    <section className="mt-3">
      <h2 className="font-semibold">Select Car</h2>

      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {carList.map((car, i) => (
          <div
            key={car.name}
            className={`m-2 flex cursor-pointer flex-col justify-between rounded-md border p-2 transition-all hover:border-yellow-400 ${
              i === selectedCar ? "border-2 border-yellow-400" : ""
            }`}
            onClick={() => setSelectedCar(i)}
          >
            <Image
              src={car.image}
              alt={car.name}
              width={75}
              height={90}
              priority
              className="w-full"
            />

            <div className="flex items-center justify-between text-xs">
              <h2 className="text-gray-400">{car.name}</h2>
              <span>${car.charges * 10}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
