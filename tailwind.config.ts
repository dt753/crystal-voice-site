import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        crystal: {
          50:  '#f3f0ff',
          100: '#e9e3ff',
          200: '#d4caff',
          300: '#b3a5ff',
          400: '#8b73ff',
          500: '#6d45f7',
          600: '#5a28e8',
          700: '#4b1dd0',
          800: '#3e1caa',
          900: '#341c87',
          950: '#1e0f55',
        },
        void: {
          900: '#0a0a14',
          800: '#0f0f1e',
          700: '#131326',
          600: '#1a1a30',
          500: '#22223d',
        },
      },
      backgroundImage: {
        'crystal-gradient': 'linear-gradient(135deg, #6d45f7 0%, #a855f7 50%, #06b6d4 100%)',
        'glow-purple': 'radial-gradient(ellipse at center, rgba(109,69,247,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'crystal': '0 0 30px rgba(109,69,247,0.3), 0 0 60px rgba(109,69,247,0.1)',
        'crystal-sm': '0 0 15px rgba(109,69,247,0.25)',
        'crystal-lg': '0 0 60px rgba(109,69,247,0.4), 0 0 120px rgba(168,85,247,0.2)',
        'glow': '0 0 20px rgba(109,69,247,0.5)',
      },
      animation: {
        'float': 'float 3.5s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'wave': 'wave 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(3deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(109,69,247,0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(109,69,247,0.8), 0 0 80px rgba(168,85,247,0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.8)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
