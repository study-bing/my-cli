/*
 * @Author: linbin
 * @Date: 2021-10-08 15:25:26
 * @LastEditTime: 2021-10-11 13:47:50
 * @LastEditors: linbin
 * @Description: 指令
 * @FilePath: /my-cli/lib/core/actions.js
 */
// 工具库自带，将函数转为promise

const { promisify } = require('util')
const path = require('path')

const inquirer = require('inquirer')
const open = require('open')
const downLoad = promisify(require('download-git-repo'))

const terminal = require('../utils/terminal')
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file')
const repoConfig = require('../config/repo_config')
const log = require('../utils/log')
// 创建项目
const createProject = async (project) => {
    log.hint('bingCli helps you create your project, please wait a moment~')
    // 1.clone项目
    await downLoad(repoConfig.vueGitRepo, project, { clone: true })
    // 2.加载以来
    // 选择yarn npm cnpm
    const promptList = [
        {
            type: 'list',
            message: '请选择一种加载依赖的方式:',
            name: 'installType',
            choices: ['npm', 'cnpm', 'yarn'],
        },
    ]
    let installType = 'npm'
    let typeObj = await inquirer.prompt(promptList)
    installType = typeObj.installType
    const command =
        process.platform === 'win32' ? `${installType}.cmd` : installType
    await terminal.spawn(command, ['install'], { cwd: `./${project}` })
    // 3.运行npm run serve
    terminal.spawn(command, ['run', 'serve'], { cwd: `./${project}` }) // 这边加await open不会执行
    // 4.打开浏览器
    open('http://localhost:8080')
}

const handleEjsToFile = async (name, dest, template, filename) => {
    // 1.获取模块引擎的路径
    const templatePath = path.resolve(__dirname, template)
    const result = await ejsCompile(templatePath, {
        name,
        lowerName: name.toLowerCase(),
    })
    // 2.写入文件中
    // 判断文件不存在,那么就创建文件
    mkdirSync(dest)
    const targetPath = path.resolve(dest, filename)
    writeFile(targetPath, result)
}
// 创建组件
const addComponent = async (name, dest) => {
    handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`)
}
// 创建页面
const addPage = async (name, dest) => {
    // 选择yarn npm cnpm
    const promptList = [
        {
            type: 'confirm',
            message: '是否创建路由文件？',
            name: 'router',
        },
    ]
    let { router } = await inquirer.prompt(promptList)
    addComponent(name, dest)
    if (router) {
        handleEjsToFile(
            name,
            dest,
            '../template/vue-router.js.ejs',
            'router.js'
        )
    }
}
// 创建store
const addStore = async (name, dest) => {
    handleEjsToFile(name, dest, '../template/vue-store.js.ejs', 'index.js')
    handleEjsToFile(name, dest, '../template/vue-types.js.ejs', 'types.js')
}

module.exports = {
    createProject,
    addComponent,
    addPage,
    addStore,
}
module.exports = {
    createProject,
    addComponent,
    addPage,
    addStore,
}