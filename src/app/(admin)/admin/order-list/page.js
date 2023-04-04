import { getMyOwnKos, getMyOwnOrders } from "@/lib/httpRequests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Orders from "./Orders";

export default async function OrderList() {
  const kos = await getMyOwnKos();
  const orders = await getMyOwnOrders(kos.slug);
  const session = await getServerSession(authOptions);

  if (!kos || !orders) return <div>Failed to load data.</div>;

  return (
    <div>
      <Orders session={session} orders={orders} />
    </div>
  );
}
