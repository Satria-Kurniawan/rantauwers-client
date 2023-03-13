import Image from "next/image";

export default function KosDetail() {
  return (
    <main className="mt-10">
      <div className="flex h-[70vh]">
        <Image
          src={"/assets/koss/1.jpg"}
          width={1280}
          height={720}
          alt="kos detail"
          className="w-[68vw] rounded-l-lg pr-2"
        />
        <div className="flex flex-col w-[32vw]">
          <Image
            src={"/assets/koss/1.jpg"}
            width={1280}
            height={720}
            alt="kos detail"
            className="h-1/2 rounded-tr-lg pb-1"
          />
          <Image
            src={"/assets/koss/1.jpg"}
            width={1280}
            height={720}
            alt="kos detail"
            className="h-1/2 rounded-br-lg pt-1"
          />
        </div>
      </div>
    </main>
  );
}
