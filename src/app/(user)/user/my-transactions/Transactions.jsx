import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import TransactionDetail from "./TransactionDetail";

export default async function Transactions({ transactions }) {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col gap-y-3">
      {transactions.map((transaction) => (
        <TransactionDetail
          key={transaction._id}
          transaction={transaction}
          session={session}
        />
      ))}
    </main>
  );
}
