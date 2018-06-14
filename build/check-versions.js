'use strict'
const chalk = require('chalk') // 引入的是一个用来在命令行输出不同颜色文字的模块，通过chalk.yellow("想添加颜色的文字......")来实现改变文字颜色的；
const semver = require('semver') // 引入的是一个语义化版本文件的npm包，其实它就是用来控制版本的
const packageConfig = require('../package.json') // 引入package.json 主要用于获取版本号
const shell = require('shelljs')

function exec (cmd) { // 执行一个cmd命令
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // 返回一个标准的版本号，且去掉两边的空格
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) { // 查看npm版本
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 执行一个cmd命令 （npm --vesion）
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () { // 检测版本是否符合要求，不符合输出警告信息
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}