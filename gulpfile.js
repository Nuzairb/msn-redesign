const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

/*

  Define task functions and export to use, e.g.:

  function defaultTask(cb) {
      cb();
  }

  exports.default = defaultTask;

  ----------------------------------------------------------------

  Run a gulp task in console:

  gulp [taskname]
  e.g. gulp message

*/

// Compile SASS and inject into browser
function style() {
    return gulp.src(['./src/scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}

function watch() {
    // Set source to run in browser
    browserSync.init({
        server: {
            baseDir: './src'
        }
    })

    // Watch changes on .scss and .html files and reload browser
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./src/*.html').on('change', browserSync.reload);

    // Watch changes on .js files
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;