#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')
const {red, cyan, green, white, blue, bold, underline} = require('kleur')
const prompts = require('prompts')
let fs = require('fs')
const packageJson = require('./package.json')

let appName
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
      console.log(bold().red('\nNo app name was provided.'))
      console.log(underline('\nUsage: '))
      console.log('\ncreate-pika-app ', 'app-name\n'.cyan)
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

const copyTemplates = () => {
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

const installDependencies = () => {
  return new Promise(resolve => {
    console.log(cyan(
      '\nInstalling preact, preact-compat, emotion, preact-emotion, and preact-router\n'
    ))
    shell.exec(
      `npm install --save preact preact-compat preact-emotion preact-router emotion`,
      () => {
        console.log(green('\nFinished installing dependencies\n'))
        resolve()
      },
    )
  })
}

const installDevDependencies = () => {
  return new Promise(resolve => {
    console.log(cyan(
      '\nInstalling @pika/web, typescript, eslint, serve, babel, and all their required plugins/presets\n'
    ))
    shell.exec(
      `npm install -D @babel/cli @babel/core @pika/web @typescript-eslint/eslint-plugin @typescript-eslint/parser babel-plugin-import-pika-web copyfiles eslint eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react serve typescript`,
      () => {
        console.log(green('\nFinished installing dev dependencies\n'))
        resolve()
      },
    )
  })
}


const run = async () => {
  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
      appName = name
    })
    .option('--verbose', 'print additional logs')
    .option('--info', 'print environment debug info')
    .allowUnknownOption()
    .on('--help', () => {
        console.log(`    Only ${green('<project-directory>')} is required.`);
        console.log();
        console.log( `    If you have any problems, do not hesitate to file an issue:`);
        console.log( `      ${cyan( 'https://github.com/ndom91/create-pika-app/issues/new')}`); 
        console.log();
    .parse(process.argv)

  if (program.info) {
    console.log(chalk.bold('\nEnvironment Info:'))
    return envinfo
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'npm' ],
          Browsers: [
            'Chrome',
            'Edge',
            'Internet Explorer',
            'Firefox',
            'Safari',
          ],
          npmPackages: ['preact', 'preact-compat', '@pika/web', 'preact-emotion'],
          npmGlobalPackages: ['create-pika-app'],
        },
        {
          duplicates: true,
          showNotFound: true,
        },
      )
      .then(console.log)
  }

  if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:')
    console.log(`  ${cyan(program.name())} ${green('<project-directory>')}`)
    console.log()
    console.log('For example:')
    console.log(`  ${cyan(program.name())} ${chalk.green('my-pika-app')}`)
    console.log()
    console.log(`Run ${cyan(`${program.name()} --help`)} to see all options.`)
    process.exit(1)
  }

  let success = await createPikaApp()
  if (!success) {
    console.log(
      bold().red(
        'Something went wrong while trying to create a new Preact app using create-pika-app',
      ),
    )
    return false
  }
  await cdIntoNewApp()
  await copyTemplates()
  await installDependencies()
  await installDevDependencies()
  console.log(bold().green('All done 🎉'))
}

run()
