const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk');

const log = require('./log')
// ejs编译
const ejsCompile = (templatePath, data = {}, options = {}) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data }, options, (err, str) => {
            if (err) {
                reject(err)
                return
            }
            resolve(str)
        })
    })
}
// 写入文件
const writeFile = (path, content) => {
    if (fs.existsSync(path)) {
        log.error('the file already exists~')
        return
    }
    return fs.promises.writeFile(path, content)
}
// 判断是否有文件夹，没有则创建
const mkdirSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        // 不存在,判断父亲文件夹是否存在？
        if (mkdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname)
            return true
        }
    }
}
// 判断是否是正确的名称
const validateName = (appName) => {
    const validationResult = validateProjectName(appName)
    // 根据validForNewPackages字段判断是否是合法的包名
    if (!validationResult.validForNewPackages) {
        console.error(
            chalk.red(
                `Cannot create a named ${chalk.green(
                    `"${appName}"`
                )} because of npm naming restrictions:\n`
            )
        )
        // 打印错误、警告
        ;[
            ...(validationResult.errors || []),
            ...(validationResult.warnings || []),
        ].forEach((error) => {
            console.error(chalk.red(`  * ${error}`))
        })
        console.error(chalk.red('\nPlease choose a different name.'))
        // 退出进程
        process.exit(1)
    }
}
// 首字母转大写
function firstToUpper(str) {
    return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}
module.exports = {
    ejsCompile,
    writeFile,
    mkdirSync,
    validateName,
    firstToUpper
}
