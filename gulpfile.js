var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    extend = require('extend'),

    configLocation = path.resolve(__dirname, 'tasks/local.json'),
    config = extend({
        appRoot: '/var/www/rise-js/',
        bumpVersionType: 'prerelease',
        sourceMap: [
            "src/Rise.js",
            "src/util/Util.js",
            "src/util/**/*.js",
            "src/Element.js",
            "src/element/**/*.js",
            "src/**/*.js"
        ].map(function(item) {
            return path.resolve(__dirname, item);
        })
    }, fs.existsSync(configLocation) ? require(configLocation) : {}),

    tasks = require('require-all')({
        dirname: path.resolve(__dirname, 'tasks'),
        filter: /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/
    });

Object.keys(tasks).forEach(function(key) {
    tasks[key](gulp, config);
});