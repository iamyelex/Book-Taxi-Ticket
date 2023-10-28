"use client";

import { useEffect, useState } from "react";

export default function GetAddress() {
  const [location, setLocation] = useState<string>();
  const [changeLocation, setChangeLocation] = useState(false);

  const [destination, setDestination] = useState<string>();
  const [changeDestination, setChangeDestination] = useState(false);

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
        console.log(result);

        setAddressList(result);
      };

      getAutoCompleteAddress();
    }, 1000);

    return () => clearTimeout(delay);
  }, [changeLocation, destination, location]);

  const pickLocationAddressHandler = function (address: string) {
    setLocation(address);
    setAddressList([]);
    setChangeLocation(false);
  };

  const pickDestinationAddressHandler = function (address: string) {
    setDestination(address);
    setAddressList([]);
    setChangeDestination(false);
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
                onClick={() => pickLocationAddressHandler(list.full_address)}
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
                onClick={() => pickDestinationAddressHandler(list.full_address)}
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
