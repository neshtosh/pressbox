/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        exo: ['Exo 2', 'sans-serif'],
      },
      colors: {
        cyan: {
          400: '#00D9FF',
          500: '#00B8D4',
        },
        neon: {
          blue: '#00D9FF',
          orange: '#FF6B35',
          green: '#39FF14',
          pink: '#FF10F0',
          purple: '#BF00FF',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-delay': 'fadeIn 0.8s ease-out 0.2s both',
        'fade-in-delay-2': 'fadeIn 0.8s ease-out 0.4s both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-cyan-lg': '0 0 30px rgba(0, 217, 255, 0.5)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.3)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.3)',
      },
    },
  },
  plugins: [],
};