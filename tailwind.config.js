/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          dark: '#0052A3',
          light: '#1A7FE6',
          50: '#EEF6FF',
          100: '#D9EBFF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
        },
        secondary: {
          DEFAULT: '#0099FF',
          light: '#33ADFF',
          dark: '#007ACC',
          50: '#F0F9FF',
          100: '#E0F2FE',
        },
        accent: {
          DEFAULT: '#00A896',
          light: '#00C4AF',
          dark: '#008577',
          50: '#F0FDF4',
          100: '#CCFBF1',
        },
        flowGreen: {
          DEFAULT: '#00B074',
          light: '#00D28B',
          dark: '#008F5D',
          50: '#E8FBF4',
          100: '#C5F7E4',
        },
        success: {
          DEFAULT: '#00B074',
          light: '#00D28B',
          dark: '#008F5D',
          50: '#E8FBF4',
          100: '#C5F7E4',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
          50: '#FEF2F2',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
          50: '#FFFBEB',
        },
        background: '#FFFFFF',
        card: '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'text-muted': '#94A3B8',
        'border-subtle': '#E2E8F0',
      },
      backgroundImage: {
        'creditflow-gradient': 'linear-gradient(135deg, #0066CC 0%, #0099FF 30%, #00A896 65%, #00B074 100%)',
        'creditflow-gradient-hover': 'linear-gradient(135deg, #0052A3 0%, #007ACC 30%, #008577 65%, #008F5D 100%)',
        'creditflow-gradient-subtle': 'linear-gradient(135deg, rgba(0, 102, 204, 0.08) 0%, rgba(0, 176, 116, 0.08) 100%)',
        'hero-glow': 'radial-gradient(ellipse at top, rgba(0, 102, 204, 0.12), transparent 70%)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-sm': '12px',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 102, 204, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 28px -4px rgba(0, 102, 204, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 24px -2px rgba(0, 102, 204, 0.35)',
        'glow-green': '0 0 24px -2px rgba(0, 176, 116, 0.35)',
        'button': '0 4px 14px 0 rgba(0, 102, 204, 0.25)',
        'button-hover': '0 6px 20px 0 rgba(0, 102, 204, 0.35)',
      },
    },
  },
  plugins: [],
}
