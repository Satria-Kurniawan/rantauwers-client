"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useFetch from "@/hooks/useFetch";
import { idrFormat } from "@/utils/idrFormat";
import Button from "@/components/Button";
import CheckboxInput from "@/components/Input/CheckboxInput";
import TextInput from "@/components/Input/TextInput";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { BsPlusLg } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import {
  bathroomFacilities,
  roomFacilities,
  roomSpecifications,
  roomTextInputs,
} from "@/constants";

export default function Rooms({ rooms }) {
  const { data: session } = useSession();
  const [roomsData, setRoomsData] = useState(rooms);
  const [isModalRoomOpen, setIsModalRoomOpen] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [isModalDeleteRoomOpen, setIsModalDeleteRoomOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
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
    data: roomInsertData,
    isLoading: roomInsertIsLoading,
    error: roomInsertError,
    fetch: fetchInsertRoom,
  } = useFetch();

  const handleRoomInsert = (e) => {
    e.preventDefault();

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
      setRoomsData((current) => [...current, roomInsertData.room]);
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
      setRoomsData((current) =>
        current.map((room) =>
          room._id === roomUpdateData.updatedroom._id
            ? { ...room, ...roomUpdateData.updatedroom }
            : room
        )
      );
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
      setRoomsData((current) =>
        current.filter((room) => room._id !== selectedRoom._id)
      );
      setIsModalDeleteRoomOpen(false);
    }
    setRoomDeleteData(null);
  }, [roomDeleteData, setRoomsData, setRoomDeleteData, selectedRoom]);

  return (
    <>
      <main>
        <div className="grid grid-cols-4 gap-3 mb-5">
          {roomsData.map((room, i) => (
            <div
              key={i}
              className={`h-[10rem] rounded-lg bg-white shadow-lg dark:bg-dark2 p-5 border-l-4 ${
                room.isAvailable ? "border-primary" : "border-info"
              } relative`}
            >
              <h1 className="font-semibold">{room.name}</h1>
              <h2>{idrFormat(room.pricePerMonth)} /bulan</h2>
              <div className="mt-3 text-sm">
                {room.isAvailable ? (
                  <span className="text-success">Tersedia</span>
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
      </main>

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
    </>
  );
}
