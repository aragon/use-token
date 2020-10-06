module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'react-app',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    jsx: true,
    project: './tsconfig.json',
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.13',
    },
  },
}
