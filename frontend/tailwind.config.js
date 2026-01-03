/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          'gh-bg': '#0d1117',
          'gh-border': '#30363d',
          'gh-text': '#c9d1d9',
          'gh-muted': '#8b949e',
          'gh-link': '#58a6ff',
          'gh-btn': '#21262d',
          'gh-btn-hover': '#30363d',
          'gh-green': '#238636',
        }
      },
    },
    plugins: [],
  }