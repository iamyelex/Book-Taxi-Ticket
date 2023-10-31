"use client";

import { useContext, useEffect, useRef } from "react";
import { Map } from "react-map-gl";

import { UserLocationContext } from "@/context/UserLocationContext";
import { LocationCoordinateContext } from "@/context/LocationCordinateContext";
import { DestinationCoordinateContext } from "@/context/DestinationCordinateContext";
import Markers from "@/app/(map)/Marker";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBox() {
  const mapRef = useRef<any>();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { locationCoordinate, setLocationCoordinate } = useContext(
    LocationCoordinateContext,
  );
  const { destinationCoordinate, setDestinationCoordinate } = useContext(
    DestinationCoordinateContext,
  );

  // console.log(userLocation);

  //Use to fly to the location of marker location
  useEffect(() => {
    if (locationCoordinate) {
      mapRef.current?.flyTo({
        center: [locationCoordinate.lng, locationCoordinate.lat],
        duration: 2500,
      });
    }
  }, [locationCoordinate]);

  //Use to fly to the location of marker destination
  useEffect(() => {
    if (destinationCoordinate) {
      mapRef.current?.flyTo({
        center: [destinationCoordinate.lng, destinationCoordinate.lat],
        duration: 2500,
      });
    }
  }, [destinationCoordinate]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Map</h2>

      <div className="overflow-hidden rounded-lg">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 500, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
          </Map>
        ) : null}
      </div>
    </div>
  );
}
