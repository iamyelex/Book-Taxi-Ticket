"use client";

import { Map } from "react-map-gl";

export default function MapBox() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Map</h2>

      <div className="overflow-hidden rounded-lg">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          style={{ width: "100%", height: 500, borderRadius: 10 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </div>
    </div>
  );
}
