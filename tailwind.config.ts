import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Albert Sans', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        checkbox: '0 0 0 4px rgba(0, 0, 0, 0.3)',
        checkboxFocused: '0 0 0 0px rgba(0, 0, 0, 0)',
      },
    },
  },
  plugins: [
    require('daisyui'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
  ],
  daisyui: {
    themes: ['bumblebee'],
  },
};
export default config;
