/*
 * @Author: linbin
 * @Date: 2021-10-11 10:45:33
 * @LastEditTime: 2021-10-11 10:45:34
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /my-cli/babel.config.js
 */
const presets = [
    [
        '@babel/env',
        {
            targets: {
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '11.1',
            },
        },
    ],
]
//暴露
module.exports = { presets }
