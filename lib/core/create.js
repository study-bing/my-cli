/*
 * @Author: linbin
 * @Date: 2021-10-08 15:19:40
 * @LastEditTime: 2021-10-11 13:51:07
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /my-cli/lib/core/create.js
 */
const { program } = require('commander')
const { createProject, addComponent, addPage, addStore } = require('./actions')
const options = program.opts()
const createCommands = () => {
    // 配置参数 program.
    program
        .command('create <project> [otherArgs...]')
        .description('clone a repository into a newly created directory')
        .action(createProject)
    // 创建组件.
    program
        .command('addcpn <name>')
        .description(
            'add vue component, 例如: coderwhy addcpn NavBar [-d src/components]'
        )
        .action((name) => addComponent(name, program.dest || 'src/components'))
    // 创建页面
    program
        .command('addpage <name>')
        .description('add vue page, 例如: coderwhy addpage Home [-d dest]')
        .action((name) => {
            addPage(name, program.dest || `src/pages/${name.toLowerCase()}`)
        })
    // 创建store
    program
        .command('addstore <name>')
        .description('add vue store, 例如: coderwhy addstore favor [-d dest]')
        .action((name) => {
            addStore(
                name,
                program.dest || `src/store/modules/${name.toLowerCase()}`
            )
        })
}
module.exports = createCommands
