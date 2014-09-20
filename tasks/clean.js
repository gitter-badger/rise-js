var del = require('del'),
    path = require('path');

module.exports = function (gulp) {
    "use strict";

    gulp.task('clean', function (done) {
        del([
            path.resolve(__dirname, '../dist/*.*')
        ], done);
    });
};