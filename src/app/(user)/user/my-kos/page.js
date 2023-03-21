import Button from "@/components/Button";
import Link from "next/link";

export default function MyKost() {
  return (
    <main>
      <h1 className="text-xl font-semibold">Kos Saya</h1>
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
            <Button
              text={"Cari di Rantauwers"}
              isPrimary={true}
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
