var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    path = require('path');

module.exports = function(gulp, config) {
    gulp.task('build-js', ['clean'], function() {
        return gulp.src(config.sourceMap)
            .pipe(concat('rise.concat.js'))
            .pipe(gulp.dest('./dist'))
            .pipe(rename('rise.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify({
                mangle: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
    });
};