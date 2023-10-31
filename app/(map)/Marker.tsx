import Image from "next/image";
import { useContext } from "react";
import { Map, Marker } from "react-map-gl";

import { UserLocationContext } from "@/context/UserLocationContext";
import { LocationCoordinateContext } from "@/context/LocationCordinateContext";
import { DestinationCoordinateContext } from "@/context/DestinationCordinateContext";

export default function Markers() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { locationCoordinate, setLocationCoordinate } = useContext(
    LocationCoordinateContext,
  );
  const { destinationCoordinate, setDestinationCoordinate } = useContext(
    DestinationCoordinateContext,
  );

  console.log(locationCoordinate, destinationCoordinate);

  return (
    <div>
      <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        {/* <img src="./pin.png" /> */}
        <Image src="/pin.png" alt="pin" width={30} height={30} />
      </Marker>

      {/* Location Marker  */}
      {locationCoordinate.length !== 0 ? (
        <Marker
          longitude={locationCoordinate?.lng}
          latitude={locationCoordinate?.lat}
          anchor="bottom"
        >
          <Image src="/pin.png" alt="pin" width={30} height={30} />
        </Marker>
      ) : null}

      {/* Destination Marker  */}
      {destinationCoordinate.length !== 0 ? (
        <Marker
          longitude={destinationCoordinate?.lng}
          latitude={destinationCoordinate?.lat}
          anchor="bottom"
        >
          <Image src="/pin.png" alt="pin" width={30} height={30} />
        </Marker>
      ) : null}
    </div>
  );
}
