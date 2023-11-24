"use client";

import { useContext, useEffect, useState } from "react";

import { DestinationCoordinateContext } from "@/context/DestinationCordinateContext";
import { LocationCoordinateContext } from "@/context/LocationCordinateContext";
import { MAP_RETRIEVE_URL, session_token } from "@/utils/constant";

export default function GetAddress() {
  const [location, setLocation] = useState<string>();
  const [changeLocation, setChangeLocation] = useState(false);
  const { locationCoordinate, setLocationCoordinate } = useContext(
    LocationCoordinateContext,
  );

  const [destination, setDestination] = useState<string>();
  const [changeDestination, setChangeDestination] = useState(false);
  const { destinationCoordinate, setDestinationCoordinate } = useContext(
    DestinationCoordinateContext,
  );

  const [addressList, setAddressList] = useState<any>([]);
  console.log(addressList);
  console.log(typeof addressList);

  useEffect(() => {
    const delay = setTimeout(() => {
      const getAutoCompleteAddress = async function () {
        setAddressList([]);

        const query = changeLocation ? location : destination;

        if (query === undefined) return;

        const res = await fetch("/api/search-address?q=" + query, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return;

        const result = await res.json();
        console.log(result);

        setAddressList(result);
      };

      getAutoCompleteAddress();
    }, 1000);

    return () => clearTimeout(delay);
  }, [changeLocation, destination, location]);

  const pickLocationAddressHandler = async function (list: {
    full_address: string;
    mapbox_id: number;
  }) {
    setLocation(list.full_address);
    setAddressList([]);
    setChangeLocation(false);

    const res = await fetch(
      `${MAP_RETRIEVE_URL}${list.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    );

    const data = await res.json();
    const coord = data.features[0].geometry.coordinates;

    setLocationCoordinate({ lng: coord[0], lat: coord[1] });
  };

  const pickDestinationAddressHandler = async function (list: {
    full_address: string;
    mapbox_id: number;
  }) {
    setDestination(list.full_address);
    setAddressList([]);
    setChangeDestination(false);

    const res = await fetch(
      `${MAP_RETRIEVE_URL}${list.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    );

    const data = await res.json();
    const coord = data.features[0].geometry.coordinates;

    setDestinationCoordinate({ lng: coord[0], lat: coord[1] });
  };

  return (
    <div className="relative mt-5 space-y-3">
      <div>
        <label className="text-gray-400">Where From ?</label>
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setChangeLocation(true);
            setLocation(e.target.value);
          }}
          className="w-full rounded-md border bg-white p-1 outline-none focus:border-yellow-200"
        />

        {addressList?.suggestions && changeLocation ? (
          <div className="absolute w-full rounded-md bg-red-400 p-1 shadow-md">
            {addressList?.suggestions?.map(
              (
                list: { full_address: string; mapbox_id: number },
                i: number,
              ) => (
                <address
                  key={i}
                  className="cursor-pointer p-3 hover:bg-gray-100"
                  onClick={() => pickLocationAddressHandler(list)}
                >
                  {list.full_address}
                </address>
              ),
            )}
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <label className="text-gray-400">Where To ?</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => {
            setChangeDestination(true);
            setDestination(e.target.value);
          }}
          className="w-full rounded-md border bg-white p-1 outline-none focus:border-yellow-200"
        />

        {addressList?.suggestions && changeDestination ? (
          <div className="absolute w-full rounded-md bg-red-400 p-1 shadow-md">
            {addressList?.suggestions?.map(
              (
                list: { full_address: string; mapbox_id: number },
                i: number,
              ) => (
                <address
                  key={i}
                  className="cursor-pointer p-3 hover:bg-gray-100"
                  onClick={() => pickDestinationAddressHandler(list)}
                >
                  {list.full_address}
                </address>
              ),
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
