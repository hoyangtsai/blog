var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var rename = require("gulp-rename");

gulp.task('mincss', function() {
  var plugins = [
    autoprefixer({browsers: ['> 5%']}),
    cssnano()
  ];
  return gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'));
});
