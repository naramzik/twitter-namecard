import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import imports from 'eslint-plugin-import';
import importsSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import { ignore } from './eslint-ignore.js';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { ignores: [ignore] },
  js.configs.recommended,
  ...compat.extends(
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'plugin:react-hooks/recommended',
  ),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: { 'import': imports, 'import-sort': importsSort },
    rules: {
      'no-undef': 'off',
      'object-shorthand': ['error', 'always'],
      'import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:', '^@?\\w', '^', '^\\.', '^node:.*\\u0000$', '^@?\\w.*\\u0000$', '\\u0000$', '^\\..*\\u0000$'],
          ],
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
    },
  },
  {
    files: ['**/*.config.[jt]s'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  ...compat.extends('prettier'),
];
