import Hero from "@/app/(user)/(landing)/Hero";
import Recomended from "@/app/(user)/(landing)/Recomended";
import Testimoni from "@/app/(user)/(landing)/Testimoni";

export default function Home() {
  return (
    <main>
      <Hero />
      <Recomended />
      <Testimoni />
    </main>
  );
}
