"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useFetch from "@/hooks/useFetch";
import { kosGeneralFacilities, kosRules, kosTextInputs } from "@/constants";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import TextInput from "@/components/Input/TextInput";
import CheckboxInput from "@/components/Input/CheckboxInput";
import Button from "@/components/Button";
import FileInput from "@/components/Input/FileInput";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

export default function Kos({ kos }) {
  const { data: session } = useSession();
  const [kosData, setKosData] = useState(kos);
  const [isModalKosOpen, setIsModalKosOpen] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [isModalDeleteImageOpen, setIsModalDeleteImageOpen] = useState(false);
  const [isModalAddImageOpen, setIsModalAddImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
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

    fetchUpdateKos(`/merchant-service/kos/${kosData._id}/update`, {
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
      console.log(kosUpdateData);
      setKosData((current) => ({
        ...current,
        ...kosUpdateData.updatedKos,
      }));
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
      `/merchant-service/kos/${kosData._id}/image/${selectedImage}/delete`,
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
        moreImages: current.moreImages.filter(
          (image) => image !== kosImageDeleteData.image
        ),
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

    fetchAddKosImage(`/merchant-service/kos/${kosData._id}/image/insert`, {
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
        moreImages: kosImagesAddData.images,
      }));
      setFiles([]);
      setFilesPreview([]);
      setIsModalAddImageOpen(false);
    }
  }, [kosImagesAddData, setKosData]);

  return (
    <>
      <main>
        <div className="flex gap-x-3">
          <div className="w-[50%]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kosData.thumbnailImage}`}
              alt={kosData.name || "kos"}
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
            <div className="grid grid-cols-3 gap-3 mt-3">
              {kosData.moreImages.map((image, i) => (
                <div key={i} className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${image}`}
                    alt={image || "kos"}
                    width={800}
                    height={600}
                    className="h-[7rem] w-full rounded-lg shadow-lg"
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
                className="h-[7rem] w-full rounded-lg border-[3px] border-dashed flex justify-center items-center cursor-pointer"
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
                    <Button text={"Submit"} isPrimary className="w-full mt-5" />
                  )}
                </form>
              </Modal>
            </div>
          </div>
          <div
            className={`w-[50%] rounded-lg bg-white shadow-lg dark:bg-dark2 p-5`}
          >
            <div className="font-semibold text-xl mb-5 w-full text-primary">
              <h1>{kosData.name}</h1>
            </div>
            <div className="flex gap-x-3 my-3">
              <span className="font-semibold w-[30%]">Tipe Kos</span>
              <span className="w-[70%]">{kosData.kosType}</span>
            </div>
            <div className="flex gap-x-3 my-3">
              <span className="font-semibold w-[30%]">Deskripsi</span>
              <span className="w-[70%]">{kosData.description}</span>
            </div>
            <div className="flex gap-x-3 my-3">
              <span className="font-semibold w-[30%]">Lokasi</span>
              <span className="w-[70%]">{kosData.location}</span>
            </div>
            <div className="flex gap-x-3 my-3">
              <span className="font-semibold w-[30%]">Fasilitas Umum</span>
              <div className="w-[70%]">
                {kosData.kosGeneralFacilities?.map((facility, i) => (
                  <span key={i}>
                    {facility}
                    {i !== kosData.kosGeneralFacilities.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-x-3 my-3">
              <span className="font-semibold w-[30%]">Peraturan Kos</span>
              <div className="w-[70%]">
                {kosData.kosRules?.map((rule, i) => (
                  <span key={i}>
                    {rule}
                    {i !== kosData.kosRules.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <FaEdit
                onClick={() => handleKosEdit(kosData)}
                size={25}
                className="text-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </main>

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
    </>
  );
}
