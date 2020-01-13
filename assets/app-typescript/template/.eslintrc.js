module.exports = {
  parser: '@typescript-eslint/parser', // ESLint parser
  parserOptions: {
    ecmaVersion: 2019, // Modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Recommended rules from @typescript-eslint/eslint-plugin
    'standard', // Recommended rules from StandardJS
    'prettier/@typescript-eslint', // Disable ESLint rules that would conflict with prettier
    'plugin:prettier/recommended', // Displays prettier errors as ESLint errors
  ],
  rules: {
    '@typescript-eslint/indent': 'off', // This is the job of StandardJS
  },
  env: {
    jest: true,
  },
}
