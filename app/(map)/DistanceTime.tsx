import { useContext } from "react";

import { DirectionDataContext } from "@/context/DirectionDataContext";

export default function DistanceTime() {
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  return (
    directionData?.routes && (
      <div className="rounded-md bg-yellow-400 p-3">
        <h2 className="text-base text-yellow-100 opacity-80">
          Distance:
          <span className="mr-3 pl-1 font-bold text-black">
            {(directionData?.routes[0]?.distance * 0.00621).toFixed(2)} Miles
          </span>
          Duration:
          <span className="pl-1 font-bold text-black">
            {(directionData?.routes[0]?.duration / 60).toFixed(2)} Min
          </span>
        </h2>
      </div>
    )
  );
}
