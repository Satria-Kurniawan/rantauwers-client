import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getKosById, getRoomById } from "@/lib/httpRequests";
import { idrFormat } from "@/utils/idrFormat";
import Image from "next/image";
import OrderDetail from "./OrderDetail";

export default async function Order({ order }) {
  const kos = await getKosById(order.kosId);
  const room = await getRoomById(order.roomId);
  const session = await getServerSession(authOptions);

  if (!kos || !room) return <div>Failed to load data.</div>;

  return (
    <>
      <main className="flex gap-x-3">
        <section
          className={`w-[60%] p-3 border-l-4 ${
            order.status === "WAITING"
              ? "border-warning"
              : order.status === "REJECTED"
              ? "border-danger"
              : order.status === "ACCEPTED"
              ? "border-primary"
              : order.status === "UNPAID"
              ? "border-blue-500"
              : order.status === "PAID"
              ? "border-success"
              : "border-danger"
          }`}
        >
          <div className="flex gap-x-5 w-fit">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos.thumbnailImage}`}
              alt={kos.name}
              width={400}
              height={200}
              className="w-[10rem] rounded-lg"
            />
            <div>
              <div className="inline-flex gap-x-2">
                <h1 className="font-bold">{kos.name}</h1>
                <h2 className="font-semibold">({room.name})</h2>
              </div>
              <h3 className="text-info">{kos.location}</h3>
              <div className="inline-flex gap-x-2">
                <span className="font-semibold">{idrFormat(order.amount)}</span>
                <span className="text-sm text-info">/{order.duration}</span>
              </div>
              <div
                className={`${
                  order.status === "WAITING"
                    ? "text-warning"
                    : order.status === "REJECTED"
                    ? "text-danger"
                    : order.status === "ACCEPTED"
                    ? "text-primary"
                    : order.status === "UNPAID"
                    ? "text-blue-500"
                    : order.status === "PAID"
                    ? "text-success"
                    : "text-danger"
                } text-sm`}
              >
                {order.status === "WAITING"
                  ? "Menunggu Persetujuan"
                  : order.status === "REJECTED"
                  ? "Ditolak"
                  : order.status === "ACCEPTED"
                  ? "Disetujui, Lanjutkan Pembayaran"
                  : order.status === "UNPAID"
                  ? "Menunggu Pembayaran"
                  : order.status === "PAID"
                  ? "Pembayaran Berhasil"
                  : "Pembayaran Gagal"}
              </div>
            </div>
          </div>
        </section>
        <OrderDetail data={{ order, kos, room }} session={session} />
      </main>
      <hr className="w-full my-1" />
    </>
  );
}
