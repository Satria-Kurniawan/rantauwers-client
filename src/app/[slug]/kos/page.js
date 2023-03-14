"use client";

import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Button from "@/components/Button";

export default function KosDetail() {
  return (
    <main>
      <div className="flex h-[70vh] relative">
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
          <div className="bg-primary rounded-lg text-white py-1.5 px-4 absolute bottom-2 right-2">
            Putri
          </div>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="w-[68vw] pr-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold">Kos Songan</h1>
            <Button
              text={"Bagikan"}
              className="border border-primary text-primary"
            />
          </div>
          <div className="flex gap-x-3 items-center mt-3">
            <MdLocationPin size={25} />
            <span className="text-xl">Jalan Raya Gang Buntu Nomer 90</span>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between">
            <h6 className="text-primary">Online 1 Jam yang lalu</h6>
            <div className="inline-flex gap-x-3">
              <div>
                <h1 className="text-xl font-semibold">Made Susano`o</h1>
                <h2 className="text-end text-info">Pemilik Kos</h2>
              </div>
              <FaUserCircle size={50} />
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Spesifikasi Tipe Kamar</h1>
            <div className="flex flex-col gap-y-2 mt-3">
              <h6>3 x 3 meter</h6>
              <h6>Termasuk listrik</h6>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Fasilitas Kamar</h1>
            <div className="grid grid-cols-2 gap-y-3 mt-3">
              <h6>Wifi</h6>
              <h6>Kasur</h6>
              <h6>Lemari</h6>
              <h6>Kursi</h6>
              <h6>Cermin</h6>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Fasilitas Kamar Mandi</h1>
            <div className="grid grid-cols-2 gap-y-3 mt-3">
              <h6>Kamar Mandi Dalam</h6>
              <h6>Shower</h6>
              <h6>Bak Mandi</h6>
              <h6>Kloset Duduk</h6>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Peraturan Khusus Kos ini</h1>
            <div className="flex flex-col gap-y-2 mt-3">
              <h6>Kos ini khusus putri</h6>
              <h6>Maksimal 2 orang /kamar</h6>
              <h6>Tidak untuk pasutri</h6>
              <h6>Tidak boleh bawa anak</h6>
            </div>
          </div>
        </div>
        <div className="w-[32vw]">
          <div className="bg-white rounded-lg p-5 sticky top-[9.5rem]">
            <h1 className="text-2xl font-semibold">
              Rp. 900.000 <span className="text-info text-sm">/bulan</span>
            </h1>
            <div className="flex gap-x-3 mt-5">
              <div className="w-full">
                <label htmlFor="date-input">Mulai Tanggal</label>
                <br />
                <input
                  id="date-input"
                  type="date"
                  className="border rounded-lg py-1.5 px-4"
                />
              </div>
              <div className="w-full">
                <label>Durasi</label>
                <div className="border rounded-lg py-1.5 px-4">Perbulan</div>
              </div>
            </div>
            <div className="mt-5">
              <Button
                text={"Chat Pemilik"}
                className="w-full border border-primary text-primary"
              />
              <Button
                text={"Ajukan Sewa"}
                isPrimary={true}
                className="w-full mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
