const commander = require('commander')
const inquirer = require('inquirer')
const shell = require('shelljs')
const ora = require('ora')
const jsonfile = require('jsonfile')
const { red, cyan, green, bold } = require('kleur') // eslint-disable-line
let fs = require('fs')
let path = require('path')
let url = require('url')

const createPikaApp = appName => {
  return new Promise(resolve => {
    if (appName) {
      if (path.isAbsolute(appName)) {
        shell.exec(`mkdir ${appName}`, () => {
          console.log(green().bold('\nWelcome to snowpack-init ✨\n'))
          console.log(`Creating app: ${cyan().bold(appName)}`)
          resolve(true)
        })
      } else {
        shell.exec(`cd ${process.cwd()} && mkdir ${appName}`, () => {
          console.log(green().bold('\nWelcome to snowpack-init ✨\n'))
          console.log(`Creating app: ${cyan().bold(appName)}`)
          resolve(true)
        })
      }
    }
  })
}

const initApp = (appDirectory, appConfig) => {
  return new Promise(resolve => {
    shell.exec(`cd ${appDirectory} && npm init --yes`, () => {
      const packaged = jsonfile.readFileSync(
        path.resolve(`${appDirectory}/package.json`)
      )
      jsonfile.writeFileSync(
        path.resolve(`${appDirectory}/package.json`),
        {
          ...packaged,
          ...appConfig.packageManifest,
        },
        {
          spaces: 2,
        }
      )
      resolve()
    })
  })
}

const copyTemplates = (appDirectory, appTemplateLoc) => {
  const copyDirectoryRecursiveSync = (source, target, move) => {
    if (!fs.lstatSync(source).isDirectory()) return

    var operation = move ? fs.renameSync : fs.copyFileSync
    fs.readdirSync(source).forEach(function(itemName) {
      var sourcePath = path.join(source, itemName)
      var targetPath = path.join(target, itemName)

      if (fs.lstatSync(sourcePath).isDirectory()) {
        fs.mkdirSync(targetPath)
        copyDirectoryRecursiveSync(sourcePath, targetPath)
      } else {
        operation(sourcePath, targetPath)
      }
    })
  }
  copyDirectoryRecursiveSync(appTemplateLoc, appDirectory)
}

const installDependencies = (appDirectory, appConfig) => {
  return new Promise(resolve => {
    const installDepSpinner = ora({
      text: ` ${bold().white('snowpack-init')} installing dependencies...`,
    }).start()
    shell.exec(
      `cd ${appDirectory} && ${appConfig.commands['install'].exec}`,
      () => {
        installDepSpinner.succeed()
        resolve()
      }
    )
  })
}

const installDevDependencies = (appDirectory, appConfig) => {
  return new Promise(resolve => {
    const installDevDepSpinner = ora({
      text: ` ${bold().white('snowpack-init')} installing dev dependencies...`,
    }).start()
    shell.exec(
      `cd ${appDirectory} && ${appConfig.commands['install -D'].exec}`,
      () => {
        installDevDepSpinner.succeed()
        resolve()
      }
    )
  })
}

export const run = async () => {
  let appName
  let templateChoice
  const program = new commander.Command()
    .version('1.1.2')
    .option('-t, --template [template]', 'template choice (optional)')
    .arguments('<project-name>')
    .usage(`--template [template] ${green('<project-name>')}`)
    .action((name, options) => {
      appName = name
      templateChoice = options.template
    })
    .allowUnknownOption()
    .on('--help', () => {
      console.log(`\nExamples: `)
      console.log(`  $ snowpack-init --template app-preact my-new-app `)
      console.log(`  $ snowpack-init my-new-app `)
      console.log(
        `\n    If you have any problems, do not hesitate to file an issue:`
      )
      console.log(
        `      ${cyan('https://github.com/pikapkg/init/issues/new')}\n`
      )
    })
    .parse(process.argv)

  if (typeof appName === 'undefined') {
    console.error('Please specify the project name:')
    console.log(`  ${cyan(program.name())} ${green('<project-directory>')}\n`)
    console.log('For example:')
    console.log(`  ${cyan(program.name())} ${green('my-pika-app')}\n`)
    console.log(`Run ${cyan(`${program.name()} --help`)} to see all options.`)
    return false
  }

  if (!program.template) {
    const output = []
    const templateDirectoryLoc = url.fileURLToPath(
      url.resolve(import.meta.url, `../assets`)
    )
    const templates = fs.readdirSync(templateDirectoryLoc)
    templates.forEach(template => {
      output.push(template)
    })
    const prompt = {
      type: 'list',
      name: 'templates',
      message: 'Please choose a template',
      pageSize: output.length + 2,
      choices: output.map(template => ({
        name: cyan(template),
        value: template,
      })),
    }
    await inquirer.prompt(prompt).then(answers => {
      templateChoice = answers.templates
    })
  }

  let appDirectory = `${process.cwd()}/${appName}`
  if (typeof appname === 'string' && path.isAbsolute(appName)) {
    appDirectory = appName
  }

  let success = await createPikaApp(appName)

  console.log(`Template: ${bold().cyan(templateChoice)}\n`)

  if (!success && typeof appName !== undefined) {
    console.log(
      bold().red(
        'Something went wrong while trying to create a new Pika app using snowpack-init'
      )
    )
    return false
  }
  const appConfigLoc = url.fileURLToPath(
    url.resolve(import.meta.url, `../assets/${templateChoice}/config.json`)
  )
  const appConfig = require(appConfigLoc)
  const appTemplateLoc = url.fileURLToPath(
    url.resolve(import.meta.url, `../assets/${templateChoice}/template`)
  )
  await initApp(appDirectory, appConfig)
  await copyTemplates(appDirectory, appTemplateLoc)
  await installDependencies(appDirectory, appConfig)
  await installDevDependencies(appDirectory, appConfig)
  console.log(`\nApplication ready at ${bold(appDirectory)}!\n`)
  console.log(green('✔️ ') + bold(' Complete!'))
}
