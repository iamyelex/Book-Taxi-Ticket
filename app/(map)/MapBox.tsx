"use client";

import { Map, Marker } from "react-map-gl";

import { useContext } from "react";
import { UserLocationContext } from "@/context/UserLocationContext";

import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

export default function MapBox() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  // console.log(userLocation);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Map</h2>

      <div className="overflow-hidden rounded-lg">
        {userLocation ? (
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 500, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker
              longitude={userLocation?.lng}
              latitude={userLocation?.lat}
              anchor="bottom"
            >
              {/* <img src="./pin.png" /> */}
              <Image src="/pin.png" alt="pin" width={30} height={30} />
            </Marker>
          </Map>
        ) : null}
      </div>
    </div>
  );
}
