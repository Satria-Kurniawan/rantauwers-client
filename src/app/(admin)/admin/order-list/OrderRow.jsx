"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { dateFormat } from "@/utils/dateFormat";
import { idrFormat } from "@/utils/idrFormat";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import CheckboxInput from "@/components/Input/CheckboxInput";
import Loading from "@/components/Loading";

export default function OrderRow({ order, index, session, query }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error, fetch, setData } = useFetch();

  useEffect(() => {
    fetch(`/order-service/order/${order._id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    });
  }, [session.accessToken, fetch, order._id]);

  const handleEditOrderStatus = ({ order, user, room }) => {
    setSelectedOrder({ order, user, room });
    setIsModalOpen(true);
  };

  const {
    data: updateOrderStatusData,
    isLoading: updateOrderStatusIsLoading,
    error: updateOrderStatusError,
    fetch: fetchUpdateOrderStatus,
  } = useFetch();

  const handleUpdateOrderStatus = (value) => {
    fetchUpdateOrderStatus(
      `/order-service/order/${selectedOrder.order._id}/verify`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
        data: {
          status: value,
        },
      }
    );
  };

  useEffect(() => {
    if (updateOrderStatusData) {
      setData((current) => ({
        ...current,
        order: { ...order, status: updateOrderStatusData.order.status },
      }));
      setSelectedOrder(null);
      setIsModalOpen(false);
    }
  }, [updateOrderStatusData, order, setData]);

  if (isLoading)
    return (
      <tr>
        <td className="py-2 px-5">Loading...</td>
      </tr>
    );

  if (query) {
    if (
      !data?.user.name.toLowerCase().includes(query.toLowerCase()) &&
      !data?.user.email.toLowerCase().includes(query.toLowerCase()) &&
      !data?.order.amount.toString().includes(query.toLowerCase()) &&
      !dateFormat(data?.order.fromDate)
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      !data?.order.duration.toLowerCase().includes(query.toLowerCase()) &&
      !data?.room.name.toLowerCase().includes(query.toLowerCase())
    ) {
      return null;
    }
  }

  return (
    <tr
      className={`${
        index % 2 === 0 && "bg-[#F5F5F5] dark:bg-dark dark:text-white"
      }`}
    >
      <td className="py-2 pl-5">
        <CheckboxInput
          checked={data?.order.status !== "WAITING"}
          readOnly
          onClick={(e) => e.preventDefault()}
        />
      </td>
      <td className="py-2 px-3">
        <div className="inline-flex gap-x-2 items-center">
          {data?.user.avatar ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${data.user.avatar}`}
              alt={data.user.avatar}
              height={200}
              width={200}
            />
          ) : (
            <FaUserCircle size={25} />
          )}
          <div>
            <p>{data?.user.name}</p>
            <p className="text-info">{data?.user.email}</p>
          </div>
        </div>
      </td>
      <td className={`py-2 px-3 `}>
        <span
          className={`${
            data?.order.status === "WAITING"
              ? "bg-yellow-100 text-yellow-500"
              : data?.order.status === "ACCEPTED"
              ? "bg-purple-100 text-primary"
              : data?.order.status === "REJECTED"
              ? "bg-red-100 text-red-500"
              : data?.order.status === "UNPAID"
              ? "bg-blue-100 text-blue-500"
              : data?.order.status === "PAID"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          } py-0.5 px-2 text-xs rounded-lg`}
        >
          {data?.order.status === "WAITING"
            ? "Menunggu Persetujuan"
            : data?.order.status === "ACCEPTED"
            ? "Disetujui"
            : data?.order.status === "REJECTED"
            ? "Ditolak"
            : data?.order.status === "UNPAID"
            ? "Menunggu Pembayaran"
            : data?.order.status === "PAID"
            ? "Pembayaran Berhasil"
            : "Pembayaran Gagal"}
        </span>
      </td>
      <td className="py-2 px-3">{data?.room?.name}</td>
      <td className="py-2 px-3">{data && dateFormat(data.order.fromDate)}</td>
      <td className="py-2 px-3">{data?.order.duration}</td>
      <td className="py-2 px-3">{data && idrFormat(data.order.amount)}</td>
      <td className="py-2 px-3">{data && dateFormat(data.order.createdAt)}</td>
      <td className="py-2 pr-5">
        <FaEdit
          onClick={() =>
            handleEditOrderStatus({
              order: data.order,
              user: data.user,
              room: data.room,
            })
          }
          size={20}
          className="text-primary cursor-pointer"
        />
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <div className="inline-flex gap-x-2 items-center">
            {selectedOrder?.user.avatar ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_GATEWAY}/images/${selectedOrder?.user.avatar}`}
                alt={selectedOrder?.user.avatar}
                height={200}
                width={200}
              />
            ) : (
              <FaUserCircle size={40} />
            )}
            <div>
              <p>{selectedOrder?.user.name}</p>
              <p className="text-info">{selectedOrder?.user.email}</p>
            </div>
          </div>
          <h1 className="font-semibold mt-3">{selectedOrder?.room.name}</h1>
          <p>{dateFormat(selectedOrder?.order.fromDate)}</p>
          <h1 className="font-semibold">
            {idrFormat(selectedOrder?.order.amount)}
          </h1>
          <div className="flex gap-x-3 mt-5">
            {updateOrderStatusIsLoading ? (
              <div className="mx-auto">
                <Loading className="w-16 h-16" />
              </div>
            ) : selectedOrder?.order.status !== "WAITING" ? (
              <p className="text-primary">
                Status pengajuan sewa telah diverifikasi.
              </p>
            ) : (
              <>
                <Button
                  onClick={() => handleUpdateOrderStatus(0)}
                  text={"Tolak"}
                  className="bg-danger text-white w-full"
                />
                <Button
                  onClick={() => handleUpdateOrderStatus(1)}
                  text={"Setujui"}
                  className="bg-success text-white w-full"
                />
              </>
            )}
          </div>
        </Modal>
      </td>
    </tr>
  );
}
