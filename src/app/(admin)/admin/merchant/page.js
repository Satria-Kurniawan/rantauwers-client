import { getMyOwnKos, getMyOwnRooms } from "@/lib/httpRequests";
import Kos from "./Kos";
import Rooms from "./Rooms";

export default async function Merchant() {
  const kos = await getMyOwnKos();
  const rooms = await getMyOwnRooms();

  return (
    <div>
      <Rooms rooms={rooms} />
      <Kos kos={kos} />
    </div>
  );
}
