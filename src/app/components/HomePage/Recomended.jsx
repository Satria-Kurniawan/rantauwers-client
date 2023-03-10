import Image from "next/image"
import { Zen_Dots } from "next/font/google"
import Button from "../Button"
import { koss } from "@/app/constants"
import { idrFormat } from "@/app/utils/idrFormat"
import { HiArrowNarrowRight } from "react-icons/hi"

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] })

export default function Recomended() {
  return (
    <div className="h-screen">
      <div className="flex justify-center mt-10">
        <div>
          <h1 className={`${zendots.className} text-lg text-center`}>
            Rekomendasi
          </h1>
          <p className="w-64 text-sm text-info">
            Berikut adalah beberapa kos-kosan yang direkomendasikan untuk anda
          </p>
          <Image
            src={"/assets/section_line.png"}
            width={300}
            height={168}
            alt="section line"
            className="w-32 mt-3"
          />
        </div>
      </div>
      <section className="mt-10">
        <div className="flex justify-end">
          <Button
            text={"Lihat Semua"}
            className="border border-primary text-primary"
          />
          <span>
            <HiArrowNarrowRight />
          </span>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-3">
          {koss.map((kos, i) => (
            <div key={i}>
              <div className="relative mb-5">
                <Image
                  src={kos.image}
                  width={600}
                  height={400}
                  alt="Kos-kosan"
                  className="rounded-lg"
                />
                <div className="rounded-lg bg-primary px-3 py-0.5 text-white absolute right-5 -bottom-3">
                  {kos.type}
                </div>
              </div>
              <h1 className="font-semibold">{kos.name}</h1>
              <h2 className="text-sm">{kos.address}</h2>
              <p className="text-sm text-info">
                {kos.facilities.map((kf, i) => (
                  <span key={i} className="text-sm">
                    {i !== kos.facilities.length - 1 ? kf + ", " : kf}
                  </span>
                ))}
              </p>
              <h1 className="font-semibold mt-2">
                {idrFormat(kos.price)}{" "}
                <span className="text-info font-normal text-sm">/bulan</span>
              </h1>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
