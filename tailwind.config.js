/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure Tailwind scans all relevant files for classes
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}", // Include the components folder
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
