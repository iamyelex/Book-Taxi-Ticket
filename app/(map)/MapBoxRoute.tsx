import { Source, Layer } from "react-map-gl";

export default function MapBoxRoute(props: any) {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: props.coordinate },
        properties: null,
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
}
