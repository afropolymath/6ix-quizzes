// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var runSequence = require('run-sequence');

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/static/webapp/**/*.js', '!./app/static/webapp/lib/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jade', function () {
  gulp.src(['./app/static/webapp/**/*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('./app/static/dist/'))
})

gulp.task('clean', function() {
    gulp.src('./app/static/dist/js/bundled.js')
      .pipe(clean({force: true}));
    gulp.src('./app/static/dist/*')
      .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/static/webapp/**/*.css', '!./app/static/webapp/lib/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./app/static/dist/'));
});

gulp.task('minify-js', function() {
  gulp.src(['./app/static/webapp/**/*.js', '!./app/static/webapp/lib/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app/static.js.map"
    }))
    .pipe(gulp.dest('./app/static/dist/'));
});

gulp.task('copy-bower-components', function () {
  gulp.src('./app/static/webapp/lib/**')
    .pipe(gulp.dest('app/static/dist/lib'));
});

// gulp.task('copy-html-files', function () {
//   gulp.src('./app/static/webapp/**/*.html')
//     .pipe(gulp.dest('app/static/dist/'));
// });

gulp.task('connect', function () {
  connect.server({
    root: 'app/static/',
    port: 8888
  });
});

gulp.task('browserify', function() {
  gulp.src(['app/static/webapp/js/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./app/static/dist/js'));
});

// *** default task *** //
gulp.task('default', function() {
  runSequence(
    ['clean'],
    ['lint', 'browserify', 'connect']
  );
});

// *** build task *** //
gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['jade', 'copy-bower-components', 'minify-css', 'browserify']
  );
});

// *** dev task *** //
gulp.task('dev', function() {
  gulp.watch(['./app/static/webapp/**/*.css', '!./app/static/webapp/lib/**'], ['minify-css']);
  gulp.watch(['./app/static/webapp/**/*.js', '!./app/static/webapp/lib/**'], ['browserify']);
  gulp.watch('./app/static/webapp/**/*.jade', ['jade']);
});

// *** build without lint task *** //
gulp.task('simple-build', function() {
  runSequence(
    ['jade', 'copy-bower-components', 'minify-css', 'browserify']
  );
});
