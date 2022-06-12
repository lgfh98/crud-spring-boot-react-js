module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {},
    fontWeight: { normal: 500, bold: 700 },
    fontFamily: {
      sans: ["'Epilogue'", "sans-serif"],
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      "almost-white": "hsl(0, 0%, 98%)",
      "medium-gray": "hsl(0, 0%, 41%)",
      "almost-black": "hsl(0, 0%, 8%)",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
