import gulp             from 'gulp';
import config           from './gulp-config';

/*-- CSS --*/
import sass             from 'gulp-sass';
import postcss          from 'gulp-postcss';
import autoprefixer     from 'autoprefixer';
import precss           from 'precss';
import cssnano          from 'cssnano';
import minify           from 'gulp-minify-css';

/*-- Mixed --*/
import _                from 'lodash';
import sourcemaps       from 'gulp-sourcemaps';
import ext_replace      from 'gulp-ext-replace';
import concat           from 'gulp-concat';
import es               from 'event-stream';
import bs               from 'browser-sync';
let    browserSync  = bs.create();

import runSequence      from 'run-sequence';
import shell            from 'gulp-shell';
// sanity
import clean            from 'gulp-clean';
// dependencies management
import bower            from 'gulp-bower';


/*-- Images --*/
import imagemin     from 'gulp-imagemin';


  /*-- JS & TS --*/
import babel            from 'gulp-babel';
import uglify           from 'gulp-uglify';
import rename           from 'gulp-rename';

import angularFilesort  from 'gulp-angular-filesort';
import ngAnnotate       from 'gulp-ng-annotate';

import typescript       from 'gulp-typescript';



  /*-- Bundling --*/
import htmlreplace      from 'gulp-html-replace';

import moment           from 'moment';

let bundleHash        = moment(new Date().getTime()).format('YYYY-MM-DD-HH-mm-ss'),
  mainBundleName      = bundleHash + '.main.bundle.js',
  mainShortName       = 'main.bundle.js',
  vendorBundleName    = bundleHash + '.vendor.bundle.js',
  vendorShortName     = 'vendor.bundle.js',
  mainStylesBundleName= bundleHash + '.styles.min.css'
;

gulp.task('default', ['serve']);
gulp.task('shell', shell.task(['lite-server']));
gulp.task('serve:dev', ['watch', 'shell']);

gulp.task('dist', function(callback) {
  runSequence('clean', 'copy_images', 'copy_maps', 'copy_fonts', 'copy_lib', 'copy_html', 'bundle', callback);
});

gulp.task('serve', function(callback) {
  runSequence('clean:dev', 'copy_images', 'copy_maps', 'copy_fonts', 'copy_lib', 'bundle:css:dev', 'bundle:vendor:dev', 'bundle:app:dev', 'watch', 'shell', callback);
});

gulp.task('bundle', ['bundle:vendor', 'bundle:app', 'bundle:css'], function () {
  return gulp.src('dev/client/index.html')
    .pipe(htmlreplace({
      'app': mainBundleName,
      'vendor': vendorBundleName,
      'css': 'assets/' + mainStylesBundleName
    }))
    .pipe(gulp.dest(config.dist));
});

let tasks = {
  bundle_css: {
    dev:      () => gulp.src(config.styles.src.bundle)
                      .pipe(concat('styles.css'))
                      .pipe(gulp.dest(config.styles.dest)),
    dist:     () => gulp.src(config.styles.src.bundle)
                      .pipe(concat(mainStylesBundleName))
                      .pipe(minify())
                      .pipe(gulp.dest(config.styles.dest))
  },
  bundle_vendor: {
    dev:      (vendor) => vendor.pipe(concat(vendorShortName))
                .pipe(gulp.dest(config.dist)),
    dist:     (vendor) => vendor
                .pipe(sourcemaps.init())
                .pipe(concat(vendorBundleName))
                .pipe(uglify({ mangle: false }))
                .pipe(sourcemaps.write('maps/'))
                .pipe(gulp.dest(config.dist))
  },
  bundle_app: {
    dev:      (app) =>  app.pipe(concat(mainShortName))
                          .pipe(gulp.dest(config.dist)),
    dist:     (app) =>  app.pipe(sourcemaps.init())
                          .pipe(concat(mainBundleName))
                          .pipe(uglify({ mangle: false })) // review appSpec for mangle
                          .pipe(sourcemaps.write('maps/'))
                          .pipe(gulp.dest(config.dist))
  },
  build_css:            function(src, srcmaps, dest){
    srcmaps = srcmaps || null;
    return gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([precss, autoprefixer, cssnano]))
      .pipe(sourcemaps.write(srcmaps))
      .pipe(ext_replace('.css'))
      .pipe(gulp.dest(dest));
  }
};

