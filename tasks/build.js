module.exports = function(gulp, config) {
    gulp.task('build', ['clean', 'run-validation', 'run-tests', 'bump-version', 'build-js']);
};