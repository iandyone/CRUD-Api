import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */

export default [
  { languageOptions: { globals: globals.browser } },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      quotes: ['warn', 'single'],
      indent: ['warn', 2],
      semi: ['warn', 'always'],
      curly: ['error', 'all'],
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'consistent-return': 'off',
      'no-console': 'warn',
    },
  },
  { ignores: ['node_modules', 'dist'] },
];
