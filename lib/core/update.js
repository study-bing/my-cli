/*
 * @Author: linbin
 * @Date: 2022-01-27 10:34:39
 * @LastEditTime: 2022-01-27 10:36:34
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /my-cli/lib/core/update.js
 */
const { program } = require('commander')
// 引用 update-notifier 库，用于检查更新
const updateNotifier = require('update-notifier')
// 引用 chalk 库，用于控制台字符样式
// 引入 package.json 文件，用于 update-notifier 库读取相关信息
const pkg = require('../../package.json')

const log = require('../utils/log')
// updateNotifier 是 update-notifier 的方法，其他方法可到 npmjs 查看
const notifier = updateNotifier({
	// 从 package.json 获取 name 和 version 进行查询
	pkg,
	// 设定检查更新周期，默认为 1000 * 60 * 60 * 24（1 天）
	// 这里设定为 1000 毫秒（1秒）
	updateCheckInterval: 1000
})

function updateFn() {
	// 当检测到版本时，notifier.update 会返回 Object
	// 此时可以用 notifier.update.latest 获取最新版本号
	if (notifier.update) {
		console.log(`New version available: ${log.cyan(notifier.update.latest)}, it's recommended that you update before using.`)
		notifier.notify()
	} else {
		console.log('No new version is available.')
	}
}

const updateChk = () => {
	// 检查更新
	program
		// 声明的命令
		.command('upgrade')
		// 描述信息，在帮助信息时显示
		.description('Check the coder-bing-cli version.')
		.action(() => {
			updateFn()
		})
}
module.exports = updateChk
