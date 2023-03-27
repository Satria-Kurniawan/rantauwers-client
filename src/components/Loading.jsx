import Image from "next/image";

export default function Loading({ className = "" }) {
  return (
    <Image
      src={"/assets/double_ring.svg"}
      alt="Loading io"
      width={400}
      height={400}
      className={className}
    />
  );
}
