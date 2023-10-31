"use client";

import { useEffect, useState } from "react";

import { UserLocationContext } from "@/context/UserLocationContext";
import Booking from "@/app/(booking)/Booking";
import MapBox from "@/app/(map)/MapBox";
import { LocationCoordinateContext } from "@/context/LocationCordinateContext";
import { DestinationCoordinateContext } from "@/context/DestinationCordinateContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";

// type userLocationProps = {
//   lat: number;
//   lng: number;
// };

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();

  const [locationCoordinate, setLocationCoordinate] = useState<any>([]);
  const [destinationCoordinate, setDestinationCoordinate] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([]);

  const getUserLocation = function () {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <LocationCoordinateContext.Provider
        value={{ locationCoordinate, setLocationCoordinate }}
      >
        <DestinationCoordinateContext.Provider
          value={{ destinationCoordinate, setDestinationCoordinate }}
        >
          <DirectionDataContext.Provider
            value={{ directionData, setDirectionData }}
          >
            <section className="grid grid-cols-1 md:grid-cols-3">
              <div>
                <Booking />
              </div>
              <div className="col-span-2">
                <MapBox />
              </div>
            </section>
          </DirectionDataContext.Provider>
        </DestinationCoordinateContext.Provider>
      </LocationCoordinateContext.Provider>
    </UserLocationContext.Provider>
  );
}
