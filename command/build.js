/**
 * @file 命令init
 * @author zhangjingyuan
 */
'use strict';
const co = require('co');
const chalk = require('chalk');
const fs = require('fs');
const archiver = require('archiver');
const config = require('../widgetInfo');

let archive = archiver('zip');

module.exports = () => {
    co(function* () {
        let assetsDir = fs.readdirSync(__dirname + '/../src/assets');
        console.log(assetsDir);
        if (assetsDir) {
            if (assetsDir.indexOf('.DS_Store') !== -1) {
                assetsDir.shift();
            }
            config.mola.src.assets = assetsDir;
        }
        fs.writeFileSync(__dirname + '/../widgetInfo.json', JSON.stringify(config), 'utf-8');
        let widgetName = config.mola.name;
        let output = fs.createWriteStream(__dirname + `/../${widgetName}.zip`);
        // zip包输出完毕事件处理
        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log(chalk.green('archiver has been finalized and the output file descriptor has closed.'));
        });
        // 将zip包里的东西输出到这个文件里
        archive.pipe(output);

        archive.directory(__dirname + '/../src/', './../');
        archive.file(__dirname + '/../widgetInfo.json', {name: 'widgetInfo.json'});
        // finalize the archive (ie we are done appending files but streams have to finish yet)
        archive.finalize();

    });

};
