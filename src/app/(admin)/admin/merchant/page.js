import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getMyOwnKos, getMyOwnRooms } from "@/lib/httpRequests";
import Kos from "./Kos";
import Rooms from "./Rooms";
import AdminHeader from "@/components/Header/AdminHeader";

export default async function Merchant() {
  const kos = await getMyOwnKos();
  const rooms = await getMyOwnRooms();
  const session = await getServerSession(authOptions);

  return (
    <div>
      <AdminHeader session={session} />
      <Rooms rooms={rooms} />
      <Kos kos={kos} />
    </div>
  );
}
