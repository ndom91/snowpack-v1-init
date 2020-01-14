module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    !ctx.options.map ? require('cssnano') : null
  ]
})
