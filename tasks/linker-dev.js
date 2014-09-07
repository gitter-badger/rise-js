var linker = require('gulp-linker'),
    path = require('path');

module.exports = function(gulp, config) {
    gulp.task('linker-dev', function() {
        return gulp.src(path.resolve(__dirname, '../index.html'))
            .pipe(linker({
                scripts: config.sourceMap.map(function(item) {
                    return path.resolve(__dirname, item);
                }),
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: config.appRoot
            }))
            .pipe(gulp.dest('./'));
    });
};