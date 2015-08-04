'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', ['build', 'watch']);

gulp.task('build', ['scripts', 'sass']);

gulp.task('scripts', function () {
    browserify('./src/public/js/app.js', { debug: true })
        .add(require.resolve('babel/polyfill'))
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/public/js/dist/'));
});

gulp.task('sass', function () {
    gulp.src('src/public/css/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('src/public/css/dist/'));
});


gulp.task('watch', function () {
    gulp.watch('src/public/js/*.js', ['scripts']);
    gulp.watch('src/public/css/*.css', ['sass']);
});
