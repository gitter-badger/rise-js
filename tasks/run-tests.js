(function () {
    "use strict";

    var mocha = require('gulp-mocha-phantomjs'),
        linker = require('gulp-linker'),
        path = require('path');

    module.exports = function (gulp, config) {
        gulp.task('run-tests', function () {
            return gulp.src(path.resolve(__dirname, '../tests/index.html'))
                .pipe(linker({
                    scripts: path.resolve(__dirname, '../tests/**/*.js'),
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<!--suppress HtmlUnknownTarget --><script src="%s"></script>',
                    appRoot: config.appRoot
                }))
                .pipe(gulp.dest('./tests/'))
                .pipe(mocha({
                    reporter: 'spec'
                }));
        });
    };
}());
