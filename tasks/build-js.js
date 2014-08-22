var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    path = require('path');

module.exports = function(gulp) {
    gulp.task('build-js', function() {
        gulp.src([
            path.resolve(__dirname, '../src/Rise.js'),
            path.resolve(__dirname, '../src/util/Class.js'),
            path.resolve(__dirname, '../src/util/**/*.js'),
            path.resolve(__dirname, '../src/**/*.js')
        ])
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