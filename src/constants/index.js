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
    errorMessage: "Email address tidak valid!",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Password",
    errorMessage: "Password wajib diisi!",
    required: true,
  },
];

const inputsForRegister = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Nama",
    errorMessage: "Nama wajib diisi!",
    required: true,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Email",
    errorMessage: "Email address tidak valid!",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Password",
    errorMessage: "Password wajib diisi!",
    required: true,
  },
  {
    label: "Password Confirmation",
    type: "password",
    name: "passwordConfirmation",
    placeholder: "Konfirmasi Password",
    errorMessage: "Konfirmasi password wajib diisi!",
    required: true,
  },
];

export {
  koss,
  categories,
  userSidebarLinks,
  kosDurations,
  inputsForLogin,
  inputsForRegister,
};
