import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import {
  getMyOwnKos,
  getMyOwnOrders,
  getMyOwnRooms,
  getTransactionsByAdmin,
} from "@/lib/httpRequests";
import AdminHeader from "@/components/Header/AdminHeader";
import Dashboard from "./Dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const kos = await getMyOwnKos();
  const orders = await getMyOwnOrders(kos.slug);
  const transactions = await getTransactionsByAdmin();
  const rooms = await getMyOwnRooms();
  const totalOrder = orders.length || 0;
  const totalTransaction = transactions.length || 0;
  const totalRoom = rooms.length || 0;
  const occupiedRoom = rooms.filter((room) => !room.isAvailable);
  const totalOccupiedRoom = occupiedRoom.length || 0;
  const paidOrders = orders.filter((order) => order.status === "PAID");
  const totalRevenue = paidOrders.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <div>
      <AdminHeader session={session} />
      <Dashboard
        totalOrder={totalOrder}
        totalTransaction={totalTransaction}
        totalRoom={totalRoom}
        totalOccupiedRoom={totalOccupiedRoom}
        totalRevenue={totalRevenue}
      />
    </div>
  );
}
