"use client";

import { useState } from "react";
import Image from "next/image";
import { idrFormat } from "@/utils/idrFormat";
import { MdLocationPin, MdArrowDropDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Modal from "@/components/Modal";
import { kosDurations } from "@/constants";

export default function KosDetail() {
  const [kosDuration, setKosDuration] = useState("Pilih Durasi");
  const [kosStartDate, setKosStartDate] = useState(null);

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
            <div className="text-2xl font-semibold">
              <span>{idrFormat(900000)}</span>
              <span className="text-info text-sm"> /bulan</span>
            </div>
            <div className="flex gap-x-3 mt-5">
              <div className="w-1/2">
                <label htmlFor="date-input">Mulai Tanggal</label>
                <br />
                <input
                  id="date-input"
                  type="date"
                  className="border rounded-lg py-1.5 px-2"
                  onChange={(e) => setKosStartDate(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label>Durasi Sewa</label>
                <Dropdown>
                  <Dropdown.Trigger className="w-full border py-1.5 px-4 flex justify-between items-center">
                    <span>{kosDuration}</span>
                    <span>
                      <MdArrowDropDown size={25} />
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content className="w-[10rem] right-0">
                    <ul className="flex flex-col gap-y-1 py-2">
                      {kosDurations.map((duration, i) => (
                        <li
                          key={i}
                          onClick={() => setKosDuration(duration)}
                          className="cursor-pointer rounded-md hover:bg-primary hover:text-white"
                        >
                          <span className="py-1.5 px-3">{duration}</span>
                        </li>
                      ))}
                    </ul>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
            <div className="mt-5">
              <Button
                text={"Chat Pemilik"}
                className="w-full border border-primary text-primary"
              />
              <Modal>
                <Modal.Trigger>
                  <Button
                    text={"Ajukan Sewa"}
                    isPrimary={true}
                    className="w-full mt-2"
                  />
                </Modal.Trigger>
                <Modal.Content>
                  <div className="flex gap-x-5">
                    <Image
                      src={"/assets/koss/1.jpg"}
                      width={1280}
                      height={720}
                      alt="kos detail"
                      className="w-[10rem] rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold">Kos Songan</h2>
                      <h3>Jalan Raya Gang Buntu Nomer Togel</h3>
                      <h1 className="text-lg font-semibold">
                        {idrFormat(900000)}
                      </h1>
                    </div>
                  </div>
                </Modal.Content>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
