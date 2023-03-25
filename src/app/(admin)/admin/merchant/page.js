"use client";

import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { idrFormat } from "@/utils/idrFormat";
import { FaEdit } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import FileInput from "@/components/FileInput";
import { kosTextInputs, kosGeneralFacilities, kosRules } from "@/constants";
import CheckboxInput from "@/components/CheckboxInput";

export default function Merchant() {
  const {
    data: kos,
    isLoading: kosIsLoading,
    error: kosError,
  } = useFetch("/merchant-service/kos/my/own");

  const {
    data: rooms,
    isLoading: roomIsLoading,
    error: roomError,
  } = useFetch("/merchant-service/room/my/own");

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [kosForm, setKosForm] = useState({
    name: "",
    description: "",
    location: "",
    generalFacilities: [],
    rules: [],
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        setFilePreview(e.target.result);
      };

      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const handleKosEdit = (kos) => {
    // reset value generalFacilities dan rules,
    // supaya jika tombol edit di tekan lebih dari satu kali maka isian array tidak terpush lagi
    setKosForm((current) => ({
      ...current,
      generalFacilities: [],
      rules: [],
    }));
    //
    setKosForm((current) => ({
      ...current,
      name: kos.name,
      description: kos.description,
      location: kos.location,
      generalFacilities: [
        ...current.generalFacilities,
        ...kos.kosGeneralFacilities,
      ],
      rules: [...current.rules, ...kos.kosRules],
    }));
  };

  return (
    <div>
      <div className="flex gap-x-3">
        <div className="w-[55%] rounded-lg bg-white p-5">
          <h1 className="font-semibold text-xl mb-3">{kos?.kos.name}</h1>
          <div className="flex gap-x-3">
            <span className="font-semibold w-[10rem]">Tipe Kos</span>
            <span>{kos?.kos.kosType}</span>
          </div>
          <hr className="w-full my-3" />
          <div className="flex gap-x-3">
            <span className="font-semibold w-[10rem]">Deskripsi</span>
            <span>{kos?.kos.description}</span>
          </div>
          <hr className="w-full my-3" />
          <div className="flex gap-x-3">
            <span className="font-semibold w-[10rem]">Lokasi</span>
            <span>{kos?.kos.location}</span>
          </div>
          <hr className="w-full my-3" />
          <div className="flex gap-x-3">
            <span className="font-semibold w-[10rem]">Fasilitas Umum</span>
            <div>
              {kos?.kos.kosGeneralFacilities?.map((facility, i) => (
                <span key={i}>
                  {facility}
                  {i !== kos.kos.kosGeneralFacilities.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          <hr className="w-full my-3" />
          <div className="flex gap-x-3">
            <span className="font-semibold w-[10rem]">Peraturan Kos</span>
            <div>
              {kos?.kos.kosRules?.map((rule, i) => (
                <span key={i}>
                  {rule}
                  {i !== kos.kos.kosRules.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          <hr className="w-full my-3" />
          <div className="flex justify-end">
            <Modal>
              <Modal.Trigger>
                <FaEdit
                  onClick={() => handleKosEdit(kos.kos)}
                  size={25}
                  className="text-primary cursor-pointer"
                />
              </Modal.Trigger>
              <Modal.Content>
                <form className="grid grid-cols-2 gap-x-5">
                  <div>
                    {kosTextInputs.map((input, i) => (
                      <TextInput
                        key={i}
                        {...input}
                        value={kosForm[input.name]}
                        onChange={(e) =>
                          setKosForm((current) => ({
                            ...current,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    ))}
                    <FileInput
                      label={"Gambar Thumbnail Kos"}
                      onChange={handleFileChange}
                      fileName={fileName}
                    />
                    {filePreview && (
                      <Image
                        src={filePreview}
                        alt="kos preview"
                        width={800}
                        height={600}
                        className="mt-3"
                      />
                    )}
                  </div>
                  <div>
                    <div className="mb-5">
                      <label>Fasilitas Umum</label>
                      {kosGeneralFacilities.map((facility, i) => (
                        <CheckboxInput
                          key={i}
                          content={facility}
                          value={facility}
                          defaultChecked={kosForm.generalFacilities?.find(
                            (f) => f === facility
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              return setKosForm((current) => ({
                                ...current,
                                generalFacilities: [
                                  ...current.generalFacilities,
                                  e.target.value,
                                ],
                              }));
                            }
                            return setKosForm((current) => ({
                              ...current,
                              generalFacilities:
                                current.generalFacilities.filter(
                                  (f2) => f2 !== e.target.value
                                ),
                            }));
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <label>Peraturan Kos</label>
                      {kosRules.map((rule, i) => (
                        <CheckboxInput
                          key={i}
                          content={rule}
                          value={rule}
                          defaultChecked={kosForm.rules?.find(
                            (r) => r === rule
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              return setKosForm((current) => ({
                                ...current,
                                rules: [...current.rules, e.target.value],
                              }));
                            }
                            return setKosForm((current) => ({
                              ...current,
                              rules: current.rules.filter(
                                (r2) => r2 !== e.target.value
                              ),
                            }));
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </form>
              </Modal.Content>
            </Modal>
          </div>
        </div>
        <div className="w-[45%]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos?.kos.thumbnailImage}`}
            alt={kos?.kos.name || "kos"}
            width={800}
            height={600}
            className="w-full rounded-lg"
          />
          <div className="grid grid-cols-3 gap-x-3 mt-3">
            <div className="h-[5rem] w-full rounded-lg border-[3px] border-dashed flex justify-center items-center">
              <div className="text-info">
                <BsPlusLg size={30} className="mx-auto mb-2" />
                <p className="text-sm">Tambah Foto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {rooms?.rooms.map((room, i) => (
          <div
            key={i}
            className={`h-[10rem] rounded-lg bg-white p-5 border-l-4 ${
              room.isAvailable ? "border-primary" : "border-info"
            }`}
          >
            <h1 className="font-semibold">{room.name}</h1>
            <h2>{idrFormat(room.pricePerMonth)} /bulan</h2>
            <div className="mt-3 text-sm">
              {room.isAvailable ? (
                <span className="text-green-500">Tersedia</span>
              ) : (
                <span className="bg-info text-white py-1 px-2 rounded-lg">
                  Disewa
                </span>
              )}
            </div>
            <div className="mt-3 flex justify-end">
              <FaEdit size={25} className="text-primary" />
            </div>
          </div>
        ))}
        <div
          className={`h-[10rem] rounded-lg border-[3px] border-dashed flex justify-center items-center`}
        >
          <div className="text-info">
            <BsPlusLg size={40} className="mx-auto mb-3" />
            <p className="text-sm">Tambah Kamar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
