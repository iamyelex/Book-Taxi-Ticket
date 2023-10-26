"use client";

import { useEffect, useState } from "react";

export default function GetAddress() {
  const [query, setQuery] = useState<string>();
  const [addressList, setAddressList] = useState<any>();

  const getAutoCompleteAddress = async function () {
    const res = await fetch("/api/search-address?q=" + query, {
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    setAddressList(result);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getAutoCompleteAddress();
    }, 1000);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="mt-5 space-y-3">
      <div>
        <label className="text-gray-400">Where From ?</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border bg-white p-1 outline-none focus:border-yellow-200"
        />

        {/* {addressList?.suggestions ? ( */}
        <div>
          {addressList?.suggestions?.map((list: any, i: number) => (
            <address key={i}>{list.full_address}</address>
          ))}
        </div>
        {/* ) : null} */}
      </div>

      <div className="mt-3">
        <label className="text-gray-400">Where To ?</label>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border bg-white p-1 outline-none focus:border-yellow-200"
        />
      </div>
    </div>
  );
}
