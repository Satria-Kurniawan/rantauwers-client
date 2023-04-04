import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import Link from "next/link";
import Image from "next/image";
import { idrFormat } from "@/utils/idrFormat";

export default function Kos({ kos }) {
  const { data, isLoading, fetch } = useFetch();
  const [cheapestRoomPrice, setCheapestRoomPrice] = useState(null);
  const [mostExpensiveRoomPrice, setMosExpensiveRoomPrice] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch(`/merchant-service/room/${kos._id}/all`);
  }, [fetch, kos]);

  useEffect(() => {
    if (data) {
      const cheapest = Math.min(
        ...data.roomsPerKos.map((room) => room.pricePerMonth)
      );
      setCheapestRoomPrice(cheapest);

      const mosExpensive = Math.max(
        ...data.roomsPerKos.map((room) => room.pricePerMonth)
      );
      setMosExpensiveRoomPrice(mosExpensive);

      // Menyimpan data kamar yang hanya mengandung fasilitas kamar
      // Lalu memfilter fasilitas kamar sehingga tidak ada yang duplikat
      const facilityList = [];
      data.roomsPerKos.forEach((room) => {
        room.roomFacilities.forEach((facility) => {
          if (!facilityList.includes(facility)) {
            facilityList.push(facility);
          }
        });
      });
      setFacilities(facilityList);
    }
  }, [data]);

  const [hovered, setHovered] = useState(false);
  const [ref, { width }] = useMeasure();
  // const springsFill = useSpring({ width: open ? width : 0 });

  const springsFill = useSpring({
    from: {
      width: 0,
      backgroundColor: "transparent",
      opacity: 0,
    },
    to: {
      width: hovered ? width : 0,
      backgroundColor: hovered ? "#b53dff" : "turquoise",
      opacity: 0.3,
    },
    config: { duration: 300 },
  });

  return (
    <Link href={`${kos.slug}/kos`}>
      <div
        ref={ref}
        className="relative border border-dark2 rounded-lg h-[23rem]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <animated.div
          style={springsFill}
          className="absolute inset-0 rounded-lg z-50"
        />

        <div className="relative mb-3">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos.thumbnailImage}`}
            width={600}
            height={400}
            alt="Kos-kosan"
            className="rounded-t-lg h-[11rem]"
          />

          <div className="rounded-lg bg-primary px-3 py-0.5 text-white absolute right-5 -bottom-5">
            {kos.kosType}
          </div>
        </div>

        <div className="px-5 pb-3">
          <h1 className="font-semibold">{kos.name}</h1>
          <h2 className="text-sm">{kos.location}</h2>
          <div className="text-sm text-info">
            {facilities.map((facility, i) => (
              <span key={i} className="text-sm">
                {facility + ", "}
              </span>
            ))}
            {kos.kosGeneralFacilities.map((facility, i) => (
              <span key={i} className="text-sm">
                {i !== kos.kosGeneralFacilities.length - 1
                  ? facility + ", "
                  : facility}
              </span>
            ))}
          </div>
          <div className="font-semibold mt-2">
            {cheapestRoomPrice === mostExpensiveRoomPrice ? (
              <span>{idrFormat(cheapestRoomPrice)}</span>
            ) : (
              <span>
                {idrFormat(cheapestRoomPrice)} -
                {idrFormat(mostExpensiveRoomPrice).split("Rp")}
              </span>
            )}
            <span className="text-info font-normal text-sm"> /bulan</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
