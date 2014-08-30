var bump = require('gulp-bump'),
    path = require('path');

module.exports = function(gulp) {
    gulp.task('bump-version', function() {
        gulp.src(path.resolve(__dirname, '../package.json'))
            .pipe(bump({
                type: 'prerelease'
                // type: 'patch'
                // type: 'minor'
                // type: 'major'
            }))
            .pipe(gulp.dest('./'));
    });
};