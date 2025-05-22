/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyan-glow': '#00FFFF',
        'electric-blue': '#0892D0',
        'magenta-glow': '#FF00FF',
        'dark-blue': '#050A30',
        'space-black': '#000000',
      },
      backgroundImage: {
        'tech-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 4s ease-in-out infinite',
        scanline: 'scanlines 10s linear infinite',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        spaceMono: ['Space Mono', 'monospace'],
        exo: ['Exo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};