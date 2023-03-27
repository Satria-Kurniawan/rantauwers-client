"use client";

import Link from "next/link";
import Image from "next/image";
import { Zen_Dots } from "next/font/google";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Button from "../../../components/Button";
import { koss } from "@/constants";
import { idrFormat } from "@/utils/idrFormat";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { useEffect } from "react";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function Recomended() {
  const swiper = useSwiper();

  useEffect(() => {
    if (swiper) {
      const nextButton = document.querySelector(".swiper-button-next");
      const prevButton = document.querySelector(".swiper-button-prev");

      nextButton.addEventListener("click", function () {
        swiper.slideNext();
      });

      prevButton.addEventListener("click", function () {
        swiper.slidePrev();
      });
    }
  }, [swiper]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
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
        <div className="flex justify-end gap-x-3 mb-5">
          <Button
            text={"Lihat Semua"}
            className="border border-primary text-primary"
          />
          <button className="swiper-button-prev h-10 w-10 rounded-full p-1 border border-primary flex justify-center items-center">
            <HiArrowNarrowLeft color="#8F00FF" size={25} />
          </button>
          <button className="swiper-button-next h-10 w-10 rounded-full p-1 bg-primary flex justify-center items-center">
            <HiArrowNarrowRight color="white" size={25} />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          slidesPerGroup={4}
          onSwiper={(s) => {
            s.navigation.update();
          }}
          spaceBetween={20}
          slidesPerView={4}
        >
          {koss.map((kos, i) => (
            <SwiperSlide key={i}>
              <Link href={`${kos.name}/kos`}>
                <div className="relative mb-5 z-10">
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
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="grid md:grid-cols-4 gap-5 mt-5">
          {koss.map((kos, i) => (
            <div key={i}>
              <Link href={`${kos.name}/kos`}>
                <div className="relative mb-5 z-10">
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
              </Link>
            </div>
          ))}
        </div> */}
      </section>
      <h1
        className={`${zendots.className} text-lg float-rantauwers absolute left-20 bottom-20`}
      >
        RANTAUWERS
      </h1>
      <h1
        className={`${zendots.className} text-lg float-rantauwers absolute right-80 top-32`}
      >
        RANTAUWERS
      </h1>
    </div>
  );
}
