import { MAP_RETRIEVE_URL, session_token } from "./constant";

export const pickAddress = async function (
  list: any,
  setAddress: any,
  setAddressList: any,
  setChange: any,
  setCoordinate: any,
) {
  setAddress(list.full_address);
  setAddressList([]);
  setChange(false);

  const res = await fetch(
    `${MAP_RETRIEVE_URL}${list.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
  );

  const data = await res.json();
  const coord = data.features[0].geometry.coordinates;

  setCoordinate({ lng: coord[0], lat: coord[1] });
  // console.log(data);
  // console.log(coord);
};
