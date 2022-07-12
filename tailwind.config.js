const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: {
        950: "#0E4667",
        850: "#0A4F76",
        ...colors.sky,
      },
      secondary: colors.pink,
      /* redesigned colors.slate with https://palettte.app/ */
      gray: {
        950: "#0A1326",
        900: "#0F172A",
        850: "#141E30",
        800: "#1E293B",
        700: "#2F3C4F",
        600: "#475569",
        500: "#69778C",
        400: "#99A6B8",
        300: "#C8D2DD",
        200: "#E2E9F0",
        100: "#F1F5F9",
        50: "#F8FAFC",
      },
      red: colors.red,
      amber: colors.amber,
      green: colors.green,
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      current: colors.current,
      inherit: colors.inherit,
    },
    extend: {
      primary: {
        DEFAULT: colors.sky[400],
      },
      opacity: {
        high: ".87",
        md: ".6",
        low: ".38",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // require("./src/styles/custom-plugin"),
  ],
  darkMode: "class",
};
