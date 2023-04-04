"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Zen_Dots } from "next/font/google";
import { ParallaxLayer } from "@react-spring/parallax";
import { Navigation } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import Button from "@/components/Button";
import Kos from "./Kos";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function Recomended({ koses }) {
  const swiper = useSwiper();
  const swiperRef = useRef();
  const [isBeginingSlide, setIsBeginingSlide] = useState(true);
  const [isEndSlide, setIsEndSlide] = useState(false);

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

  const handleSlideChange = () => {
    if (swiperRef.current.swiper.isEnd) {
      setIsEndSlide(true);
    } else {
      setIsEndSlide(false);
    }

    if (swiperRef.current.swiper.isBeginning) {
      setIsBeginingSlide(true);
    } else {
      setIsBeginingSlide(false);
    }
  };

  if (!koses) return <div>Failed to load kos data.</div>;

  return (
    <div className="overflow-x-hidden">
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
            className="border border-primary text-primary z-10"
          />
          <button
            className={`swiper-button-prev h-10 w-10 rounded-full p-1 border border-primary flex justify-center items-center ${
              isBeginingSlide && "opacity-50"
            } z-10`}
          >
            <HiArrowNarrowLeft color="#8F00FF" size={25} />
          </button>
          <button
            className={`swiper-button-next h-10 w-10 rounded-full p-1 bg-primary flex justify-center items-center ${
              isEndSlide && "opacity-50"
            } z-10`}
          >
            <HiArrowNarrowRight color="white" size={25} />
          </button>
        </div>

        <Swiper
          ref={swiperRef}
          onSlideChange={handleSlideChange}
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          slidesPerGroup={4}
          onSwiper={(s) => {
            s.navigation.update();
          }}
          spaceBetween={30}
          slidesPerView={4}
        >
          <div>
            {koses.map((kos, i) => (
              <SwiperSlide key={i}>
                <Kos kos={kos} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </section>

      <ParallaxLayer offset={0} speed={-0.1}>
        <Image
          src={"/assets/particle_1.png"}
          alt="particle"
          width={800}
          height={600}
          className="h-screen w-full absolute top-[48rem] left-0 right-0 -z-10"
        />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.2}>
        <Image
          src={"/assets/particle_2.png"}
          alt="particle"
          width={800}
          height={600}
          className="h-screen w-[95vw] absolute top-[48rem] left-7 -z-10"
        />
      </ParallaxLayer>

      <div className="bg-dark2 h-[1px] w-full rotate-90 absolute top-[84rem] -left-[40rem] -z-20" />
      <div className="bg-dark2 h-[1px] w-full absolute top-[64rem] left-[2.1rem] -z-20" />
    </div>
  );
}
