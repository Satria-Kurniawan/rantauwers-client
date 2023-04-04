import axios from "@/lib/axiosConfig";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function getAllKos() {
  const response = await axios.get("/merchant-service/kos/all");

  if (response.status !== 200) throw new Error("Failed to fetch data");

  return response.data.allKos;
}

async function getKos(kosSlug) {
  const response = await axios.get(`/merchant-service/kos/${kosSlug}`);

  if (response.status !== 200) throw new Error("Failed to fetch data");

  return response.data;
}

async function getKosById(kosId) {
  const response = await axios.get(`/merchant-service/kos/id/${kosId}`);

  if (response.status !== 200) throw new Error("Failed to fetch data");

  return response.data.kos;
}

async function getMyOwnKos() {
  const session = await getServerSession(authOptions);

  const response = await axios.get("/merchant-service/kos/my/own", {
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch data");

  return response.data.kos;
}

async function getRooms(kosId) {
  try {
    const response = await axios.get(`/merchant-service/room/${kosId}/all`);
    return response.data.roomsPerKos;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getRoomById(roomId) {
  try {
    const response = await axios.get(`/merchant-service/room/${roomId}`);
    return response.data.room;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getMyOwnRooms() {
  try {
    const session = await getServerSession(authOptions);
    const response = await axios.get("/merchant-service/room/my/own", {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    return response.data.rooms;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getOrdersByCustomer() {
  try {
    const session = await getServerSession(authOptions);
    const response = await axios.get("/order-service/order/customer", {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    return response.data.orders;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getMyOwnOrders(kosSlug) {
  try {
    const session = await getServerSession(authOptions);
    const response = await axios.get(`/order-service/order/${kosSlug}/all`, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    return response.data.ordersPerKos;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getOrder(orderId) {
  try {
    const session = await getServerSession(authOptions);
    const response = await axios.get(`/order-service/order/${orderId}`, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getMyTransactions() {
  try {
    const session = await getServerSession(authOptions);
    const response = await axios.get(
      "/payment-service/payment/my-transactions",
      {
        headers: {
          Authorization: "Bearer " + session?.accessToken,
        },
      }
    );
    return response.data.transactions;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getTransactionsByAdmin() {
  try {
    const session = await getServerSession(authOptions);
    const response = await axios.get(
      "/payment-service/payment/owner-transactions",
      {
        headers: {
          Authorization: "Bearer " + session?.accessToken,
        },
      }
    );
    return response.data.transactions;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export {
  getAllKos,
  getKos,
  getKosById,
  getMyOwnKos,
  getRooms,
  getMyOwnRooms,
  getRoomById,
  getOrdersByCustomer,
  getMyOwnOrders,
  getOrder,
  getMyTransactions,
  getTransactionsByAdmin,
};
