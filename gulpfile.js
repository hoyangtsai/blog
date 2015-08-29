'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

gulp.task('less', function() {
  gulp.src(['less/*.less', '!less/mixins.less'])
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('index', function(){
  gulp.src('index.html')
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen({start: true});
  gulp.watch(['less/*.less', 'index.html'], ['less', 'index']);
});

gulp.task('default', ['watch']);