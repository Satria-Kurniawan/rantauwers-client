"use client";

import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { VscArrowSmallDown } from "react-icons/vsc";
import AdminHeader from "@/components/Header/AdminHeader";
import TransactionRow from "./TransactionRow";

export default function Transactions({ session, transactions }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  const sortedTransactions = [...transactions].sort((a, b) => {
    const sortValue = sortBy === "asc" ? 1 : -1;
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortValue * (dateA - dateB);
  });

  return (
    <>
      <AdminHeader session={session}>
        <div className="relative h-fit">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-4 pl-9 rounded-lg bg-white dark:bg-dark2 dark:text-white focus:outline-primary"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-2 flex items-center">
            <IoSearch size={20} />
          </div>
        </div>
      </AdminHeader>

      <div className="rounded-lg border overflow-hidden bg-white dark:bg-dark2 dark:text-white">
        <h1 className="font-bold my-3 mx-5">Transaction List</h1>
        <hr />
        <table className="w-full table-auto text-sm">
          <thead>
            <tr>
              <th className="font-normal text-start py-3 pl-5"></th>
              <th className="font-normal text-start py-3 px-3">Customer</th>
              <th className="font-normal text-start py-3 px-3">Reference</th>
              <th className="font-normal text-start py-3 px-3">Kamar</th>
              <th className="font-normal text-start py-3 px-3">Jumlah</th>
              <th className="font-normal text-start py-3 px-3">Status</th>
              <th className="font-normal text-start py-3 px-3 flex items-center">
                <span>Tanggal</span>
                <span
                  onClick={() => setSortBy(sortBy === "asc" ? "desc" : "asc")}
                >
                  <VscArrowSmallDown
                    size={25}
                    className={`text-primary ${
                      sortBy === "asc" ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <TransactionRow
                key={transaction._id}
                session={session}
                transaction={transaction}
                index={index}
                query={query}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
