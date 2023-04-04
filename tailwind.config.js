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
        primary: "#b53dff",
        secondary: "#F0D8FF",
        info: "#999999",
        light: "#fafafa",
        dark: "#202020",
        dark2: "#2E2E2E",
        danger: "#F45E5E",
        warning: "#F6FE44",
        success: "#00FF8F",
      },
    },
  },
  plugins: [],
};
