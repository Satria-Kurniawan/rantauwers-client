import { getMyTransactions } from "@/lib/httpRequests";
import { Zen_Dots } from "next/font/google";
import Image from "next/image";
import Transactions from "./Transactions";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default async function MyTransactions() {
  const transactions = await getMyTransactions();

  return (
    <main>
      <h1 className={zendots.className}>Pembayaran</h1>
      <Image
        src={"/assets/section_line.png"}
        width={300}
        height={168}
        alt="section line"
        className="w-24 mt-3"
      />
      <section className="mt-5">
        <Transactions transactions={transactions} />
      </section>
    </main>
  );
}
