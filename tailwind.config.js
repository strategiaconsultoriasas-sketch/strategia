/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          deep: 'rgb(var(--ink-deep) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)',
        },
        teal: {
          DEFAULT: 'rgb(var(--teal) / <alpha-value>)',
          glow: 'rgb(var(--teal-glow) / <alpha-value>)',
          deep: 'rgb(var(--teal-deep) / <alpha-value>)',
        },
        paper: {
          DEFAULT: 'rgb(var(--paper) / <alpha-value>)',
          2: 'rgb(var(--paper-2) / <alpha-value>)',
          rule: 'rgb(var(--paper-rule) / <alpha-value>)',
        },
        fg: {
          'on-dark': 'rgb(var(--fg-on-dark) / <alpha-value>)',
          'on-dark-mute': 'rgb(var(--fg-on-dark-mute) / <alpha-value>)',
          'on-dark-dim': 'rgb(var(--fg-on-dark-dim) / <alpha-value>)',
          'on-light': 'rgb(var(--fg-on-light) / <alpha-value>)',
          'on-light-mute': 'rgb(var(--fg-on-light-mute) / <alpha-value>)',
          'on-light-dim': 'rgb(var(--fg-on-light-dim) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      transitionTimingFunction: {
        'ease-out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'ease-drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
