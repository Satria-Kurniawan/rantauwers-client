"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { idrFormat } from "@/utils/idrFormat";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Modal from "@/components/Modal";
import TextInput from "@/components/Input/TextInput";
import FileInput from "@/components/Input/FileInput";
import CheckboxInput from "@/components/Input/CheckboxInput";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import {
  kosTextInputs,
  kosGeneralFacilities,
  kosRules,
  roomTextInputs,
  roomSpecifications,
  roomFacilities,
  bathroomFacilities,
} from "@/constants";

export default function Merchant() {
  const { data: session } = useSession();
  const [isModalKosOpen, setIsModalKosOpen] = useState(false);
  const [isModalRoomOpen, setIsModalRoomOpen] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [isModalDeleteImageOpen, setIsModalDeleteImageOpen] = useState(false);
  const [isModalDeleteRoomOpen, setIsModalDeleteRoomOpen] = useState(false);
  const [isModalAddImageOpen, setIsModalAddImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [filesPreview, setFilesPreview] = useState([]);
  const [kosForm, setKosForm] = useState({
    name: "",
    description: "",
    location: "",
    kosType: "",
    kosGeneralFacilities: [],
    kosRules: [],
  });
  const [roomForm, setRoomForm] = useState({
    id: "",
    name: "",
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    roomSpecifications: [],
    roomFacilities: [],
    bathroomFacilities: [],
  });

  const {
    data: kosData,
    isLoading: kosIsLoading,
    error: kosError,
    fetch: fetchKosData,
    setData: setKosData,
  } = useFetch();

  useEffect(() => {
    if (session) {
      fetchKosData("/merchant-service/kos/my/own", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
      });
    }
  }, [session, fetchKosData]);

  const {
    data: roomsData,
    isLoading: roomsIsLoading,
    error: roomsError,
    fetch: fetchRoomsData,
    setData: setRoomsData,
  } = useFetch();

  useEffect(() => {
    if (session) {
      fetchRoomsData("/merchant-service/room/my/own", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
      });
    }
  }, [session, fetchRoomsData]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleFilesChange = (e) => {
    if (e.target.files.length > 0) {
      setFiles(e.target.files);
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

  useEffect(() => {
    if (files) {
      const filesArray = Array.from(files);
      const filesPreviewArray = [];

      filesArray.forEach((file) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          filesPreviewArray.push(fileReader.result);
          setFilesPreview([...filesPreviewArray]);
        };

        fileReader.readAsDataURL(file);
      });
    }
  }, [files]);

  const handleKosEdit = (kos) => {
    setIsForUpdate(true);
    setIsModalKosOpen(true);
    // reset value generalFacilities dan rules,
    // supaya jika tombol edit di tekan lebih dari satu kali maka isian array tidak terpush lagi
    setKosForm((current) => ({
      ...current,
      kosGeneralFacilities: [],
      kosRules: [],
    }));
    //
    setKosForm((current) => ({
      ...current,
      name: kos.name,
      kosType: kos.kosType,
      description: kos.description,
      location: kos.location,
      kosGeneralFacilities: [
        ...(current.kosGeneralFacilities || []),
        ...(kos.kosGeneralFacilities || []),
      ],
      kosRules: [...(current.kosRules || []), ...(kos.kosRules || [])],
    }));
    setFileName(kos.thumbnailImage);
  };

  const {
    data: kosUpdateData,
    isLoading: kosUpdateIsloading,
    error: kosUpdateError,
    fetch: fetchUpdateKos,
  } = useFetch();

  const handleKosUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", kosForm.name);
    formData.append("kosType", kosForm.kosType);
    formData.append("description", kosForm.description);
    formData.append("location", kosForm.location);
    for (let i = 0; i < kosForm.kosGeneralFacilities.length; i++) {
      formData.append(
        `kosGeneralFacilities[]`,
        kosForm.kosGeneralFacilities[i]
      );
    }
    for (let i = 0; i < kosForm.kosRules.length; i++) {
      formData.append(`kosRules[]`, kosForm.kosRules[i]);
    }
    formData.append("thumbnailImage", file);

    fetchUpdateKos(`/merchant-service/kos/${kosData.kos._id}/update`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + session.accessToken,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  };

  useEffect(() => {
    if (kosUpdateData) {
      setKosData((current) => ({ ...current, kos: kosUpdateData.updatedKos }));
      setIsModalKosOpen(false);
    }
  }, [kosUpdateData, setKosData]);

  const {
    data: kosInsertData,
    isLoading: kosInsertLoading,
    error: kosInsertError,
    fetch: fetchInsertKos,
  } = useFetch();

  const handleKosInsert = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", kosForm.name);
    formData.append("description", kosForm.description);
    formData.append("kosType", kosForm.kosType);
    formData.append("location", kosForm.location);
    for (let i = 0; i < kosForm.kosGeneralFacilities.length; i++) {
      formData.append(
        `kosGeneralFacilities[${i}]`,
        kosForm.kosGeneralFacilities[i]
      );
    }
    for (let i = 0; i < kosForm.kosRules.length; i++) {
      formData.append(`kosRules[${i}]`, kosForm.kosRules[i]);
    }
    formData.append("thumbnailImage", file);

    fetchInsertKos("/merchant-service/kos/insert", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
      data: formData,
    });
  };

  useEffect(() => {
    if (kosInsertData) {
      setKosData(kosInsertData);
      setIsModalKosOpen(false);
    }
  }, [kosInsertData, setKosData]);

  const {
    data: kosImageDeleteData,
    isLoading: kosImageDeleteLoading,
    error: kosImageDeleteError,
    fetch: fetchDeleteKosImage,
  } = useFetch();

  const handleDeleteKosImage = () => {
    fetchDeleteKosImage(
      `/merchant-service/kos/${kosData.kos._id}/image/${selectedImage}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
      }
    );
  };

  useEffect(() => {
    if (kosImageDeleteData) {
      setKosData((current) => ({
        ...current,
        kos: {
          ...current.kos,
          moreImages: current.kos.moreImages.filter(
            (image) => image !== kosImageDeleteData.image
          ),
        },
      }));
      setIsModalDeleteImageOpen(false);
    }
  }, [kosImageDeleteData, setKosData]);

  const {
    data: kosImagesAddData,
    isLoading: kosImagesAddIsLoading,
    error: kosImagesAddError,
    fetch: fetchAddKosImage,
  } = useFetch();

  const handleAddImages = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("moreImages", files[i]);
    }

    fetchAddKosImage(`/merchant-service/kos/${kosData.kos._id}/image/insert`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
      data: formData,
    });
  };

  useEffect(() => {
    if (kosImagesAddData) {
      setKosData((current) => ({
        ...current,
        kos: {
          ...current.kos,
          moreImages: kosImagesAddData.images,
        },
      }));
      setFiles([]);
      setFilesPreview([]);
      setIsModalAddImageOpen(false);
    }
  }, [kosImagesAddData, setKosData]);

  const {
    data: roomInsertData,
    isLoading: roomInsertIsLoading,
    error: roomInsertError,
    fetch: fetchInsertRoom,
  } = useFetch();

  const handleRoomInsert = (e) => {
    e.preventDefault();

    // const formData = new FormData();

    // formData.append("name", roomForm.name);
    // formData.append("pricePerDay", roomForm.pricePerDay);
    // formData.append("pricePerWeek", roomForm.pricePerWeek);
    // formData.append("pricePerMonth", roomForm.pricePerMonth);
    // for (let i = 0; i < roomForm.roomSpecifications.length; i++) {
    //   formData.append(
    //     `roomSpecifications[${i}]`,
    //     roomForm.roomSpecifications[i]
    //   );
    // }
    // for (let i = 0; i < roomForm.roomFacilities.length; i++) {
    //   formData.append(`roomFacilities[${i}]`, roomForm.roomFacilities[i]);
    // }
    // for (let i = 0; i < roomForm.bathroomFacilities.length; i++) {
    //   formData.append(
    //     `bathroomFacilities[${i}]`,
    //     roomForm.bathroomFacilities[i]
    //   );
    // }

    fetchInsertRoom("/merchant-service/room/insert", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
      data: roomForm,
    });
  };

  useEffect(() => {
    if (roomInsertData) {
      setRoomsData((current) => ({
        ...current,
        rooms: [...current.rooms, roomInsertData.room],
      }));
      setRoomForm((current) => ({
        ...current,
        name: "",
        pricePerDay: 0,
        pricePerWeek: 0,
        pricePerMonth: 0,
        roomSpecifications: [],
        roomFacilities: [],
        bathroomFacilities: [],
      }));
      setIsModalRoomOpen(false);
    }
  }, [roomInsertData, setRoomsData]);

  const handleRoomEdit = (room) => {
    setIsModalRoomOpen(true);
    setIsForUpdate(true);
    // reset value roomSpecifications, roomFacilities dan bathroomFacilities,
    // supaya jika tombol edit di tekan lebih dari satu kali maka isian array tidak terpush lagi
    setRoomForm((current) => ({
      ...current,
      roomSpecifications: [],
      roomFacilities: [],
      bathroomFacilities: [],
    }));
    //
    setRoomForm((current) => ({
      ...current,
      id: room._id,
      name: room.name,
      pricePerDay: room.pricePerDay || 0,
      pricePerWeek: room.pricePerWeek || 0,
      pricePerMonth: room.pricePerMonth || 0,
      roomSpecifications: [
        ...(current.roomSpecifications || []),
        ...(room.roomSpecifications || []),
      ],
      roomFacilities: [
        ...(current.roomFacilities || []),
        ...(room.roomFacilities || []),
      ],
      bathroomFacilities: [
        ...(current.bathroomFacilities || []),
        ...(room.bathroomFacilities || []),
      ],
    }));
  };

  const {
    data: roomUpdateData,
    isLoading: roomUpdateLoading,
    error: roomUpdateError,
    fetch: fetchUpdateRoom,
  } = useFetch();

  const handleRoomUpdate = (e) => {
    e.preventDefault();

    fetchUpdateRoom(`/merchant-service/room/${roomForm.id}/update`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
      data: roomForm,
    });
  };

  useEffect(() => {
    if (roomUpdateData) {
      setRoomsData((current) => ({
        ...current,
        rooms: current.rooms.map((room) =>
          room._id === roomUpdateData.updatedroom._id
            ? { ...room, ...roomUpdateData.updatedroom }
            : room
        ),
      }));
      setIsModalRoomOpen(false);
    }
  }, [roomUpdateData, setRoomsData]);

  const {
    data: roomDeleteData,
    isLoading: roomDeleteLoading,
    error: roomDeleteError,
    fetch: fetchDeleteRoom,
    setData: setRoomDeleteData,
  } = useFetch();

  const handleRoomDelete = () => {
    fetchDeleteRoom(`/merchant-service/room/${selectedRoom._id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    });
  };

  useEffect(() => {
    if (roomDeleteData) {
      setRoomsData((current) => ({
        ...current,
        rooms:
          current.rooms?.filter((room) => room._id !== selectedRoom._id) ||
          current.rooms,
      }));
      setIsModalDeleteRoomOpen(false);
    }
    setRoomDeleteData(null);
  }, [roomDeleteData, setRoomsData, setRoomDeleteData, selectedRoom]);

  return (
    <>
      {!kosData ? (
        <main className="h-[85vh] flex justify-center items-center">
          <section>
            <div className="w-[20rem] mb-3">
              <h1 className="font-semibold text-lg">
                Anda belum membuat data Kos
              </h1>
              <h2>silahkan buat menggunakan tombol dibawah :)</h2>
            </div>
            <Button
              onClick={() => {
                setIsForUpdate(false);
                setIsModalKosOpen(true);
              }}
              text={"Buat Data Kos"}
              isPrimary
            />
          </section>
        </main>
      ) : (
        <main>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {roomsData?.rooms.map((room, i) => (
              <div
                key={i}
                className={`h-[10rem] rounded-lg bg-white dark:bg-dark2 p-5 border-l-4 ${
                  room.isAvailable ? "border-primary" : "border-info"
                } relative`}
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
                  <FaEdit
                    onClick={() => handleRoomEdit(room)}
                    size={25}
                    className="text-primary cursor-pointer"
                  />
                </div>
                <RiDeleteBack2Fill
                  onClick={() => {
                    setSelectedRoom(room);
                    setIsModalDeleteRoomOpen(true);
                  }}
                  size={30}
                  className="absolute -top-1.5 -right-1.5 cursor-pointer text-danger"
                />
              </div>
            ))}

            {/* Modal Delete Room */}
            <Modal
              isOpen={isModalDeleteRoomOpen}
              setIsOpen={setIsModalDeleteRoomOpen}
            >
              Hapus kamar {selectedRoom?.name}?
              {roomDeleteLoading ? (
                <div className="flex justify-center mt-5">
                  <Loading className="w-16 h-16" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-3 mt-5">
                  <Button
                    onClick={() => {
                      setSelectedRoom(null);
                      setIsModalDeleteRoomOpen(false);
                    }}
                    text={"Batal"}
                    className="bg-info text-white"
                  />
                  <Button
                    onClick={handleRoomDelete}
                    text={"Hapus"}
                    className="bg-danger text-white"
                  />
                </div>
              )}
            </Modal>
            {/* End Modal Delete Room */}

            <div
              onClick={() => {
                setIsModalRoomOpen(true);
                setIsForUpdate(false);
                setRoomForm((current) => ({
                  ...current,
                  name: "",
                  pricePerDay: 0,
                  pricePerWeek: 0,
                  pricePerMonth: 0,
                  roomSpecifications: [],
                  roomFacilities: [],
                  bathroomFacilities: [],
                }));
              }}
              className={`h-[10rem] rounded-lg border-[3px] border-dashed flex justify-center items-center cursor-pointer`}
            >
              <div className="text-info">
                <BsPlusLg size={40} className="mx-auto mb-3" />
                <p className="text-sm">Tambah Kamar</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div
              className={`w-[25%] rounded-lg bg-white dark:bg-dark2 p-5 flex justify-center items-center`}
            >
              <div>
                <FaUserCircle size={50} className="mx-auto" />
                <div className="text-center mt-3">
                  <h1 className="font-semibold text-xl">
                    {session?.user.name}
                  </h1>
                  <h2>{session?.user.email}</h2>
                </div>
              </div>
            </div>
            <div className={`w-[40%] rounded-lg bg-white dark:bg-dark2 p-5`}>
              <h1 className="font-semibold text-xl mb-3">
                {kosData?.kos.name}
              </h1>
              <div className="flex gap-x-3">
                <span className="font-semibold w-[30%]">Tipe Kos</span>
                <span className="w-[70%]">{kosData?.kos.kosType}</span>
              </div>
              <hr className="w-full my-3" />
              <div className="flex gap-x-3">
                <span className="font-semibold w-[30%]">Deskripsi</span>
                <span className="w-[70%]">{kosData?.kos.description}</span>
              </div>
              <hr className="w-full my-3" />
              <div className="flex gap-x-3">
                <span className="font-semibold w-[30%]">Lokasi</span>
                <span className="w-[70%]">{kosData?.kos.location}</span>
              </div>
              <hr className="w-full my-3" />
              <div className="flex gap-x-3">
                <span className="font-semibold w-[30%]">Fasilitas Umum</span>
                <div className="w-[70%]">
                  {kosData?.kos.kosGeneralFacilities?.map((facility, i) => (
                    <span key={i}>
                      {facility}
                      {i !== kosData.kos.kosGeneralFacilities.length - 1 &&
                        ", "}
                    </span>
                  ))}
                </div>
              </div>
              <hr className="w-full my-3" />
              <div className="flex gap-x-3">
                <span className="font-semibold w-[30%]">Peraturan Kos</span>
                <div className="w-[70%]">
                  {kosData?.kos.kosRules?.map((rule, i) => (
                    <span key={i}>
                      {rule}
                      {i !== kosData.kos.kosRules.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
              <hr className="w-full my-3" />
              <div className="flex justify-end">
                <FaEdit
                  onClick={() => handleKosEdit(kosData.kos)}
                  size={25}
                  className="text-primary cursor-pointer"
                />
              </div>
            </div>
            <div className="w-[35%]">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kosData?.kos.thumbnailImage}`}
                alt={kosData?.kos.name || "kos"}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
              <div className="grid grid-cols-3 gap-3 mt-3">
                {kosData?.kos.moreImages.map((image, i) => (
                  <div key={i} className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${image}`}
                      alt={image || "kos"}
                      width={800}
                      height={600}
                      className="h-[5rem] w-full rounded-lg"
                    />

                    <div className="bg-white w-[20px] h-[20px] rounded-full absolute top-0 right-0" />
                    <RiDeleteBack2Fill
                      onClick={() => {
                        setSelectedImage(image);
                        setIsModalDeleteImageOpen(true);
                      }}
                      size={30}
                      className="absolute -top-1.5 -right-1.5 cursor-pointer text-danger"
                    />
                  </div>
                ))}
                <Modal
                  isOpen={isModalDeleteImageOpen}
                  setIsOpen={setIsModalDeleteImageOpen}
                >
                  Hapus gambar {selectedImage}?
                  {kosImageDeleteLoading ? (
                    <div className="flex justify-center mt-5">
                      <Loading className="w-16 h-16" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-3 mt-5">
                      <Button
                        onClick={() => {
                          setSelectedImage("");
                          setIsModalDeleteImageOpen(false);
                        }}
                        text={"Batal"}
                        className="bg-info text-white"
                      />
                      <Button
                        onClick={handleDeleteKosImage}
                        text={"Hapus"}
                        className="bg-danger text-white"
                      />
                    </div>
                  )}
                </Modal>
                <div
                  onClick={() => {
                    setIsModalAddImageOpen(true);
                  }}
                  className="h-[5rem] w-full rounded-lg border-[3px] border-dashed flex justify-center items-center cursor-pointer"
                >
                  <div className="text-info">
                    <BsPlusLg size={30} className="mx-auto mb-2" />
                    <p className="text-sm">Tambah Foto</p>
                  </div>
                </div>
                <Modal
                  isOpen={isModalAddImageOpen}
                  setIsOpen={setIsModalAddImageOpen}
                >
                  <form onSubmit={handleAddImages}>
                    <FileInput
                      label={"Tambah Gambar Kosan (bisa pilih lebih dari satu)"}
                      onChange={handleFilesChange}
                      fileName={`${files?.length} files dipilih`}
                      multiple
                    />
                    <div
                      className={`grid ${`grid-cols-${filesPreview.length}`} gap-3`}
                    >
                      {filesPreview &&
                        filesPreview.map((preview, i) => (
                          <Image
                            key={i}
                            src={preview}
                            alt="kos preview"
                            width={800}
                            height={600}
                            className="mt-3"
                          />
                        ))}
                    </div>
                    {kosImagesAddIsLoading ? (
                      <div className="flex justify-center mt-5">
                        <Loading className="w-16 h-16" />
                      </div>
                    ) : (
                      <Button
                        text={"Submit"}
                        isPrimary
                        className="w-full mt-5"
                      />
                    )}
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </main>
      )}
      {/* Modal Kos */}
      <Modal isOpen={isModalKosOpen} setIsOpen={setIsModalKosOpen}>
        <form onSubmit={isForUpdate ? handleKosUpdate : handleKosInsert}>
          <div className="grid grid-cols-2 gap-x-5 mb-5">
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
            </div>
            <div>
              <div className="mb-5">
                <label>Fasilitas Umum</label>
                {kosGeneralFacilities.map((facility, i) => (
                  <CheckboxInput
                    key={i}
                    content={facility}
                    value={facility}
                    defaultChecked={kosForm.kosGeneralFacilities?.find(
                      (f) => f.toLowerCase() === facility.toLowerCase()
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        return setKosForm((current) => ({
                          ...current,
                          kosGeneralFacilities: [
                            ...current.kosGeneralFacilities,
                            e.target.value,
                          ],
                        }));
                      }
                      return setKosForm((current) => ({
                        ...current,
                        kosGeneralFacilities:
                          current.kosGeneralFacilities.filter(
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
                    defaultChecked={kosForm.kosRules?.find(
                      (r) => r.toLowerCase() === rule.toLowerCase()
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        return setKosForm((current) => ({
                          ...current,
                          kosRules: [...current.kosRules, e.target.value],
                        }));
                      }
                      return setKosForm((current) => ({
                        ...current,
                        kosRules: current.kosRules.filter(
                          (r2) => r2 !== e.target.value
                        ),
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
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
          {kosInsertLoading || kosUpdateIsloading ? (
            <div className="flex justify-center mt-5">
              <Loading className="w-16 h-16" />
            </div>
          ) : (
            <Button
              text={isForUpdate ? "Update" : "Submit"}
              isPrimary={true}
              className="w-full mt-5"
            />
          )}
        </form>
      </Modal>
      {/* End Modal Kos */}

      {/* Modal Room */}
      <Modal isOpen={isModalRoomOpen} setIsOpen={setIsModalRoomOpen}>
        <form onSubmit={isForUpdate ? handleRoomUpdate : handleRoomInsert}>
          <div className="grid grid-cols-2 gap-x-5 mb-5">
            <div>
              {roomTextInputs.map((input, i) => (
                <TextInput
                  key={i}
                  {...input}
                  value={roomForm[input.name]}
                  onChange={(e) =>
                    setRoomForm((current) => ({
                      ...current,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              ))}
              <div className="mb-5">
                <label>Spesifikasi Kamar</label>
                {roomSpecifications.map((specification, i) => (
                  <CheckboxInput
                    key={i}
                    content={specification}
                    value={specification}
                    defaultChecked={roomForm.roomSpecifications?.find(
                      (s) => s.toLowerCase() === specification.toLowerCase()
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        return setRoomForm((current) => ({
                          ...current,
                          roomSpecifications: [
                            ...current.roomSpecifications,
                            e.target.value,
                          ],
                        }));
                      }
                      return setRoomForm((current) => ({
                        ...current,
                        roomSpecifications: current.roomSpecifications.filter(
                          (s2) => s2 !== e.target.value
                        ),
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-5">
                <label>Fasilitas Kamar</label>
                {roomFacilities.map((facility, i) => (
                  <CheckboxInput
                    key={i}
                    content={facility}
                    value={facility}
                    defaultChecked={roomForm.roomFacilities?.find(
                      (f) => f.toLowerCase() === facility.toLowerCase()
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        return setRoomForm((current) => ({
                          ...current,
                          roomFacilities: [
                            ...current.roomFacilities,
                            e.target.value,
                          ],
                        }));
                      }
                      return setRoomForm((current) => ({
                        ...current,
                        roomFacilities: current.roomFacilities.filter(
                          (f2) => f2 !== e.target.value
                        ),
                      }));
                    }}
                  />
                ))}
              </div>
              <div className="mb-5">
                <label>Fasilitas Kamar Mandi</label>
                {bathroomFacilities.map((facility, i) => (
                  <CheckboxInput
                    key={i}
                    content={facility}
                    value={facility}
                    defaultChecked={roomForm.bathroomFacilities?.find(
                      (f) => f.toLowerCase() === facility.toLowerCase()
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        return setRoomForm((current) => ({
                          ...current,
                          bathroomFacilities: [
                            ...current.bathroomFacilities,
                            e.target.value,
                          ],
                        }));
                      }
                      return setRoomForm((current) => ({
                        ...current,
                        bathroomFacilities: current.bathroomFacilities.filter(
                          (f2) => f2 !== e.target.value
                        ),
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          {roomUpdateLoading || roomInsertIsLoading ? (
            <div className="flex justify-center mt-5">
              <Loading className="w-16 h-16" />
            </div>
          ) : (
            <Button
              text={isForUpdate ? "Update" : "Submit"}
              isPrimary
              className="w-full"
            />
          )}
        </form>
      </Modal>
      {/* End modal Room */}
    </>
  );
}
