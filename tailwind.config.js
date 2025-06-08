/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,md}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        headings: "rgb(218, 218, 219)",
        links: "rgb(155, 156, 157)",
        prose: "rgb(155, 156, 157)",
        bg: "rgb(29, 30, 32)",
        bgLight: "rgb(59, 60, 62)",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(155, 156, 157)",
            "--tw-prose-headings": "rgb(218, 218, 219)",
            "--tw-prose-links": theme("colors.blue.400"),
            "--tw-prose-bold": "rgb(218, 218, 219)",
            "--tw-prose-counters": "rgb(155, 156, 157)",
            "--tw-prose-bullets": "rgb(155, 156, 157)",
            "--tw-prose-hr": theme("colors.gray.700"),
            "--tw-prose-quotes": "rgb(155, 156, 157)",
            "--tw-prose-quote-borders": theme("colors.gray.700"),
            "--tw-prose-captions": "rgb(155, 156, 157)",
            "--tw-prose-code": "rgb(218, 218, 219)",
            "--tw-prose-pre-code": "rgb(218, 218, 219)",
            "--tw-prose-pre-bg": theme("colors.gray.800"),
            "--tw-prose-th-borders": theme("colors.gray.700"),
            "--tw-prose-td-borders": theme("colors.gray.700"),
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
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
