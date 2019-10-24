const gulp = require('gulp');
const twig = require('gulp-twig');
const { watch } = require('gulp');

// Compile CSS
gulp.task('css', () => {
  const postcss = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');

  return gulp
    .src('src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        require('precss'),
        require('tailwindcss'),
        require('autoprefixer')
      ])
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/'));
});

// Compile Twig templates to HTML
gulp.task('templates', () => {
  return gulp.src('src/*.html')
    .pipe(twig())
    .pipe(gulp.dest('build'));
});

exports.default = function() {
  watch('src/**/*.css', gulp.task('css'));
  watch('src/**/*.html', gulp.task('templates'));
};
