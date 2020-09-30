module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    jsx: true,
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: '999.999.999',
    },
  },
}
