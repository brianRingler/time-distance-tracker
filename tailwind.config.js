/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl':'1280px',
      '2xl':'1536px'
    },
    container: {
      center: true,
      padding: '2rem'
    },

    extend: {
      colors: {
        'nav-link':'var(--nav-link-color)',
        'primary': {DEFAULT: 'var(--primary-color)'},
        'primary-hover': 'var(--primary-color-hover)'
      }
    },
  },
  plugins: [],
}