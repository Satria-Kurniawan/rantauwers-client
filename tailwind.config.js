/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8F00FF",
        info: "#999999",
        light: "#fafafa",
        dark: "#202020",
        dark2: "#2E2E2E",
        danger: "#EE4A4A",
      },
    },
  },
  plugins: [],
};
