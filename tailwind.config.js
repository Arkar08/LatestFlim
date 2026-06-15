/** @type {import('tailwindcss').Config} */

import tailwind from "nativewind/preset";
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [tailwind],
  theme: {
    extend: {},
  },
  plugins: [],
};
