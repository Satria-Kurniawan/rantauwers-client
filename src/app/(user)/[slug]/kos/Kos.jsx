"use client";

import { useEffect, useMemo, useState } from "react";
// import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { idrFormat } from "@/utils/idrFormat";
import { kosDurations } from "@/constants";
import { MdArrowDropDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Modal from "@/components/Modal";
import TextInput from "@/components/Input/TextInput";
import Loading from "@/components/Loading";

export default function Kos({ kos, owner, rooms }) {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // });
  const { data: session } = useSession();
  const router = useRouter();
  const [kosDurationOptions, setKosDurationOptions] = useState([]);
  const [kosDuration, setKosDuration] = useState("Pilih Durasi");
  const [kosStartDate, setKosStartDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextRoom = () => {
    if (activeIndex === rooms.length - 1) return;
    setActiveIndex((current) => current + 1);
  };

  const handlePrevRoom = () => {
    if (activeIndex === 0) return;
    setActiveIndex((current) => current - 1);
  };

  useEffect(() => {
    setKosDurationOptions(
      rooms[activeIndex].pricePerDay === 0 &&
        kosDurations.filter((kds) => kds !== "Perhari" && kds !== "Perminggu")
    );
  }, [rooms, activeIndex]);

  const {
    data: orderData,
    isLoading: orderIsLoading,
    error: orderError,
    fetch: fetchOrder,
  } = useFetch();

  const handleOrder = (e) => {
    e.preventDefault();

    fetchOrder(
      `/order-service/order/${kos._id}/${rooms[activeIndex]._id}/insert`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
        data: {
          fromDate: kosStartDate,
          duration: kosDuration,
          message,
          amount,
        },
      }
    );
  };

  useEffect(() => {
    if (orderData) {
      router.push("/user/booking-history");
      setMessage("");
      setAmount("");
      setKosDuration("Pilih Durasi");
      setKosStartDate(null);
      setIsModalOpen(false);
    }
  }, [orderData, router]);

  if (!kos || !rooms) return <div>Failed to load data.</div>;

  return (
    <>
      <div className="flex h-[70vh] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos?.thumbnailImage}`}
          width={1280}
          height={720}
          alt="kos detail"
          className="w-[68vw] rounded-l-lg pr-2"
        />
        <div className="flex flex-col w-[32vw]">
          <Image
            src={
              kos?.moreImages[0]
                ? `${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos?.moreImages[0]}`
                : `${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos?.thumbnailImage}`
            }
            width={1280}
            height={720}
            alt="kos detail"
            className="h-1/2 rounded-tr-lg pb-1"
          />
          <Image
            src={
              kos?.moreImages[1]
                ? `${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos?.moreImages[1]}`
                : `${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos?.thumbnailImage}`
            }
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
            <h1 className="text-4xl font-semibold">{kos.name}</h1>
            <Button
              text={"Bagikan"}
              className="border border-primary text-primary"
            />
          </div>
          <div className="flex gap-x-3 items-center mt-3">
            <MdLocationPin size={25} />
            <span className="text-xl">{kos.location}</span>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between">
            <h6 className="text-primary">Online 1 Jam yang lalu</h6>
            <div className="inline-flex gap-x-3">
              <div>
                <h1 className="text-xl font-semibold">{owner.name}</h1>
                <h2 className="text-end text-info">Pemilik Kos</h2>
              </div>
              <FaUserCircle size={50} />
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Spesifikasi Tipe Kamar</h1>
            <div className="flex flex-col gap-y-2 mt-3">
              {rooms[activeIndex].roomSpecifications.map((specification, i) => (
                <h6 key={i}>{specification}</h6>
              ))}
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Fasilitas Kamar</h1>
            <div className="grid grid-cols-2 gap-y-3 mt-3">
              {rooms[activeIndex].roomFacilities.map((facility, i) => (
                <h6 key={i}>{facility}</h6>
              ))}
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Fasilitas Kamar Mandi</h1>
            <div className="grid grid-cols-2 gap-y-3 mt-3">
              {rooms[activeIndex].bathroomFacilities.map((facility, i) => (
                <h6 key={i}>{facility}</h6>
              ))}
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-xl font-semibold">Peraturan Khusus Kos ini</h1>
            <div className="flex flex-col gap-y-2 mt-3">
              {kos.kosRules.map((rule, i) => (
                <h6 key={i}>{rule}</h6>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[32vw]">
          <div className="bg-white dark:bg-dark2 dark:text-white rounded-lg shadow-lg p-5 sticky top-[8.5rem]">
            <div className="flex gap-x-3 justify-end">
              <button
                onClick={handlePrevRoom}
                className={`${
                  activeIndex === 0 && "opacity-30"
                } h-10 w-10 rounded-full p-1 border border-primary flex justify-center items-center`}
              >
                <HiArrowNarrowLeft color="#8F00FF" size={25} />
              </button>
              <button
                onClick={handleNextRoom}
                className={`${
                  activeIndex === rooms.length - 1 && "opacity-30"
                } h-10 w-10 rounded-full p-1 bg-primary flex justify-center items-center`}
              >
                <HiArrowNarrowRight color="white" size={25} />
              </button>
            </div>
            <div className="text-lg">
              {rooms[activeIndex].name}{" "}
              {rooms[activeIndex].isAvailable ? (
                <span className="text-sm text-success">(Tersedia)</span>
              ) : (
                <span className="text-sm text-danger">(Penuh)</span>
              )}
            </div>
            <div className="text-2xl font-semibold">
              <span>
                {idrFormat(
                  !kosDuration
                    ? rooms[activeIndex].pricePerMonth
                    : kosDuration === "Per 6 Bulan"
                    ? rooms[activeIndex].pricePerMonth * 6
                    : kosDuration === "Pertahun"
                    ? rooms[activeIndex].pricePerMonth * 12
                    : rooms[activeIndex].pricePerMonth
                )}
              </span>
              <span className="text-info text-sm">
                {"  "}/
                {kosDuration === "Pilih Durasi" ? "Perbulan" : kosDuration}
              </span>
            </div>
            <div className="flex gap-x-3 mt-5">
              <div className="w-1/2">
                <label htmlFor="date-input">Mulai Tanggal</label>
                <br />
                <input
                  id="date-input"
                  type="date"
                  className="border rounded-lg py-1.5 px-2 dark:bg-dark2"
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

                  <Dropdown.Content className="w-[10rem]">
                    <ul>
                      {kosDurationOptions.map((duration, i) => (
                        <li
                          key={i}
                          onClick={() => setKosDuration(duration)}
                          className="px-3 py-2 cursor-pointer rounded-md hover:bg-white hover:text-black"
                        >
                          <span>{duration}</span>
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
              <Button
                onClick={() => {
                  if (!kosDuration || !kosStartDate) return;
                  if (!session)
                    return router.push(
                      `/accounts/sign-in?callbackUrl=${encodeURIComponent(
                        window.location.href
                      )}`
                    );
                  setIsModalOpen(true);
                  setAmount(
                    !kosDuration
                      ? rooms[activeIndex].pricePerMonth
                      : kosDuration === "Per 6 Bulan"
                      ? rooms[activeIndex].pricePerMonth * 6
                      : kosDuration === "Pertahun"
                      ? rooms[activeIndex].pricePerMonth * 12
                      : rooms[activeIndex].pricePerMonth
                  );
                }}
                text={"Ajukan Sewa"}
                isPrimary={true}
                className={`w-full mt-2 ${
                  kosDuration !== "Pilih Durasi" && kosStartDate
                    ? "opacity-100"
                    : "opacity-30"
                }`}
              />
              <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <div className="max-h-[60vh] overflow-auto">
                  <div className="flex gap-x-5 mb-5">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${kos.thumbnailImage}`}
                      width={1280}
                      height={720}
                      alt="kos detail"
                      className="w-[10rem] rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold">{kos.name}</h2>
                      <h3>{kos.location}</h3>
                      <h2 className="font-semibold">
                        {rooms[activeIndex].name}
                      </h2>
                      <h1 className="text-lg font-semibold">
                        {idrFormat(
                          !kosDuration
                            ? rooms[activeIndex].pricePerMonth
                            : kosDuration === "Per 6 Bulan"
                            ? rooms[activeIndex].pricePerMonth * 6
                            : kosDuration === "Pertahun"
                            ? rooms[activeIndex].pricePerMonth * 12
                            : rooms[activeIndex].pricePerMonth
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <h2 className="font-semibold">Tanggal Mulai Sewa</h2>
                      <p>{kosStartDate}</p>
                    </div>
                    <div>
                      <h2 className="font-semibold">Durasi Sewa</h2>
                      <p>{kosDuration}</p>
                    </div>
                    <div>
                      <h2 className="font-semibold">Spesifikasi Kamar</h2>
                      {rooms[activeIndex].roomSpecifications.map(
                        (specification, i) => (
                          <li key={i} className="list-none">
                            {specification}
                          </li>
                        )
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">Fasilitas Kamar</h2>
                      {rooms[activeIndex].roomFacilities.map((facility, i) => (
                        <li key={i} className="list-none">
                          {facility}
                        </li>
                      ))}
                    </div>
                    <div>
                      <h2 className="font-semibold">Fasilitas Kamar Mandi</h2>
                      {rooms[activeIndex].bathroomFacilities.map(
                        (facility, i) => (
                          <li key={i} className="list-none">
                            {facility}
                          </li>
                        )
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">Fasilitas Umum</h2>
                      {kos.kosGeneralFacilities.map((facility, i) => (
                        <li key={i} className="list-none">
                          {facility}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleOrder}>
                  <TextInput
                    label={"Pesan kepada pemilik kos"}
                    placeholder="Pesan kepada pemilik kos"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  {orderIsLoading ? (
                    <div className="flex justify-center mt-5">
                      <Loading className="w-16 h-16" />
                    </div>
                  ) : (
                    <Button text={"Ajukan Sewa"} isPrimary className="w-full" />
                  )}
                </form>
              </Modal>
            </div>
          </div>
          {/* <div className="sticky top-[30em]">
            {!isLoaded ? (
              <div>Loading...</div>
            ) : (
              <div>
                <Map />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}

// function Map() {
//   const center = useMemo(() => ({ lat: 14, lng: -200 }), []);

//   return (
//     <GoogleMap zoom={10} center={center}>
//       <Marker position={center} />
//     </GoogleMap>
//   );
// }
