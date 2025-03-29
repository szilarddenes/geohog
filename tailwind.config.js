/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b2b2b2',
          400: '#999999',
          500: '#7f7f7f',
          600: '#666666',
          700: '#4c4c4c',
          800: '#333333',
          900: '#191919',
          950: '#0d0d0d'
        },
        secondary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#313131',
          950: '#1a1a1a'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace']
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '80ch'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}