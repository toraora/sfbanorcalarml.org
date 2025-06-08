/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,md}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background-primary": {
          DEFAULT: "rgb(245, 245, 245)",
          dark: "rgb(29, 30, 32)",
        },
        "background-secondary": {
          DEFAULT: "rgb(225, 226, 227)",
          dark: "rgb(41, 42, 43)",
        },
        "background-tertiary": {
          DEFAULT: "rgb(205, 206, 207)",
          dark: "rgb(59, 60, 62)",
        },
        "content-primary": {
          DEFAULT: "rgb(30, 30, 30)",
          dark: "rgb(245, 245, 245)",
        },
        "content-secondary": {
          DEFAULT: "rgb(80, 80, 80)",
          dark: "rgb(190, 190, 190)",
        }, 
        "content-tertiary": {
          DEFAULT: "rgb(107, 108, 109)",
          dark: "rgb(155, 156, 157)",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            h1: {
              fontWeight: "bold",
              marginTop: theme("spacing.16"),
              marginBottom: theme("spacing.2"),
              "&:first-child": { marginTop: 0 },
            },
            hr: {
              maxWidth: "50%",
              borderStyle: "dotted",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.8"),
            },
            th: {
              borderRightWidth: theme("borderWidth.DEFAULT"),
              "&:last-child": { borderRightWidth: 0 },
            },
            td: {
              borderRightWidth: theme("borderWidth.DEFAULT"),
              "&:last-child": { borderRightWidth: 0 },
            },
            a: {
              color: "inherit",
              textDecoration: "underline",
            },
            strong: {
              color: "inherit",
            },
          },
        }
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
