import { Zen_Dots } from "next/font/google";
import Image from "next/image";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function MyProfile() {
  return (
    <main>
      <h1 className={zendots.className}>Profil Saya</h1>
      <Image
        src={"/assets/section_line.png"}
        width={300}
        height={168}
        alt="section line"
        className="w-24 mt-3"
      />
    </main>
  );
}
