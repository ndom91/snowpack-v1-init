const commander = require('commander')
const shell = require('shelljs')
const ora = require('ora')
var jsonfile = require('jsonfile')
const { red, cyan, green, bold } = require('kleur') // eslint-disable-line
const envinfo = require('envinfo')
let fs = require('fs')
let path = require('path')
let url = require('url')

const createPikaApp = appName => {
  return new Promise(resolve => {
    if (appName) {
      if (path.isAbsolute(appName)) {
        shell.exec(`mkdir ${appName}`, () => {
          console.log()
          console.log(green().bold('Welcome to create-pika-app'))
          console.log()
          console.log(`Creating app: ${cyan().bold(appName)}\n`)
          resolve(true)
        })
      } else {
        shell.exec(`cd ${process.cwd()} && mkdir ${appName}`, () => {
          console.log(green().bold('Welcome to create-pika-app'))
          console.log()
          console.log(`Creating app: ${cyan().bold(appName)}\n`)
          resolve(true)
        })
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
  const program = new commander.Command(process.argv[2])
    .version('1.0.0')
    .option('-t, --template <type>', 'template choice')
    .arguments('<project-directory>')
    .usage(`${green('<project-directory>')} [options]`)
    .action(name => {
      appName = name
    })
    .option('--verbose', 'print additional logs')
    .allowUnknownOption()
    .on('--help', () => {
      console.log(`    Only ${green('<project-directory>')} is required.`)
      console.log()
      console.log(
        `    If you have any problems, do not hesitate to file an issue:`
      )
      console.log(
        `      ${cyan('https://github.com/ndom91/create-pika-app/issues/new')}`
      )
      console.log()
    })
    .parse(process.argv)

  if (program.template) {
    console.log(program.template)
  }

  let appDirectory = `${process.cwd()}/${appName}`
  if (typeof appname === 'string' && path.isAbsolute(appName)) {
    appDirectory = appName
  }

  if (typeof appName === 'undefined') {
    console.error('Please specify the project name:')
    console.log(`  ${cyan(program.name())} ${green('<project-directory>')}`)
    console.log()
    console.log('For example:')
    console.log(`  ${cyan(program.name())} ${green('my-pika-app')}`)
    console.log()
    console.log(`Run ${cyan(`${program.name()} --help`)} to see all options.`)
  }

  let success = await createPikaApp(appName)
  if (!success && typeof appName !== undefined) {
    console.log(
      bold().red(
        'Something went wrong while trying to create a new Preact app using create-pika-app'
      )
    )
    return false
  }
  console.log(import.meta.url)
  const appConfigLoc = url.fileURLToPath(
    url.resolve(import.meta.url, '../assets/app-preact/config.json')
  )
  const appConfig = require(appConfigLoc)
  const appTemplateLoc = url.fileURLToPath(
    url.resolve(import.meta.url, '../assets/app-preact/template')
  )
  await initApp(appDirectory, appConfig)
  await copyTemplates(appDirectory, appTemplateLoc)
  await installDependencies(appDirectory, appConfig)
  await installDevDependencies(appDirectory, appConfig)
  console.log()
  console.log(`Application ready at ${bold(appDirectory)}!`)
  console.log()
  console.log(green('✔️ ') + bold(' Complete!'))
}
