(function () {
    "use strict";

    var concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        tsc = require('gulp-tsc');

    module.exports = function (gulp, config) {
        gulp.task('build-js', ['clean'], function () {
            return gulp.src(config.sourceMap)
                .pipe(sourcemaps.init())
                .pipe(tsc({
                    target: "ES5"
                }))
                .pipe(concat('rise.min.js'))
                .pipe(uglify())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./dist'));
        });
    };
}());
