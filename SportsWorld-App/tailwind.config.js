/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: "#0f3d2e",
        brandGreenDark: "#1d4e39",
        brandCream: "#f6f4ef",
        brandGold: "#bfa27a"

      },
    },
  },
  plugins: [],
};

