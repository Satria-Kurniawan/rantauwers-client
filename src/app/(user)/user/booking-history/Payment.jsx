"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { idrFormat } from "@/utils/idrFormat";
import { BsCreditCardFill } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import Image from "next/image";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

export default function Payment({ session, order, kos, room }) {
  const router = useRouter();
  const [paymentChannels, setPaymentChannels] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState(null);

  const { data, isLoading, error, fetch } = useFetch();

  useEffect(() => {
    fetch("/payment-service/payment/payment-channel", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    });
  }, [session.accessToken, fetch]);

  useEffect(() => {
    if (data) {
      setPaymentChannels(data.paymentChannels);
    }
  }, [data]);

  const filteredPaymentChannels =
    selectedPaymentType && paymentChannels
      ? paymentChannels.filter(
          (channel) => channel.group === selectedPaymentType
        )
      : paymentChannels;

  const {
    data: transactionData,
    isLoading: transactionIsLoading,
    error: transactionError,
    fetch: fetchRequestTransaction,
  } = useFetch();

  const handleRequestTransaction = () => {
    fetchRequestTransaction(
      `/payment-service/payment/${order._id}/request-transaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
        data: {
          paymentMethod: selectedPaymentChannel.code,
          amount: order.amount + selectedPaymentChannel.fee_merchant.flat,
          orderItem: {
            name: room.name,
            price: order.amount,
            quantity: 1,
          },
          kosOwnerId: kos.userId,
        },
      }
    );
  };

  useEffect(() => {
    if (transactionData) {
      router.push("/user/my-transactions");
    }
  }, [transactionData, router]);

  return (
    <>
      <section>
        <div className="bg-primary h-[6rem] p-5 absolute inset-0 -z-50">
          <h1 className="font-semibold text-white ">Rantauwers</h1>
        </div>
        <div className="bg-white w-[90%] h-[5rem] py-3 px-5 rounded-lg shadow-lg absolute top-14 left-1/2 right-1/2 -translate-x-1/2 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-sm">Total</h2>
            <h1 className="font-bold text-lg">
              {selectedPaymentChannel
                ? idrFormat(
                    order.amount + selectedPaymentChannel.fee_merchant.flat
                  )
                : idrFormat(order.amount)}
            </h1>
          </div>
          <div>
            {selectedPaymentChannel ? (
              <Image
                src={selectedPaymentChannel.icon_url}
                alt="Payment Channel"
                width={600}
                height={400}
                className="w-[5rem]"
              />
            ) : (
              <p className="text-sm text-info">Pilih Channel Pembayaran</p>
            )}
          </div>
        </div>
      </section>
      <section className="mt-[7rem] h-[50vh] overflow-auto">
        <div className="grid grid-cols-3 gap-x-3 mb-5">
          <div
            onClick={() => setSelectedPaymentType("Virtual Account")}
            className={`border p-3 rounded-lg cursor-pointer ${
              selectedPaymentType === "Virtual Account" &&
              "border-primary text-primary"
            }`}
          >
            <BsCreditCardFill size={25} className="mb-2" />
            Virtual Account
          </div>
          <div
            onClick={() => setSelectedPaymentType("Convenience Store")}
            className={`border p-3 rounded-lg cursor-pointer ${
              selectedPaymentType === "Convenience Store" &&
              "border-primary text-primary"
            }`}
          >
            <FaStore size={25} className="mb-2" />
            Convenience Store
          </div>
          <div
            onClick={() => setSelectedPaymentType("E-Wallet")}
            className={`border p-3 rounded-lg cursor-pointer ${
              selectedPaymentType === "E-Wallet" &&
              "border-primary text-primary"
            }`}
          >
            <IoWallet size={25} className="mb-2" />
            E-Wallet
          </div>
        </div>
        <div className="w-full border rounded-lg p-3 flex flex-col gap-y-3">
          {filteredPaymentChannels?.map((channel, i) => (
            <div key={i} className="border rounded-lg p-3">
              <div className="flex justify-between items-center">
                <section className="flex gap-x-3">
                  <Image
                    src={channel.icon_url}
                    alt="Payment Channel"
                    width={600}
                    height={400}
                    className="w-[7rem]"
                  />
                  <div>
                    <h1 className="font-semibold">{channel.name}</h1>
                    <div className="text-sm">
                      <span className="text-info">Biaya Admin</span>{" "}
                      <span className="text-primary">
                        {idrFormat(channel.fee_merchant.flat)}
                      </span>
                    </div>
                  </div>
                </section>
                <section>
                  <div
                    onClick={() => setSelectedPaymentChannel(channel)}
                    className={`border rounded-full ${
                      selectedPaymentChannel?.name === channel.name
                        ? "bg-primary text-white"
                        : "bg-secondary text-info"
                    } cursor-pointer`}
                  >
                    <HiCheck size={25} />
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div>
      </section>
      {transactionIsLoading ? (
        <div className="flex justify-center mt-5">
          <Loading className="w-16 h-16" />
        </div>
      ) : (
        <Button
          onClick={handleRequestTransaction}
          text={"Bayar Sekarang"}
          isPrimary
          className="w-full mt-5"
        />
      )}
    </>
  );
}
