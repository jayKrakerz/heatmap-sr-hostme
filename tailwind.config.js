/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
      },
      colors: {
        bodyText: "#363636",

        // gray colors
        gray50: "#E3E5E8",
        gray100: "#DDDDDD",
        gray200: "#F6F6F6",
        gray600: "#5C6670",
        gray500: "#73808C",
        midGrey: "#BEBEBE",

        // Green colors
        primary50: "#DAFBED",
        primary500: "#3FEA7E",
        primary600: "#2EC666",

        // Orange colors
        orange50: "#FDF3E7",
        orange500: "#FE812F",
        orange600: "#E4742A",
      },
    },
  },
  plugins: [],
};
