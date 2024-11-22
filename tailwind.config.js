/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-login': "url('../public/images/bg-login.png')",
        'background-1': "url('../public/images/TempBG.jpg')",
        'background-2': "url('../public/images/bg-login2.png')",
      },
      backgroundColor: {
        'vlu': '#1A1851',
        'vluu': '#333087',
      },
      fontSize: {
        'xxs': 9, // 40px
      },
    },
  },
  plugins: [],
}

