/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#00d2ff', // Electric Cyan
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
          cyan: '#00d2ff',
          magenta: '#d946ef',
          purple: '#a855f7',
          dark: '#0a0a0a',
          surface: '#121212',
          card: '#18181b',
        },
        magenta: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef', // Neon Magenta
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        }
      },
      fontFamily: {
        sans: ['Poppins', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 35px -5px rgba(0, 210, 255, 0.55)',
        'glow-cyan': '0 0 30px -3px rgba(0, 210, 255, 0.5)',
        'glow-magenta': '0 0 30px -3px rgba(217, 70, 239, 0.5)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(0, 210, 255, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
