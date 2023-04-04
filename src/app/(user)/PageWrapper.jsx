"use client";

import { Parallax } from "@react-spring/parallax";
import Hero from "./Hero";
import Recomended from "./Recomended";
import Testimoni from "./Testimoni";

export default function PageWrapper({ koses }) {
  return (
    <Parallax id="parallax" pages={3} style={{ top: "0", left: "0" }}>
      <div className="container mx-auto md:px-10 px-5">
        <Hero />
        <Recomended koses={koses} />
        <Testimoni />
      </div>
    </Parallax>
  );
}
