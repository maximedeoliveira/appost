/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    "next/core-web-vitals"
  ],
  plugins: ['unused-imports', '@typescript-eslint'],
  ignorePatterns: [
    // Ignore dotfiles
    '**/node_modules/**',
    '**/dist/**',
    '.eslintrc.js',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
      },
    ],
    // Unused imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // Redundant use of `await` on a return value.
    'no-return-await': 'error',
    // myVar is never reassigned. Use 'const' instead.
    'prefer-const': 'error',
    // Expected property shorthand.
    'object-shorthand': 'error',
    // Forbidden non-null assertion.
    '@typescript-eslint/no-non-null-assertion': 'error',
    // This assertion is unnecessary since it does not change the type of the expression.
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  },
};
