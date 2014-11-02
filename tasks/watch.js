(function () {
    "use strict";

    module.exports = function (gulp, config) {
        gulp.task('watch', function () {
            gulp.watch(config.sourceMap, ['build-js']);
        });
    };
}());