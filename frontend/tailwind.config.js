/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html ", "./src/**/*.{js,jsx, ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#240750",
          200: "#2980B7",
        },
      },
    },
  },
  plugins: [],
};

