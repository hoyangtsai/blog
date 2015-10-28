var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var less = require('gulp-less');
var livereload = require('gulp-livereload');

gulp.task('less', function() {
  gulp.src(['less/*.less', '!less/mixins.less'])
    .pipe(plugins.sourcemaps.init())
    .pipe(less())
    .on('error', plugins.notify.onError("Error: <%= error.message %>"))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.sourcemaps.write('./maps'))
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