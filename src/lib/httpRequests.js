import axios from "@/lib/axiosConfig";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function getAllKos() {
  const response = await axios.get("/merchant-service/kos/all");
  return response.data.allKos;
}

async function getKos(kosSlug) {
  const response = await axios.get(`/merchant-service/kos/${kosSlug}`);
  return response.data.kos;
}

async function getMyOwnKos() {
  const session = await getServerSession(authOptions);

  const response = await axios.get("/merchant-service/kos/my/own", {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  return response.data.kos;
}

async function getRooms(kosId) {
  const response = await axios.get(`/merchant-service/room/${kosId}/all`);
  return response.data.roomsPerKos;
}

async function getMyOwnRooms() {
  const session = await getServerSession(authOptions);

  const response = await axios.get("/merchant-service/room/my/own", {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  return response.data.rooms;
}

export { getAllKos, getKos, getMyOwnKos, getRooms, getMyOwnRooms };
