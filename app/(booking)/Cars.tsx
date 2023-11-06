"use state";

import Image from "next/image";
import { useContext, useState } from "react";

import { carList } from "@/data/carList";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { useCarAmount } from "@/store/useCarAmount";
// import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

export default function Cars() {
  const [selectedCar, setSelectedCar] = useState<number>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  // const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);
  const { carAmount, changeCarAmount } = useCarAmount();
  console.log(carAmount);

  const getCost = function (charges: number): number {
    const distance = directionData.routes[0].distance;
    const distanceInMiles = distance * 0.00621371;

    const cost = charges * distanceInMiles;
    return +cost.toFixed(2);
  };

  const setCar = function (i: number, car: { charges: number }) {
    setSelectedCar(i);
    changeCarAmount(getCost(car.charges));
  };

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
            onClick={() => setCar(i, car)}
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

              {directionData.routes && <span>${getCost(car.charges)}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
