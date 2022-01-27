#! /usr/bin/env node
const { program } = require('commander')
const version = require('./package.json').version
const helpOption = require('./lib/core/help')
const createCommands = require('./lib/core/create')
const updateChk = require('./lib/core/update')
// 查看版本号
program.version(version)
// 给help增加其他选项
helpOption()
// 创建命令
createCommands()
// 检查更新
updateChk()

program.parse(process.argv)
