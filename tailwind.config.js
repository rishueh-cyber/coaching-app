/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Cabinet Grotesk', 'sans-serif'],
      },
      colors: {
        obsidian: '#0b0f19',
        'obsidian-light': '#141b2d',
        'electric-blue': '#2563eb',
        'neon-violet': '#7c3aed',
        'soft-azure': '#e0f2fe',
        glass: 'rgba(255, 255, 255, 0.05)',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        'glass-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'brutal-light': '4px 4px 0px 0px rgba(255,255,255,0.8)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
