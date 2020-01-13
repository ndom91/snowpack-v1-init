module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: ['babel-plugin-add-import-extension', 'snowpack/assets/babel-plugin.js'],
  ignore: ['**/*.spec.ts'],
}
