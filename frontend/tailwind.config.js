/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
          light: '#818CF8',
        },
        accent: {
          DEFAULT: '#38BDF8',
          dark: '#0EA5E9',
        },
        dark: {
          DEFAULT: '#0F172A',
          lighter: '#1E293B',
          light: '#334155',
        },
      },
    },
  },
  plugins: [],
}
