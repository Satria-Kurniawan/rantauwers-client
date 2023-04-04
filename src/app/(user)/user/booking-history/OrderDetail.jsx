"use client";

import { useState } from "react";
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import { dateFormat } from "@/utils/dateFormat";
import { idrFormat } from "@/utils/idrFormat";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Payment from "./Payment";

export default function OrderDetail({ data, session }) {
  const { order, kos, room } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    goTo,
    nextStep,
    backStep,
  } = useMultistepForm([
    <>
      <section>
        <div className="bg-primary h-[6rem] p-5 absolute inset-0 -z-50">
          <h1 className="font-semibold text-white ">Rantauwers</h1>
        </div>
        <div className="bg-white w-[90%] h-[5rem] py-3 px-5 rounded-lg shadow-lg absolute top-14 left-1/2 right-1/2 -translate-x-1/2 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-sm">Customer</h2>
            <h1 className="font-bold text-lg">{session.user.name}</h1>
          </div>
          <div>
            <h2 className="font-semibold text-sm text-end">Tanggal Order</h2>
            <p className="text-sm text-info text-end">
              {dateFormat(order.createdAt)}
            </p>
          </div>
        </div>
      </section>
      <section className="border rounded-lg p-3 mt-[7rem] h-[50vh] overflow-auto">
        <div className="flex gap-x-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos.thumbnailImage}`}
            alt={kos.name}
            width={400}
            height={200}
            className="w-[10rem] h-[7rem] rounded-lg"
          />
          <div>
            <div className="text-lg font-semibold">
              <span>{kos.name}</span>{" "}
              <span className="text-sm font-normal">({room.name})</span>
            </div>
            <p>{kos.location}</p>
            <p>Mulai {dateFormat(order.fromDate)}</p>
            <h1 className="font-semibold text-xl">{idrFormat(order.amount)}</h1>
            <span
              className={`py-0.5 px-3 rounded-lg text-xs ${
                order.status === "WAITING"
                  ? "bg-yellow-100 text-yellow-500"
                  : order.status === "REJECTED"
                  ? "bg-red-100 text-red-500"
                  : order.status === "ACCEPTED"
                  ? "bg-purple-100 text-primary"
                  : order.status === "UNPAID"
                  ? "bg-blue-100 text-blue-500"
                  : order.status === "PAID"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
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
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="border rounded-lg p-3">
            <h1 className="font-semibold">Penyewa</h1>
            <p>{session.user.name}</p>
            <p className="text-info">{session.user.email}</p>
          </div>
          <div className="border rounded-lg p-3">
            <h1 className="font-semibold">Fasilitas Umum</h1>
            {kos.kosGeneralFacilities.map((facility, i) => (
              <span key={i}>
                {i !== kos.kosGeneralFacilities.length - 1
                  ? facility + ", "
                  : facility}
              </span>
            ))}
          </div>
          <div className="border rounded-lg p-3">
            <h1 className="font-semibold">Spesifikasi Kamar</h1>
            {room.roomSpecifications.map((specification, i) => (
              <span key={i}>
                {i !== room.roomSpecifications.length - 1
                  ? specification + ", "
                  : specification}
              </span>
            ))}
          </div>
          <div className="border rounded-lg p-3">
            <h1 className="font-semibold">Fasilitas Kamar</h1>
            {room.roomFacilities.map((facility, i) => (
              <span key={i}>
                {i !== room.roomFacilities.length - 1
                  ? facility + ", "
                  : facility}
              </span>
            ))}
          </div>
          <div className="border rounded-lg p-3">
            <h1 className="font-semibold">Fasilitas Kamar Mandi</h1>
            {room.bathroomFacilities.map((facility, i) => (
              <span key={i}>
                {i !== room.bathroomFacilities.length - 1
                  ? facility + ", "
                  : facility}
              </span>
            ))}
          </div>
          <div className="border rounded-lg p-3">
            <h1 className="font-semibold">Peraturan Kos</h1>
            {kos.kosRules.map((rule, i) => (
              <span key={i}>
                {i !== kos.kosRules.length - 1 ? rule + ", " : rule}
              </span>
            ))}
          </div>
        </div>
      </section>
      {order.status === "WAITING" ? (
        <h1 className="text-center mt-5">Menunggu Persetujuan Pemilik Kos</h1>
      ) : order.status === "ACCEPTED" ? (
        <Button
          onClick={() => nextStep()}
          text={"Lanjutkan"}
          isPrimary
          className="w-full mt-5"
        />
      ) : order.status === "REJECTED" ? (
        <h1 className="text-center mt-5">Ditolak Pemilik Kos</h1>
      ) : order.status === "UNPAID" ? (
        <h1 className="text-center mt-5">Mengunggu Pembayaran</h1>
      ) : order.status === "PAID" ? (
        <h1 className="text-center mt-5">Pembayaran Berhasil</h1>
      ) : (
        <h1>Pembayaran Gagal</h1>
      )}
    </>,
    <>
      <Payment session={session} order={order} kos={kos} room={room} />
    </>,
  ]);

  return (
    <>
      <section className="rounded-lg p-3 w-[40%] flex flex-col gap-y-3">
        {order.status === "UNPAID" ? (
          <Link href={"/user/my-transactions"}>
            <Button text={"Pembayaran"} isPrimary className="w-full" />
          </Link>
        ) : (
          <Button
            onClick={() => setIsModalOpen(true)}
            text={"Lihat Detail Order"}
            isPrimary
          />
        )}
        <Link href={`/${kos.slug}/kos`}>
          <Button
            text={"Lihat Kosan"}
            className="border border-primary text-primary w-full"
          />
        </Link>
      </section>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        className="w-[30rem]"
      >
        <>{step}</>

        {!isFirstStep ? (
          <Button
            onClick={() => backStep()}
            text={"Kembali"}
            className="w-full mt-3 border border-primary text-primary"
          />
        ) : (
          <Button
            onClick={() => setIsModalOpen(false)}
            text={"Tutup"}
            className="w-full mt-3 border border-primary text-primary"
          />
        )}
      </Modal>
    </>
  );
}
