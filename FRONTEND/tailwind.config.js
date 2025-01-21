/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#202c33",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
