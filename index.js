#!/usr/bin/env node

const shell = require('shelljs')
const {red, white, blue, bold} = require('kleur')
const prompts = require('prompts')
let fs = require('fs')

let appName = process.argv[2]
let appDirectory = `${process.cwd()}/${appName}`

let templates = require('./templates/templates.js')

const createPikaApp = () => {
  return new Promise(resolve => {
    if (appName) {
      shell.exec(`create-react-app ${appName}`, () => {
        console.log('Created react app')
        resolve(true)
      })
    } else {
      console.log('\nNo app name was provided.'.red)
      console.log('\nProvide an app name in the following format: ')
      console.log('\ncreate-react-redux-router-app ', 'app-name\n'.cyan)
      resolve(false)
    }
  })
}

const cdIntoNewApp = () => {
  return new Promise(resolve => {
    shell.exec(`cd ${appName}`, () => {
      resolve()
    })
  })
}

const installPackages = () => {
  return new Promise(resolve => {
    console.log(
      '\nInstalling redux, react-router, react-router-dom, react-redux, and redux-thunk\n'
        .cyan,
    )
    shell.exec(
      `npm install --save redux react-router react-redux redux-thunk react-router-dom`,
      () => {
        console.log('\nFinished installing packages\n'.green)
        resolve()
      },
    )
  })
}

const updateTemplates = () => {
  return new Promise(resolve => {
    let promises = []
    Object.keys(templates).forEach((fileName, i) => {
      promises[i] = new Promise(res => {
        fs.writeFile(
          `${appDirectory}/src/${fileName}`,
          templates[fileName],
          function(err) {
            if (err) {
              return console.log(err)
            }
            res()
          },
        )
      })
    })
    Promise.all(promises).then(() => {
      resolve()
    })
  })
}

const run = async () => {
  let success = await createPikaApp()
  if (!success) {
    console.log(
      'Something went wrong while trying to create a new Preact app using create-pika-app'
        .red,
    )
    return false
  }
  await cdIntoNewApp()
  await installPackages()
  await updateTemplates()
  console.log('All done')
}

run()
