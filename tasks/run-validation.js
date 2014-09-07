var jshint = require('gulp-jshint'),
    path = require('path');

module.exports = function(gulp, config) {
    gulp.task('run-validation', function() {
        return gulp.src(path.resolve(__dirname, '../src/**/*.js'))
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });
};