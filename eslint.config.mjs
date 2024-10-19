import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      tsPlugin: tseslint,
    },
    rules: {
      quotes: ['warn', 'single'],
      semi: ['warn', 'always'],
      curly: ['error', 'all'],
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'consistent-return': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    },
  },
  { ignores: ['node_modules', 'dist'] },
];
