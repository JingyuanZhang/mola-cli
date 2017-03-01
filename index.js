#!/usr/bin/env node

/**
 * @file 主入口
 * @author zhangjingyuan
 */
'use strict';

console.log('mola-cli success');
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/';
const program = require('commander');
// 定义当前版本
program.version(require('./package').version);

// 定义使用方法
program.usage('<command>');

// 定义初始化init命令
program
    .command('init')
    .description('Init a new widget template')
    .alias('i')
    .action(() => {
        console.log('init action');
        require('./command/init')();
    });


// 定义构建组件包的build命令
program
    .command('build')
    .description('Archieve the widget zip')
    .alias('b')
    .action(() => {
        console.log('build action');
        require('./command/build')();
    });

// 定义测试test命令
program
    .command('test')
    .description('Test whether the widget run correctly')
    .alias('t')
    .action(() => {
        require('./command/test')();
    });

program.parse(process.argv);
if (!program.args.length) {
    program.help();
}
