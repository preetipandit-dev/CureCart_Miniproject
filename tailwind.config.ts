import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C7BE5',
          foreground: '#ffffff'
        },
        success: {
          DEFAULT: '#38B2AC',
          foreground: '#ffffff'
        },
        accent: {
          DEFAULT: '#34D399',
          foreground: '#0f172a'
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)']
      }
    }
  },
  plugins: []
}

export default config