gulp.task('bundle:vendor', ['bundle:vendor:dev', 'bundle:vendor:dist']);

gulp.task('bundle:vendor:dev', ['bower_restore'], function () {
  var vendor = gulp.src(config.vendor.js);
    return tasks.bundle_vendor.dev(vendor);
});
gulp.task('bundle:vendor:dist', ['bower_restore'], function () {
  var vendor = gulp.src(config.vendor.js);
    return tasks.bundle_vendor.dist(vendor);
});

gulp.task('bundle:app', ['bundle:app:dev', 'bundle:app:dist']);

gulp.task('bundle:app:dev', function () {
  var app = gulp.src(config.scripts.src)
    .pipe(babel())
    .pipe(angularFilesort())
    .pipe(ngAnnotate());

  return tasks.bundle_app.dev(app);
});
gulp.task('bundle:app:dist', function () {
  var app = gulp.src(config.scripts.src)
    .pipe(babel())
    .pipe(angularFilesort())
    .pipe(ngAnnotate());

  return tasks.bundle_app.dist(app);
});


gulp.task('build:css', function () {
  return tasks.build_css(config.styles.src.scss, null, config.styles.dest);
});

gulp.task('bundle:css', ['build:css'], function() {
  tasks.bundle_css.dev();
  return tasks.bundle_css.dist();
});

gulp.task('bundle:css:dev', ['build:css'], function() {
  return tasks.bundle_css.dev();
});
gulp.task('bundle:css:dist', ['build:css'], function() {
  return tasks.bundle_css.dist();
});

/*-- WATCHERS --*/
gulp.task('watch:styles', function () {
  return gulp.watch(config.styles.src.scss, ['bundle:css:dev']);
});

gulp.task('watch:html', function () {
  return gulp.watch(config.html.src);
});

gulp.task('watch:vendors', function () {
  return gulp.watch(config.vendor.watch, ['bundle:vendor:dev']);
});

gulp.task('watch:scripts', function () {
  return gulp.watch(config.scripts.watch, ['bundle:app:dev']);
});

gulp.task('watch:images', function () {
  return gulp.watch(config.images.src, ['copy_images']);
});

gulp.task('watch', ['watch:images', 'watch:html', 'watch:styles', 'watch:vendors', 'watch:scripts']);


/*-- RESTORE MISSING BOWER COMPONENTS --*/
gulp.task('bower_restore', function () {
  return bower();
});

/*-- COPY --*/
gulp.task('copy_fonts', function(){
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('copy_html', function(){
  return gulp.src(config.html.src, {base: config.clientDir})
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('copy_images', function(){
  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('copy_maps', function(){
  gulp.src('./node_modules/socket.io-client/socket.io.js.map')
    .pipe(rename({basename: 'socket.io.min.1.5.0.js'}))
    .pipe(gulp.dest(config.maps.dest));

  return gulp.src(config.maps.src)
    .pipe(gulp.dest(config.maps.dest));
});

gulp.task('copy_lib', function(){
  return gulp.src(config.jasmine.src)
    .pipe(gulp.dest(config.jasmine.dest));
});

/*-- CLEANERS --*/
gulp.task('clean', ['clean:dist']);

gulp.task('clean:dist', function () {
  return gulp.src([config.dist], {read: false})
    .pipe(clean());
});

gulp.task('clean:styles', function () {
  return gulp.src([
    config.styles.dest +'styles.css'
  ], {read: false})
    .pipe(clean());
});

gulp.task('clean:vendor', function () {
  return gulp.src([
    config.scripts.dest + vendorShortName
  ], {read: false})
    .pipe(clean());
});

gulp.task('clean:scripts', function () {
  return gulp.src([
    config.scripts.dest + mainShortName
  ], {read: false})
    .pipe(clean());
});

gulp.task('clean:dev', ['clean:styles', 'clean:vendor', 'clean:scripts']);
