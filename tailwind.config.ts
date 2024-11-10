import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        ep_gray: '#9E9E9E',
        ep_black: '#313131',
        ep_green: '#71B390',
        ep_yellow: '#EEE8C8',
        ep_orange: '#F1A762',
        ep_dark_orange: '#A84A48',
        ep_pink: '#f13364',
      },
    },
  },
  plugins: [],
}
export default config
