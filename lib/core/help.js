/*
 * @Author: linbin
 * @Date: 2021-10-08 14:56:21
 * @LastEditTime: 2021-10-11 11:22:51
 * @LastEditors: linbin
 * @Description: 帮助工具库
 * @FilePath: /my-cli/lib/core/help.js
 */
const { program } = require('commander')
const helpOption = () => {
    // 配置参数 program.
    program.option(
        '-d --dest <dest>',
        'a destination folder, 例如: -d src/pages, 错误/src/pages'
    )
    // 配置其他参数
    program.on('--help', function () {
        console.log('Ohter: ')
        console.log('  aaa: ')
    })
}
module.exports = helpOption
