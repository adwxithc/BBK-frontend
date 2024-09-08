import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7CBD1E', // Set primary color
        secondary: '#F1F864', // Set secondary color
        background:'#fafcfe'
      },
    },
  },
  plugins: [],
};
export default config;
