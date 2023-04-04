import { Zen_Dots } from "next/font/google";
import { getOrdersByCustomer } from "@/lib/httpRequests";
import Image from "next/image";
import Booked from "./Booked";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default async function BookingHistory() {
  const orders = await getOrdersByCustomer();

  if (!orders) return <div>Failed to load data.</div>;

  return (
    <main>
      <h1 className={zendots.className}>Riwayat Booking</h1>
      <Image
        src={"/assets/section_line.png"}
        width={300}
        height={168}
        alt="section line"
        className="w-24 mt-3"
      />
      <section className="mt-5">
        <Booked orders={orders} />
      </section>
    </main>
  );
}
