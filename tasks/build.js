module.exports = function(gulp) {
    gulp.task('build', ['clean', 'run-validation', 'run-tests', 'bump-version', 'build-js']);
};