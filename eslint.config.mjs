import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      semi: ['error', 'always'],
      '@stylistic/indent': ['error', 4],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-curly-newline': ['error', { 'multiline': true }],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-function-call-newline': ["error", "always"],
      'function-paren-newline': ['error', 'multiline'],
      'object-property-newline': ['error', {
        'allowAllPropertiesOnSameLine': false
      }]
    },
  },
];

export default eslintConfig;
