import Image from "next/image"
import { Space_Mono, Zen_Dots } from "next/font/google"

const spacemono = Space_Mono({ subsets: ["latin"], weight: ["400"] })
const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] })

export default function Hero() {
  return (
    <div className="h-screen">
      <Image
        src={"/assets/hero_bg.jpg"}
        width={1280}
        height={720}
        alt="building"
        className="absolute top-0 left-0 w-full h-screen opacity-30"
      />
      <Image
        src={"/assets/hero.jpg"}
        width={1280}
        height={720}
        alt="room"
        className="absolute top-0 right-0 w-[60vw] h-[93vh] rounded-bl-3xl"
      />
      <section className="relative pt-40 leading-[1] z-10">
        <h2 className="text-[4rem]">FIND YOUR</h2>
        <h2 className="text-[5rem] font-bold">NEXT KOS</h2>
        <div className="h-2 rounded-lg w-20 bg-primary mt-3" />
        <p className={`w-80 mt-10 ${spacemono.className}`}>
          Rantauwers merupakan solusi cerdas bagi anda para pencari kos maupun
          pemilik usaha kos dengan menyediakan jaringan sosial yang lebih sosial
        </p>
        <Image
          src={"/assets/explore.png"}
          width={300}
          height={168}
          alt="expore button"
          className="w-32 mt-5"
        />
        <Image
          src={"/assets/polygon.png"}
          width={300}
          height={168}
          alt="polygon"
          className="absolute left-52 -bottom-32"
        />
      </section>
      <h1
        className={`${zendots.className} text-4xl float-rantauwers -rotate-90 absolute -left-32 top-96`}
      >
        RANTAUWERS
      </h1>
      <h1
        className={`${zendots.className} text-xl float-rantauwers absolute left-72 bottom-3`}
      >
        RANTAUWERS
      </h1>
    </div>
  )
}
