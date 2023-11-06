"use client";

import { useContext, useEffect, useRef } from "react";
import { Map } from "react-map-gl";

import { UserLocationContext } from "@/context/UserLocationContext";
import { LocationCoordinateContext } from "@/context/LocationCordinateContext";
import { DestinationCoordinateContext } from "@/context/DestinationCordinateContext";
import Markers from "@/app/(map)/Marker";

import "mapbox-gl/dist/mapbox-gl.css";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

const session_token = "b0892745-ae4a-4846-b6ae-f25966689e97";

export default function MapBox() {
  const mapRef = useRef<any>();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { locationCoordinate, setLocationCoordinate } = useContext(
    LocationCoordinateContext,
  );
  const { destinationCoordinate, setDestinationCoordinate } = useContext(
    DestinationCoordinateContext,
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

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

  useEffect(() => {
    const getDirectionRoute = async function () {
      const res = await fetch(
        MAPBOX_DRIVING_ENDPOINT +
          locationCoordinate.lng +
          "," +
          locationCoordinate.lat +
          ";" +
          destinationCoordinate.lng +
          "," +
          destinationCoordinate.lat +
          "?overview=full&geometries=geojson&access_token=" +
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      console.log(data);
      setDirectionData(data);
    };

    if (locationCoordinate && destinationCoordinate) {
      getDirectionRoute();
    }
  }, [destinationCoordinate, locationCoordinate, setDirectionData]);

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

            {directionData?.routes ? (
              <MapBoxRoute
                coordinate={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>

      <div className="absolute bottom-10 right-5 z-20 hidden md:block">
        <DistanceTime />
      </div>
    </div>
  );
}
