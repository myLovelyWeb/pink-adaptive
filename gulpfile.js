'use strict';

const autoprefixer = require('autoprefixer');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const include = require('posthtml-include');
const minify = require('gulp-csso');
const mqpacker = require("css-mqpacker");
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const server = require('browser-sync').create();
const smartgrid = require('smart-grid');
const sourcemaps = require('gulp-sourcemaps');
const svgstore = require('gulp-svgstore');
const uglify = require('gulp-uglify-es').default;
const webp = require('gulp-webp');

const isDev = process.argv.includes('--dev');

gulp.task('clean', function() {
  return del('docs');
});

gulp.task('copy', function() {
  return gulp.src([
    'source/*.html',
    'source/fonts/**/*.{woff,woff2}',
    'source/libs/**'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('docs'));
});

gulp.task('copy:images', function() {
  return gulp.src([
    'source/blocks/**/*.{jpg,png,svg}',
  ])
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('docs/img'));
});

gulp.task('html', function() {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs'))
    .pipe(server.stream());
});

gulp.task('images', function() {
  return gulp.src('source/blocks/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo({
        plugins: [
          {inlineStyles: false},
          {collapseGroups: false}
        ]
      })
    ]))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('docs/img'));
});

gulp.task('javascript', function () {
  return gulp.src('source/js/*.js')
    .pipe(gulp.dest('docs/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('docs/js'));
});

gulp.task('serve', function() {
  server.init({
    server: 'docs',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('source/blocks/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('source/*.html', gulp.series('html'));
  gulp.watch('./smartgrid.js', gulp.series('grid'));
  gulp.watch('source/blocks/**/icon-*.svg', gulp.series("svg:sprite", "html"));

});

gulp.task('style', function() {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(gulpif(isDev, sourcemaps.init({loadMaps: true})))
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer('> 0.2%'),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest('docs/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/css'))
    .pipe(server.stream());
});

gulp.task('svg:sprite', function() {
  return gulp.src([
    'source/blocks/adaptive-logo/adaptive-logo-*.svg',
    'source/blocks/**/icon-*.svg'
    ])
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('docs/img'));
});

gulp.task('webp', function() {
  return gulp.src('source/blocks/**/*.{png,jpg}')
    .pipe(rename({dirname: ''}))
    .pipe(webp({quality: 75}))
    .pipe(gulp.dest('docs/img'));
});

gulp.task('grid', function(done) {
  delete require.cache[require.resolve('./smartgrid.js')];
  let settings = require('./smartgrid.js');

  smartgrid('source/sass/grid', settings);
  done();
});

gulp.task('build', gulp.series('clean', 'copy', 'copy:images', 'images',
                               'svg:sprite', 'webp', 'html', 'grid', 'style',
                               'javascript'));
gulp.task('start', gulp.series('build', 'serve'));

