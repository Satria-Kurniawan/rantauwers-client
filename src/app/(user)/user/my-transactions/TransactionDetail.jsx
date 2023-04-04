"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import { idrFormat } from "@/utils/idrFormat";
import { dateFormat } from "@/utils/dateFormat";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

export default function TransactionDetail({ transaction, session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsctructionOpen, setIsInstructionOpen] = useState(false);

  const { data, isLoading, error, fetch } = useFetch();

  useEffect(() => {
    fetch(
      `/payment-service/payment/${transaction.reference}/transaction-detail`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
      }
    );
  }, [fetch, transaction, session.accessToken]);

  const transactionDetail = data?.data;

  const countdown = useCountdownTimer(transactionDetail?.expired_time);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Failed to load data.</div>;

  return (
    <>
      <main className="flex gap-x-3">
        <section className="w-[60%] rounded-lg p-3">
          <p className="text-info">{transactionDetail?.reference}</p>
          <h2>{transactionDetail?.order_items[0].name}</h2>
          <h1 className="font-bold">{idrFormat(transactionDetail?.amount)}</h1>
          <span
            className={`py-0.5 px-3 text-xs rounded-lg ${
              transactionDetail?.status === "UNPAID"
                ? "bg-yellow-100 text-yellow-500"
                : transactionDetail?.status === "PAID"
                ? "bg-green-100 text-green-500"
                : "bg-red-100 text-red-500"
            }`}
          >
            {transactionDetail?.status === "UNPAID"
              ? "Menunggu Pembayaran"
              : transactionDetail?.status === "PAID"
              ? "Pembayaran Berhasil"
              : transactionDetail?.status === "EXPIRED"
              ? "Expired"
              : "Failed"}
          </span>
        </section>
        <section className="w-[40%] p-3 flex flex-col gap-y-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            text={"Instruksi Pembayaran"}
            isPrimary
          />
          <Link href={"/user/booking-history"}>
            <Button
              text={"Lihat Riwayat Booking"}
              className="border border-primary text-primary w-full"
            />
          </Link>
        </section>
      </main>
      <hr className="w-full my-1" />

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        className="w-[30rem]"
      >
        <section>
          <div className="bg-primary h-[6rem] p-5 absolute inset-0 -z-50">
            <h1 className="font-semibold text-white ">Rantauwers</h1>
          </div>
          <div className="bg-white w-[90%] h-[5rem] py-3 px-5 rounded-lg shadow-lg absolute top-14 left-1/2 right-1/2 -translate-x-1/2 flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-sm">Customer</h2>
              <h1 className="font-bold text-lg">
                {transactionDetail?.customer_name}
              </h1>
            </div>
            <div>
              <h2 className="font-semibold text-sm text-end">Expired</h2>
              <h1 className="font-bold text-lg text-end">{countdown}</h1>
            </div>
          </div>
        </section>
        <section className="border rounded-lg p-3 mt-[7rem] max-h-[50vh] overflow-auto">
          <div>
            <div className="flex justify-between mb-3">
              <div>
                <h2 className="font-semibold">Metode Pembayaran</h2>
                <p className="text-sm text-info">
                  {transactionDetail?.payment_method}
                </p>
                {transactionDetail?.pay_code && (
                  <div>
                    <h2 className="font-semibold">Kode Pembayaran</h2>
                    <h1 className="font-bold text-primary">
                      {transactionDetail?.pay_code}
                    </h1>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-sm text-end">
                  Bayar Sebelum
                </h2>
                <p className="text-sm text-info text-end">
                  {dateFormat(transactionDetail?.expired_time * 1000)}
                </p>
              </div>
            </div>

            <p>{transactionDetail?.order_items[0].name}</p>
            <h1 className="font-bold">
              {idrFormat(transactionDetail?.amount)}
            </h1>
            <span
              className={`py-0.5 px-3 text-xs rounded-lg ${
                transactionDetail?.status === "UNPAID"
                  ? "bg-yellow-100 text-yellow-500"
                  : transactionDetail?.status === "PAID"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {transactionDetail?.status === "UNPAID"
                ? "Menunggu Pembayaran"
                : transactionDetail?.status === "PAID"
                ? "Pembayaran Berhasil"
                : transactionDetail?.status === "EXPIRED"
                ? "Expired"
                : "Failed"}
            </span>

            <div className="rounded-lg border py-2 px-3 mt-3">
              <div
                onClick={() => setIsInstructionOpen(!isInsctructionOpen)}
                className="flex justify-between items-center cursor-pointer"
              >
                <span className="font-semibold">Intruksi Pembayaran</span>
                <FaChevronDown
                  size={20}
                  className={`${
                    isInsctructionOpen ? "rotate-180" : "rotate-0"
                  } duration-500`}
                />
              </div>
              {isInsctructionOpen && (
                <div className="mt-3">
                  <h1 className="text-sm mb-1">
                    {transactionDetail?.instructions[0].title}
                  </h1>
                  <ul className="text-sm text-info flex flex-col gap-y-1">
                    {transactionDetail?.instructions[0].steps.map((step, i) => (
                      <li key={i}>
                        <span>{i + 1}. </span>
                        <span dangerouslySetInnerHTML={{ __html: step }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
}
