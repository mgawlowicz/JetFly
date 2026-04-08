import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4k': '3840px',
      },
      spacing: {
        'section-py-lg': '12rem',
        'section-py-sm': '8rem',
        'container-gap-lg': '5rem',
        'container-gap-sm': '3rem',
        'section-gap': 'clamp(4rem, 8vw, 8rem)',
        'baseline': '0.5rem',
      },
      fontSize: {
        'h1': ['var(--fs-h1-mobile, 3rem)', { lineHeight: '1', fontWeight: '200', letterSpacing: '-0.05em' }],
        'h1-lg': ['var(--fs-h1-desktop, 5.625rem)', { lineHeight: '0.9', fontWeight: '200', letterSpacing: '-0.05em' }],
        'h2': ['2.25rem', { lineHeight: '1.1', fontWeight: '200', letterSpacing: '-0.02em' }],
        'h2-lg': ['3.375rem', { lineHeight: '0.9', fontWeight: '200', letterSpacing: '-0.02em' }],
        'h3': ['1.5rem', { lineHeight: '1.2', fontWeight: '200', letterSpacing: '-0.02em' }],
        'h3-lg': ['2.25rem', { lineHeight: '1.1', fontWeight: '200', letterSpacing: '-0.02em' }],
        'subtitle': ['0.625rem', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '0.6em' }],
        'paragraph': ['0.875rem', { lineHeight: '1.625', fontWeight: '200' }],
        'paragraph-lg': ['1.125rem', { lineHeight: '1.625', fontWeight: '200' }],
        'label': ['0.625rem', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '0.4em' }],
        'caption': ['0.5625rem', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '0.5em' }],
      },
      colors: {
        'premium-dark': '#0a0a0a',
        'premium-gray': '#121212',
        'premium-accent': '#f5f5f5',
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        '128': '32rem',
      },
      rotate: {
        '270' : '270deg'
      }
    },
  },
  plugins: [],
};
export default config;
