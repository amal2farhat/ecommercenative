// const { Background } = require("expo-router/build/react-navigation");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        secondary: "#666666",
        background: "#FFFFFF",
        banafsajiAmal: "#8B5CF6",
        orangAmal: "#F97316",
        surface: "#F7F7F7",
        accent: "#FF4C3B",
        border: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
