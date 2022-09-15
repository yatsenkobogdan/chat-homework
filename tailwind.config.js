module.exports = {
  purge: false,
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'body': '#17212B',
        'chat': '#0E1621',
        'custom-gray': '#7F91A4',
        'custom-light-gray': '#232F3D',
        'custom-blue': '#5188C1',
        'nickname': '#5387C1',
      },
    }
  },
  plugins: [],
}