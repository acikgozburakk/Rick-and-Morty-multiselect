import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     
      colors: {
        lavenderMist:"#E2E8F0",
        cadetGrey:"#94A3B8",
      blueGrey:   "#64748B"  }
    },
  },
  plugins: [],
};
export default config;
