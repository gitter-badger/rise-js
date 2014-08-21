module.exports = function(gulp) {
    gulp.task('build', ['run-validation', 'run-tests', 'bump-version', 'build-js']);
};