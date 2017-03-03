/**
 * @file 命令init
 * @author zhangjingyuan
 */
'use strict';
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const fs = require('fs');
const config = require('../widgetInfo');

// 将组件名首字母大写
function getWidgetName(name) {
    let nameArr = name.split('');
    nameArr[0] = nameArr[0].toUpperCase();
    return nameArr.join('');
}

module.exports = () => {
    co(function* () {
        // 分步接收用户输入的参数
        let widgetName = yield prompt('Widget name: ');
        let widgetNameCN = yield prompt('Widget Chinese name: ');
        let widgetVersion = yield prompt('Widget version: ');
        let widgetCategory = yield prompt('Widget category: ');
        let widgetDescription = yield prompt('Widget description: ');

        widgetName = getWidgetName(widgetName);
        config.mola = {};
        config.mola.name = widgetName;
        config.mola.nameCN = widgetNameCN;
        config.mola.version = widgetVersion;
        config.mola.category = widgetCategory;
        config.mola.description = widgetDescription;
        config.mola.src = {};

        // writeFileSync 没有回调
        fs.writeFileSync(__dirname + `/../src/${widgetName}.js`, '', 'utf-8');
        config.mola.src.js = `${widgetName}.js`;

        fs.writeFileSync(__dirname + `/../src/${widgetName}.schema.js`, '', 'utf-8');
        config.mola.src.schema = `${widgetName}.schema.js`;

        fs.writeFileSync(__dirname + `/../src/${widgetName}.css`, '', 'utf-8');
        config.mola.src.css = `${widgetName}.css`;

        // 把模板信息写入widgetInfo.json
        fs.writeFile(__dirname + '/../widgetInfo.json', JSON.stringify(config), 'utf-8', err => {
            if (err) {
                console.log(err);
            }
            console.log(chalk.green('Init a new widget info!\n'));
            console.log(chalk.grey('The widget info is: \n'));
            console.log(config);
            console.log('\n');
            process.exit();
        });
    });

};
