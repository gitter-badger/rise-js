var linker = require('gulp-linker'),
    path = require('path');

module.exports = function(gulp) {
    gulp.task('linker-dev', function() {
        gulp.src(path.resolve(__dirname, '../index.html'))
            .pipe(linker({
                scripts: [
                    path.resolve(__dirname, '../src/Rise.js'),
                    path.resolve(__dirname, '../src/util/Util.js'),
                    path.resolve(__dirname, '../src/util/**/*.js'),
                    path.resolve(__dirname, '../src/**/*.js')
                ],
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '/var/www/rise-js/'
            }))
            .pipe(gulp.dest('./'));
    });
};