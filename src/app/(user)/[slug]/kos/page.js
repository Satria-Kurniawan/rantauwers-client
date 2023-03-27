import Kos from "./Kos";
import { getKos, getRooms } from "@/lib/httpRequests";

export default async function KosDetail({ params }) {
  const kos = await getKos(params.slug);
  const rooms = await getRooms(kos._id);

  return (
    <main>
      <Kos kos={kos} rooms={rooms} />
    </main>
  );
}
