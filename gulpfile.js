const gulp = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const changed = require("gulp-changed");

///////////////
// - SCSS/CSS
///////////////

const SCSS_SRC = "./src/assets/scss/**/*.scss";
const SCSS_DEST = "./src/assets/css";

function compile_scss() {
  return gulp
    .src(SCSS_SRC)
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
}

function watch_scss() {
  gulp.watch(SCSS_SRC, compile_scss);
}

// Run tasks
// gulp.task('default', ['watch_scss']);
gulp.task("default", watch_scss);

exports.compile_scss = compile_scss;
exports.watch_scss = watch_scss;
