/** @type {import('prettier').Config} */
const config = {
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 120,
  singleQuote: true,
  quoteProps: 'consistent',

  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-prisma'],
};

export default config;
