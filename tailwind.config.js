/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        blue: { DEFAULT: '#3B82F6', 400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB' },
        purple: { DEFAULT: '#8B5CF6', 400: '#A78BFA', 500: '#8B5CF6' },
        cyan: { DEFAULT: '#06B6D4', 400: '#22D3EE', 500: '#06B6D4' },
        slate: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0',
          300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B',
          600: '#475569', 700: '#334155', 800: '#1E293B',
          900: '#0F172A', 950: '#020617',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'spin-slow': 'spin 25s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'typewriter': 'typewriter 0.5s steps(40) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(110px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(110px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)',
        'gradient-blue-purple': 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        'gradient-blue-cyan': 'linear-gradient(135deg, #3B82F6, #06B6D4)',
      },
      backdropBlur: { xs: '2px', sm: '4px', md: '12px', lg: '16px', xl: '24px' },
    },
  },
  plugins: [],
}
