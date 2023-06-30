module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ualert: '#FF00C7',
        charyo: '#1F1F1F',
        notpurple: '#F9F8FC',
        purps: '#7e18ff',
        purplehaze: '#b8b2ff',
        lamegray: '#d9d9d9',
        lavender: '#97B1FA'
      },
      spacing: {
        '80': '20rem',
      },
      translate: {
        '1/2': '50%',
      },
      inset: {
        '1/2': '50%'
      }
    },
    variants: {
      extend: {
        visibility: ['hover', 'focus'],
      },
    },
    plugins: [],
  },
};
