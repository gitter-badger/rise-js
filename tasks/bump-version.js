"use strict";

var bump = require('gulp-bump'),
    path = require('path');

module.exports = function (gulp, config) {
    gulp.task('bump-version', function () {
        return gulp.src(path.resolve(__dirname, '../package.json'))
            .pipe(bump({
                type: config.bumpVersionType
            }))
            .pipe(gulp.dest('./'));
    });
};