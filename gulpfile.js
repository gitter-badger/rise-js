(function () {
    "use strict";

    var fs = require('fs'),
        path = require('path'),
        gulp = require('gulp'),
        extend = require('extend'),
        requireAll = require('require-all'),

        configLocation = path.resolve(__dirname, 'tasks/config.json'),
        config = extend({
            port: 3000,
            livereload: true,
            appRoot: '/usr/docs/rise-js/',
            sourceMap: [
                //"src/**/*.ts"
                //"src/Rise.ts",
                //"src/util/Util.ts",
                //"src/util/Color.ts",
                //"src/util/Shadow.ts"
                //"src/util/**/*.ts",
                //"src/ElementFactory.ts",
                //"src/element/BasicElement.ts",
                //"src/element/**/*.ts"
                //"src/extension/Extension.ts",
                //"src/extension/**/*.ts",
                //"src/**/*.ts"
            ].map(function (item) {
                    return path.resolve(__dirname, item);
                })
        }, fs.existsSync(configLocation) ? require(configLocation) : {}),

        tasks = requireAll({
            dirname: path.resolve(__dirname, 'tasks'),
            filter: /(.+)\.js$/,
            excludeDirs: /^\.(git|svn)$/
        });

    Object.keys(tasks).forEach(function (key) {
        tasks[key](gulp, config);
    });
}());
