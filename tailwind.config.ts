import type { Config } from 'tailwindcss'
import forms from "@tailwindcss/forms"

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'system-ui','Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontSize: {
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2.5rem',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      backgroundImage: {
        'close': "url('./src/assets/close.svg')",
      },
    },
  },
  plugins: [
    forms()
  ],
} satisfies Config

