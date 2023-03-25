import { MdDashboard, MdStore } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";
import { HiDocumentText } from "react-icons/hi2";

const koss = [
  {
    name: "Kos Fanny",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/1.jpg",
    price: 900000,
    type: "Campur",
  },
  {
    name: "Kos Ling-Ling",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/2.jpg",
    price: 900000,
    type: "Putri",
  },
  {
    name: "Kos Lancelot",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/3.jpg",
    price: 900000,
    type: "Putra",
  },
  {
    name: "Kos Hayabuset",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/4.jpg",
    price: 900000,
    type: "Bencong",
  },
  {
    name: "Kos Julian",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/1.jpg",
    price: 900000,
    type: "Campur",
  },
  {
    name: "Kos Julian",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/1.jpg",
    price: 900000,
    type: "Campur",
  },
  {
    name: "Kos Julian",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/1.jpg",
    price: 900000,
    type: "Campur",
  },
  {
    name: "Kos Julian",
    address: "Jalan Raya Gang Buntu Nomer Togel",
    facilities: ["Wifi", "Kasur", "Lemari", "Meja"],
    image: "/assets/koss/1.jpg",
    price: 900000,
    type: "Campur",
  },
];

const categories = [{ name: "Putri" }, { name: "Putra" }, { name: "Campur" }];

const userSidebarLinks = [
  { name: "Profil Saya", path: "/user/my-profile" },
  { name: "Kos Saya", path: "/user/my-kos" },
  { name: "Riwayat Booking", path: "/user/booking-history" },
  { name: "Riwayat Kos", path: "/user/kos-history" },
];

const kosDurations = ["Perminggu", "Perbulan", "Per 6 Bulan", "Pertahun"];

const inputsForLogin = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Email",
    // errorMessage: "Email address tidak valid!",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Password",
    // errorMessage: "Password wajib diisi!",
    required: true,
  },
];

const inputsForRegister = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Nama",
    // errorMessage: "Nama wajib diisi!",
    required: true,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Email",
    // errorMessage: "Email address tidak valid!",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Password",
    // errorMessage: "Password wajib diisi!",
    required: true,
  },
  {
    label: "Password Confirmation",
    type: "password",
    name: "passwordConfirmation",
    placeholder: "Konfirmasi Password",
    // errorMessage: "Konfirmasi password wajib diisi!",
    required: true,
  },
];

const adminSidebarLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdDashboard size={25} />,
  },
  { name: "Merchant", path: "/admin/merchant", icon: <MdStore size={25} /> },
  {
    name: "Orderan",
    path: "/admin/order-list",
    icon: <HiDocumentText size={25} />,
  },
  {
    name: "Transaction",
    path: "/admin/transactions",
    icon: <RiFileList3Fill size={25} />,
  },
];

const kosTextInputs = [
  {
    label: "Nama Kos",
    type: "text",
    name: "name",
    placeholder: "Nama Kos",
    required: true,
  },
  {
    label: "Deskripsi",
    type: "text",
    name: "description",
    placeholder: "Deskripsi",
    required: true,
  },
  {
    label: "Lokasi",
    type: "text",
    name: "location",
    placeholder: "Lokasi",
    required: true,
  },
];

const kosGeneralFacilities = [
  "Dapur umum",
  "Tempat parkir",
  "Tempat jemur pakaian",
];

const kosRules = [
  "Khusus untuk Putri",
  "Khusus untuk Putra",
  "Tidak untuk pasutri",
];

export {
  koss,
  categories,
  userSidebarLinks,
  kosDurations,
  inputsForLogin,
  inputsForRegister,
  adminSidebarLinks,
  kosTextInputs,
  kosGeneralFacilities,
  kosRules,
};
