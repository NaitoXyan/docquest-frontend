/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-login': "url('../img/bg-login.png')",
      },
      backgroundColor: {
        'vlu': '#1A1851',
        'vluu': '#333087',
      },
    },
  },
  plugins: [],
}

