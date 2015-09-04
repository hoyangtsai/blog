'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

gulp.task('less', function() {
  gulp.src(['less/*.less', '!less/mixins.less'])
    .pipe(less())
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watchindex', function(){
  gulp.src('index.html')
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen({ start: true });
  gulp.watch('less/*.less', ['less']);
  gulp.watch('index.html', ['watchindex']);
});

gulp.task('default', ['watch']);

gulp.task('publish', function() {
  gulp.src(['less/*.less', '!less/mixins.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('css'))
});