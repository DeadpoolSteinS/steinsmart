/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: "repeat(auto-fill, 256px)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
