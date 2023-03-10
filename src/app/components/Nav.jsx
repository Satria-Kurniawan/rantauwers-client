import { Zen_Dots } from "next/font/google"
import Button from "./Button"

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] })

export default function Nav() {
  return (
    <nav className="w-full p-3 absolute top-0 z-10">
      <div className="container mx-auto px-10 flex items-center justify-between">
        <h1 className={`${zendots.className} text-xl uppercase text-stroke`}>
          Rantauwers
        </h1>
        <ul className="inline-flex items-center gap-x-3 text-white">
          <li>Gabung Jadi Mitra</li>
          <li>Contact</li>
          <li>About Us</li>
          <Button text={"Masuk"} className="border border-white" />
          <Button text={"Daftar"} isPrimary={true} />
        </ul>
      </div>
    </nav>
  )
}
