/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      'purple-light': '#C1BEFF',
      'gradient-purple' : '#270B60',
      'gray-light': '#c9c8cc',
      'gray-lightest' : '#e8e6e6',
      'blue-dark' : '#3434c2',
      'blue-light' : '#4c68d7',
      'red-dark' : '#db2b1f',
      'red-light' : '#ff0011',
      'green-light' : '#09ff00',
      'white' : '#ffffff',
      'black' : '#000000',
      // Light mode colors
      primary: '#ffffff',
      background: '#ffffff',
      text: '#333333',
      // Dark mode colors
      darkPrimary: '#1a202c',
      darkBackground: '#2d3748',
      darkText: '#e2e8f0',
    },
    extend: {
      lineHeight: {
        '1': '1.2rem'
      }
    },
  },
  plugins: [],
}

