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
        // Primary brand colors
        primary: {
          50: '#f0f9e8',
          100: '#ddf2c7',
          200: '#c4e896',
          300: '#a6db5a',
          400: '#8bc727',
          500: '#7cbd1e', // Main primary
          600: '#63a015',
          700: '#4d7a11',
          800: '#3f6210',
          900: '#355212',
        },
        // Secondary accent colors
        secondary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#f1f864', // Main secondary
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Kindergarten theme colors
        theme: {
          // Warm colors for comfort
          warm: {
            50: '#fef7ed',
            100: '#fdedd3',
            200: '#fad7a5',
            300: '#f6ba6d',
            400: '#f19332',
            500: '#ed7611',
            600: '#de5f07',
            700: '#b84708',
            800: '#92380e',
            900: '#78300f',
          },
          // Soft pastels for playfulness
          soft: {
            pink: '#fce7f3',
            purple: '#f3e8ff',
            blue: '#dbeafe',
            mint: '#d1fae5',
            peach: '#fed7aa',
          },
          // Neutral colors
          neutral: {
            50: '#fafcfe', // Background
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        },
        // Keep existing for compatibility
        background:'#fafcfe'
      },
      // Add theme-based animations
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
