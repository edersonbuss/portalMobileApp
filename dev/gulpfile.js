var gulp = require('gulp');
bower = require('bower');
concat = require('gulp-concat');
sass = require('gulp-sass');
minifyCss = require('gulp-minify-css');
sh = require('shelljs');
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
cache = require('gulp-cache'),
connect = require('gulp-connect'),
minifyHtml = require("gulp-minify-html");
util = require("gulp-util");
livereload = require("gulp-livereload");
//del = require('del');
stylish = require('jshint-stylish'),
header  = require('gulp-header'),
plumber = require('gulp-plumber'),
watch = require('gulp-watch');
package = require('./package.json');

var paths = {
  output : 'www/dist/',
  scripts : ['www/js/**/*.js'],
  sass: ['./scss/**/*.scss']
};

var banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('www/dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('www/dist/'));
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
  return gulp.src(paths.output, { read: false })
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('watch', function() {
    // corpo da tarefa 
     gulp.watch(paths.scripts, function(event) {
         gutil.log('File '+event.path+' was '+event.type+', running tasks...');
         gulp.run('default');
     });
 });

gulp.task('default', [
  'lint',
  'clean',
  'scripts'
 
]);


//gulp.task('default', ['scripts']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// //Scripts
// gulp.task('scripts', function() {
  // // corpo da tarefa 
    // return gulp
            // .src(['www/js/**/*.js'])
            // .pipe(uglify())
            // .pipe(gulp.dest('www/build/js'));   
// });
// //gulp.task('watch', function() {
// //  gulp.watch(paths.sass, ['sass']);
// //});

// gulp.task('watch', function() {
    // // corpo da tarefa 
    // gulp.watch('www/js/**/*.js', function(event) {
        // gutil.log('File '+event.path+' was '+event.type+', running tasks...');
        // gulp.run('scripts');
    // });
// });

// gulp.task('install', ['git-check'], function() {
  // return bower.commands.install()
    // .on('log', function(data) {
      // gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    // });
// });

// gulp.task('git-check', function(done) {
  // if (!sh.which('git')) {
    // console.log(
      // '  ' + gutil.colors.red('Git is not installed.'),
      // '\n  Git, the version control system, is required to download Ionic.',
      // '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      // '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    // );
    // process.exit(1);
  // }
  // done();
// });
