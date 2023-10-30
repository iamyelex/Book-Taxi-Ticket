"use client";

import { useEffect, useState } from "react";

import { UserLocationContext } from "@/context/UserLocationContext";
import Booking from "@/app/(booking)/Booking";
import MapBox from "@/app/(map)/MapBox";

type userLocationProps = {
  lat: number;
  lng: number;
};

export default function Home() {
  const [userLocation, setUserLocation] = useState<userLocationProps>();

  const getUserLocation = function () {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <UserLocationContext.Provider value={(userLocation, setUserLocation)}>
      <section className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <Booking />
        </div>
        <div className="col-span-2">
          <MapBox />
        </div>
      </section>
    </UserLocationContext.Provider>
  );
}
