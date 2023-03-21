"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaSearchLocation } from "react-icons/fa";
import { categories, koss } from "@/constants";
import { idrFormat } from "@/utils/idrFormat";

export default function Explore() {
  const router = useRouter();

  return (
    <main>
      <div className="flex gap-x-3 justify-evenly">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari kos..."
            className="w-[25rem] rounded-lg px-3 py-1.5 pl-12 bg-white"
          />
          <FaSearchLocation className="absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
        {categories.map((category, i) => (
          <div
            key={i}
            className={`bg-white w-full border-l-4 border-primary rounded-r-lg px-3 py-1.5 text-center`}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-4 gap-5 mt-7">
        {koss.map((kos, i) => (
          <div onClick={() => router.push(`${kos.name}/kos`)} key={i}>
            <div className="relative mb-5 z-10">
              <Image
                src={kos.image}
                width={600}
                height={400}
                alt="Kos-kosan"
                className="rounded-lg cursor-pointer"
              />
              <div className="rounded-lg bg-primary px-3 py-0.5 text-white absolute right-5 -bottom-3">
                {kos.type}
              </div>
            </div>
            <h1 className="font-semibold">{kos.name}</h1>
            <h2 className="text-sm">{kos.address}</h2>
            <div className="text-sm text-info">
              {kos.facilities.map((kf, i) => (
                <span key={i} className="text-sm">
                  {i !== kos.facilities.length - 1 ? kf + ", " : kf}
                </span>
              ))}
            </div>
            <div className="font-semibold mt-2">
              <span>{idrFormat(kos.price)}</span>
              <span className="text-info font-normal text-sm"> /bulan</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-4 gap-5 mt-7">
        {koss.map((kos, i) => (
          <div onClick={() => router.push(`${kos.name}/kos`)} key={i}>
            <div className="relative mb-5 z-10">
              <Image
                src={kos.image}
                width={600}
                height={400}
                alt="Kos-kosan"
                className="rounded-lg cursor-pointer"
              />
              <div className="rounded-lg bg-primary px-3 py-0.5 text-white absolute right-5 -bottom-3">
                {kos.type}
              </div>
            </div>
            <h1 className="font-semibold">{kos.name}</h1>
            <h2 className="text-sm">{kos.address}</h2>
            <div className="text-sm text-info">
              {kos.facilities.map((kf, i) => (
                <span key={i} className="text-sm">
                  {i !== kos.facilities.length - 1 ? kf + ", " : kf}
                </span>
              ))}
            </div>
            <div className="font-semibold mt-2">
              <span>{idrFormat(kos.price)}</span>
              <span className="text-info font-normal text-sm"> /bulan</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
