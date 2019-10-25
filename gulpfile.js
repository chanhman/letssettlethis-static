const gulp = require('gulp');
const twig = require('gulp-twig');
const browserSync = require('browser-sync').create();
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
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

// Compile Twig templates to HTML
gulp.task('templates', () => {
  return gulp
    .src('src/*.html')
    .pipe(twig())
    .pipe(gulp.dest('build'));
});

// Move images
gulp.task('images', () => {
  return gulp.src('src/img/**.*').pipe(gulp.dest('build/img'));
});

exports.default = function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  watch('src/img/**.*', gulp.task('images'));
  watch('src/css/**/*.css', gulp.task('css'));
  watch('src/**/*.html', gulp.task('templates')).on(
    'change',
    browserSync.reload
  );
};
