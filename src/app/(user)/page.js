import { getAllKos } from "@/lib/httpRequests";
import PageWrapper from "./PageWrapper";

export default async function Home() {
  const koses = await getAllKos();

  return (
    <>
      <PageWrapper koses={koses} />
    </>
  );
}
