import Booking from "@/app/(booking)/Booking";
import MapBox from "@/app/(map)/MapBox";

export default function Home() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      <div>
        <Booking />
      </div>
      <div className="col-span-2">
        <MapBox />
      </div>
    </section>
  );
}
