import Hero from "@/app/(user)/Hero";
import Recomended from "@/app/(user)/Recomended";
import Testimoni from "@/app/(user)/Testimoni";
import { getAllKos } from "@/lib/httpRequests";

export default async function Home() {
  const koses = await getAllKos();

  return (
    <main>
      <Hero />
      <Recomended koses={koses} />
      <Testimoni />
    </main>
  );
}
