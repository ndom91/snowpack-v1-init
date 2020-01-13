const fs = require('fs')
const { sync: globSync } = require('glob')
const filesize = require('filesize')
const jsMinifier = require('terser').minify
const htmlMinifier = require('html-minifier').minify

const minifyJs = process.argv.some(arg => arg === 'js')
const minifyHtml = process.argv.some(arg => arg === 'html')

const getFileSize = file => {
  const { size } = fs.statSync(file)
  return filesize(size)
}

const minifyJsFiles = () => {
  const files = globSync('build/**/*.js')

  files.map(file => {
    console.log(`Minifying ${file} (${getFileSize(file)})`)
    const terserResult = jsMinifier(fs.readFileSync(file, 'utf8'))

    if (terserResult.error) {
      return console.log(`Minifying ${file} error.`, terserResult.error)
    }

    fs.writeFileSync(file, terserResult.code, 'utf8')
    console.log(`Minifying ${file} (${getFileSize(file)}) success.`)
  })
}

const minifyHtmlFiles = () => {
  const files = globSync('build/**/*.html')

  files.map(file => {
    console.log(`Minifying ${file} (${getFileSize(file)})`)
    const result = htmlMinifier(fs.readFileSync(file, 'utf8'), {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
    })

    if (result) {
      fs.writeFileSync(file, result, 'utf8')
      return console.log(`Minifying ${file} (${getFileSize(file)}) success.`)
    }

    console.log(`Minifying ${file} error.`)
  })
}

if (minifyHtml) {
  minifyHtmlFiles()
}

if (minifyJs) {
  minifyJsFiles()
}
