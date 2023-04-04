"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { idrFormat } from "@/utils/idrFormat";
import { dateFormat } from "@/utils/dateFormat";

export default function TransactionRow({ session, transaction, index, query }) {
  const { data, isLoading, error, fetch } = useFetch();
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    fetch(`/order-service/order/${transaction.orderId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    });
  }, [fetch, transaction.orderId, session.accessToken]);

  useEffect(() => {
    if (!data) return;

    setTransactionData({
      user: data?.user,
      room: data?.room,
      order: data?.order,
      transaction,
    });
  }, [data, transaction]);

  if (isLoading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );

  if (error)
    return (
      <tr>
        <td>Failed to load data.</td>
      </tr>
    );

  if (query) {
    if (
      !transactionData?.user.name.toLowerCase().includes(query.toLowerCase()) &&
      !transactionData?.room.name.toLowerCase().includes(query.toLowerCase()) &&
      !transactionData?.order.amount.toString().includes(query.toLowerCase()) &&
      !transactionData?.transaction.reference
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      !transactionData?.transaction.status
        .toLowerCase()
        .startsWith(query.toLowerCase())
    ) {
      return null;
    }
  }

  return (
    <tr
      className={`${
        index % 2 === 0 && "bg-[#F5F5F5] dark:bg-dark dark:text-white"
      }`}
    >
      <td className="py-2 px-3"></td>
      <td className="py-2 px-3">{transactionData?.user.name}</td>
      <td className="py-2 px-3">{transactionData?.transaction.reference}</td>
      <td className="py-2 px-3">{transactionData?.room.name}</td>
      <td className="py-2 px-3">{idrFormat(transactionData?.order.amount)}</td>
      <td className="py-2 px-3">
        <div
          className={`py-0.5 px-3 rounded-lg inline-block font-semibold ${
            transactionData?.transaction.status === "UNPAID"
              ? "bg-blue-100 text-blue-500"
              : transactionData?.transaction.satus === "PAID"
              ? "bg-purple-100 text-primary"
              : "bg-red-100 text-red-500"
          }`}
        >
          {transactionData?.transaction.status}
        </div>
      </td>
      <td className="py-2 px-3">
        {dateFormat(transactionData?.transaction.createdAt)}
      </td>
    </tr>
  );
}
