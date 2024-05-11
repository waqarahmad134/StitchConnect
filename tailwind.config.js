/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        switzer: "Switzer",
      },
      backgroundImage: {
        signInHero: "url('/images/hero3.webp')",
        exteriorHeroBg: "url('/images/accessories.webp')",
        heroSectionBg: "url('/images/herobg.jpg')",
        "payment-bg": "url('/images/payment-bg.webp')",
      },
    },
  },
  plugins: [],
};
