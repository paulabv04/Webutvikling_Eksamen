/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tennisGreen: "#1A3C34",
        tennisPink: "#94D3A2",
        tennisSand: "#EFE7DB",
        tennisDark: "#1A1A1A",
        tennisOrange: "#E8A23A"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        elegant: ["Great Vibes", "cursive"],
      }
    }
  },
  plugins: [],
}

