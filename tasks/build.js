module.exports = function (gulp) {
    "use strict";

    gulp.task('build', ['clean', 'run-validation', 'run-tests', 'bump-version', 'build-js']);
};