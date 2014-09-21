"use strict";

var livereload = require('gulp-livereload'),
    path = require('path');

module.exports = function (gulp) {
    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch([
            path.resolve(__dirname, '../src/**/*.js'),
            path.resolve(__dirname, '../index.html')
        ]).on('change', livereload.changed);
    });
};