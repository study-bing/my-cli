/*
 * @Author: linbin
 * @Date: 2021-10-08 17:06:04
 * @LastEditTime: 2021-10-11 11:26:28
 * @LastEditors: linbin
 * @Description: 终端相关命令
 * @FilePath: /my-cli/lib/utils/terminal.js
 */
const { spawn, exec } = require('child_process')

const spawnCommand = (...args) => {
    return new Promise((resole, reject) => {
        const childProcess = spawn(...args)
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)
        childProcess.on('close', () => {
            resole()
        })
    })
}

const execCommand = (...args) => {
    return new Promise((resolve, reject) => {
        exec(...args, (err, stdout, stderr) => {
            if (err) {
                reject(err)
                return
            }
            console.log(stdout.replace('\n', ''))
            // console.log(stderr);
            resolve()
        })
    })
}

module.exports = {
    spawn: spawnCommand,
    exec: execCommand,
}
