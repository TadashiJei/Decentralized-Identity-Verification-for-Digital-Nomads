import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["night",],
  },
} satisfies Config;