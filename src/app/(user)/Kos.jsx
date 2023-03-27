import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
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

  return (
    <Link href={`${kos.slug}/kos`}>
      <div className="relative mb-5 z-10">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos.thumbnailImage}`}
          width={600}
          height={400}
          alt="Kos-kosan"
          className="rounded-lg h-[11rem]"
        />
        <div className="rounded-lg bg-primary px-3 py-0.5 text-white absolute right-5 -bottom-3">
          {kos.kosType}
        </div>
      </div>
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
    </Link>
  );
}
