import { getTransactionsByAdmin } from "@/lib/httpRequests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Transactions from "./Transactions";

export default async function TransactionList() {
  const session = await getServerSession(authOptions);
  const transactions = await getTransactionsByAdmin();

  return (
    <main>
      <Transactions session={session} transactions={transactions} />
    </main>
  );
}
