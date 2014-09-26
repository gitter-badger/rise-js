(function () {
    "use strict";

    var webserver = require('gulp-webserver'),
        path = require('path');

    module.exports = function (gulp, config) {
        gulp.task('webserver', ['linker-dev'], function () {
            return gulp.src(path.resolve(__dirname, '../'))
                .pipe(webserver({
                    port: config.port,
                    livereload: config.livereload
                }));
        });
    };
}());