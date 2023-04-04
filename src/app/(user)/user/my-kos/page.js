import { Zen_Dots } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function MyKost() {
  return (
    <main>
      <h1 className={zendots.className}>Kos Saya</h1>
      <Image
        src={"/assets/section_line.png"}
        width={300}
        height={168}
        alt="section line"
        className="w-24 mt-3"
      />
      <div className="flex h-[60vh]">
        <div className="m-auto w-[24rem]">
          <h1 className="text-2xl font-semibold mb-3">
            Kamu belum menyewa kos :(
          </h1>
          <p className="mb-5">
            Yuk sewa dulu di Rantauwers, kamu bisa cari kos-nya dulu melalui
            tombol dibawah
          </p>
          <Link href={"/explore"}>
            <Button text={"Cari di Rantauwers"} isPrimary className="w-full" />
          </Link>
          <Link href={"/user/booking-history"}>
            <Button
              text={"Lihat Riwayat Booking"}
              className="w-full border border-primary text-primary mt-3"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
