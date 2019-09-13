const commander = require('commander')
const inquirer = require('inquirer')
const shell = require('shelljs')
const ora = require('ora')
const jsonfile = require('jsonfile')
const { red, cyan, green, bold } = require('kleur') // eslint-disable-line
const envinfo = require('envinfo')
let fs = require('fs')
let path = require('path')
let url = require('url')

const createPikaApp = appName => {
  return new Promise(resolve => {
    if (appName) {
      if (path.isAbsolute(appName)) {
        shell.exec(`mkdir ${appName} > /dev/null`, () => {
          console.log(green().bold('\nWelcome to create-pika-app ✨\n'))
          console.log(`Creating app: ${cyan().bold(appName)}`)
          resolve(true)
        })
      } else {
        shell.exec(
          `cd ${process.cwd()} && mkdir ${appName} > /dev/null`,
          () => {
            console.log(green().bold('\nWelcome to create-pika-app ✨\n'))
            console.log(`Creating app: ${cyan().bold(appName)}`)
            resolve(true)
          }
        )
      }
    }
  })
}

const initApp = (appDirectory, appConfig) => {
  return new Promise(resolve => {
    shell.exec(`cd ${appDirectory} && npm init --yes > /dev/null`, () => {
      const packaged = jsonfile.readFileSync(`${appDirectory}/package.json`)
      jsonfile.writeFileSync(
        `${appDirectory}/package.json`,
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
      text: appConfig.commands['install'].output,
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
      text: appConfig.commands['install -D'].output,
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
  const program = new commander.Command(process.argv[2])
    .version('1.0.0')
    .option('-t, --template [template]', 'template choice')
    .arguments('<project-directory>')
    .usage(`${green('<project-directory>')} [options]`)
    .action((name, options) => {
      // console.log(name, options, options.template)
      appName = name
      templateChoice = options.template
    })
    .option('--verbose', 'print additional logs')
    .allowUnknownOption()
    .on('--help', () => {
      console.log(`    Only ${green('<project-directory>')} is required.\n`)
      console.log(
        `    If you have any problems, do not hesitate to file an issue:`
      )
      console.log(
        `      ${cyan(
          'https://github.com/ndom91/create-pika-app/issues/new'
        )}\n`
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
    console.log(
      `No template chosen, please make a choice for ${cyan(appName)}\n`
    )
    const output = []
    const templates = fs.readdirSync(`${process.cwd()}/assets`)
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
        'Something went wrong while trying to create a new Preact app using create-pika-app'
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
