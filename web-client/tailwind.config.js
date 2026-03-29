/** @type {import('tailwind').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables the manual toggle switch
  theme: {
    extend: {
      colors: {
        vintage: {
          paper: '#f4ebd8',    // Light mode background (aged paper)
          ink: '#2b2621',      // Dark text (faded typewriter ink)
          shadow: '#14110f',   // Dark mode background
          crimson: '#8b0000',  // Red stamp color for fake news
          emerald: '#0f5132',  // Green stamp color for authentic
        }
      },
      fontFamily: {
        typewriter: ['"Special Elite"', 'Courier', 'monospace'],
      },
      backgroundImage: {
        'corkboard': "url('/corkboard.jpg')",
        'desk': "url('/detective-desk.jpg')",
      },
      animation: {
        'reveal': 'focusIn 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'flicker': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        focusIn: {
          '0%': { filter: 'blur(12px)', opacity: '0', transform: 'scale(0.95)' },
          '100%': { filter: 'blur(0px)', opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}