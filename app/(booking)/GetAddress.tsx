"use client";

import { useContext, useEffect, useState } from "react";

import { DestinationCoordinateContext } from "@/context/DestinationCordinateContext";
import { LocationCoordinateContext } from "@/context/LocationCordinateContext";

const MAP_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const session_token = "b0892745-ae4a-4846-b6ae-f25966689e97";

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

  useEffect(() => {
    const delay = setTimeout(() => {
      const getAutoCompleteAddress = async function () {
        setAddressList([]);

        const query = changeLocation ? location : destination;

        const res = await fetch("/api/search-address?q=" + query, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res) {
          return null;
        }

        const result = await res.json();
        // console.log(result);

        setAddressList(result);
      };

      getAutoCompleteAddress();
    }, 1000);

    return () => clearTimeout(delay);
  }, [changeLocation, destination, location]);

  const pickLocationAddressHandler = async function (list: any) {
    setLocation(list.full_address);
    setAddressList([]);
    setChangeLocation(false);

    const res = await fetch(
      MAP_RETRIEVE_URL +
        list.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    );

    const data = await res.json();
    const coord = data.features[0].geometry.coordinates;

    setLocationCoordinate({ lng: data[0], lat: data[1] });
    console.log(data);
  };

  const pickDestinationAddressHandler = async function (list: any) {
    setDestination(list.full_address);
    setAddressList([]);
    setChangeDestination(false);

    const res = await fetch(
      MAP_RETRIEVE_URL +
        list.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    );

    const data = await res.json();
    // const coord = data.features[0].geometry.coordinates;

    // setDestinationCoordinate({ lng: data[0], lat: data[1] });
    console.log(data);
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
            // if (e.target.value > 1)
          }}
          className="w-full rounded-md border bg-white p-1 outline-none focus:border-yellow-200"
        />

        {addressList?.suggestions && changeLocation ? (
          <div className="absolute w-full rounded-md bg-red-400 p-1 shadow-md">
            {addressList?.suggestions?.map((list: any, i: number) => (
              <address
                key={i}
                className="cursor-pointer p-3 hover:bg-gray-100"
                onClick={() => pickLocationAddressHandler(list)}
              >
                {list.full_address}
              </address>
            ))}
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
            {addressList?.suggestions?.map((list: any, i: number) => (
              <address
                key={i}
                className="cursor-pointer p-3 hover:bg-gray-100"
                onClick={() => pickDestinationAddressHandler(list)}
              >
                {list.full_address}
              </address>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
