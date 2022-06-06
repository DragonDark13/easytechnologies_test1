const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers

gulp.task('styles', () => {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());

});


gulp.task('clean', () => {
    return del([
        'css/*.css',
    ]);
});

gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('styles', function () {

    browserSync.init({
        server: "./"
    });
    gulp.watch('sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
    gulp.watch("index.html").on('change', browserSync.reload);
}));


gulp.task('default', gulp.series(['serve']));
