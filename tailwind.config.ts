import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        nameCard: '60/35',
      },
      fontFamily: {
        sans: ['var(--font-nanum-gothic)'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#71ccfe',
          secondary: '#FCFFC8',
          accent: '#1da0f1',
          neutral: '#FFF586',
          yellow: '#F6F700',
        },
      },
    ],
  },
};
export default config;
