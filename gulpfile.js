var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var pump = require('pump');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('minify-css',function(cb){
  console.log('========> Minificando SCSS...');
  pump([
    gulp.src("./src/*.scss"),
    sass(),
    cssmin(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./build/css')
    ],
    cb
    );
});

gulp.task('minify-js', function (cb) {
  console.log('========> Minificando JS...');
  pump([
    gulp.src('./src/*.js'),
    uglify(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./build/js')
    ],
    cb
    );
});

gulp.task('pwaify', function (cb) {
  console.log('========> Minificando JS...');
  pump(
    [
      gulp.src('./service-worker.js'),
      uglify(),
      gulp.dest('./build'),
      gulp.src('./manifest.json'),
      gulp.dest('./build'),
    ],
    cb
    );
});

gulp.task('minify-html', function (cb) {
  console.log('========> Minificando HTML...');
  pump([
    gulp.src('./src/*.html'),
    htmlmin({collapseWhitespace: true}),
    gulp.dest('./build')
    ],
    cb
    );
});

gulp.task('copy-assets', function() {
  gulp
    .src(["./assets/**/*"])
    .pipe(
      gulp.dest("./build/assets/")
    );
});

gulp.task('clean', function() {
  return del([
    './build/'
  ]);
});

gulp.task('build', function() {
  runSequence(
    'clean',
    [
      'minify-html',
      'minify-js',
      'minify-css',
      'copy-assets',
      'pwaify'
    ]
  );
});

gulp.task('default', function(){
  gulp.watch('./src/*.scss',['minify-css']);
  gulp.watch('./src/*.js',['minify-js']);
  gulp.watch('./src/*.html',['minify-html']);
});
