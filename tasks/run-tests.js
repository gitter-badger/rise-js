var mocha = require('gulp-mocha-phantomjs'),
    linker = require('gulp-linker'),
    path = require('path');

module.exports = function (gulp, config) {
    "use strict";

    gulp.task('run-tests', ['build-js'], function () {
        return gulp.src(path.resolve(__dirname, '../run-tests.html'))
            .pipe(linker({
                scripts: path.resolve(__dirname, '../tests/**/*.js'),
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: config.appRoot
            }))
            .pipe(gulp.dest('./'))
            .pipe(mocha({
                reporter: 'spec'
            }));
    });
};