var gulp = require('gulp'),
  config = require('./gulp-config'),

  /*-- CSS --*/
  sass                = require('gulp-sass'),
  postcss             = require('gulp-postcss'),
  autoprefixer        = require('autoprefixer'),
  precss              = require('precss'),
  cssnano             = require('cssnano'),
  minify              = require('gulp-minify-css'),


  /*-- Mixed --*/
  _                   = require('lodash'),
  sourcemaps          = require('gulp-sourcemaps'),
  ext_replace         = require('gulp-ext-replace'),
  concat              = require('gulp-concat'),
  es                  = require('event-stream'),
  browserSync         = require('browser-sync').create(),
  runSequence         = require('run-sequence'),
  shell               = require('gulp-shell'),
  // sanity
  clean               = require('gulp-clean'),
  // dependencies management
  bower               = require('gulp-bower'),


  /*-- Images --*/
  imagemin            = require('gulp-imagemin'),


  /*-- JS & TS --*/
  uglify              = require('gulp-uglify'),
  rename              = require('gulp-rename'),

  angularFilesort     = require('gulp-angular-filesort'),

  typescript          = require('gulp-typescript'),



  /*-- Bundling --*/
  htmlreplace         = require('gulp-html-replace'),

  bundleHash          = new Date().getTime(),
  mainBundleName      = bundleHash + '.main.bundle.js',
  mainShortName       = 'main.bundle.js',
  vendorBundleName    = bundleHash + '.vendor.bundle.js',
  vendorShortName     = 'vendor.bundle.js',
  mainStylesBundleName= bundleHash + '.styles.min.css'
;

gulp.task('default', ['serve']);
gulp.task('shell', shell.task(['lite-server']));

gulp.task('dist', function(done) {
  runSequence('clean', 'copy-fonts', 'copy-html', 'copy-images', 'copy-lib', 'bundle', function() {
    done();
  });
});

gulp.task('serve', function(done) {
  runSequence('clean:dev', 'copy-fonts', 'copy-lib', 'bundle:css:dev', 'bundle:vendor:dev', 'bundle:app:dev', 'watch', 'shell', function() {
    done();
  });
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

var tasks = {
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
                .pipe(sourcemaps.write('maps/'))
                .pipe(gulp.dest(config.dist))
  },
  bundle_app: {
    dev:      (app) =>  app.pipe(concat(mainShortName))
                          .pipe(gulp.dest(config.dist)),
    dist:     (app) =>  app.pipe(sourcemaps.init())
                          .pipe(concat(mainBundleName))
                          .pipe(sourcemaps.write('maps/'))
                          .pipe(gulp.dest(config.dist))
  }
};

gulp.task('bundle:vendor', ['bundle:vendor:dev', 'bundle:vendor:dist']);

gulp.task('bundle:vendor:dev', ['bower-restore'], function () {
  var vendor = gulp.src(config.vendor.js);
    return tasks.bundle_vendor.dev(vendor);
});
gulp.task('bundle:vendor:dist', ['bower-restore'], function () {
  var vendor = gulp.src(config.vendor.js);
    return tasks.bundle_vendor.dist(vendor);
});

gulp.task('bundle:app', ['bundle:app:dev', 'bundle:app:dist']);

gulp.task('bundle:app:dev', function () {
  var app = gulp.src(config.scripts.src)
    .pipe(angularFilesort());

  return tasks.bundle_app.dev(app);
});
gulp.task('bundle:app:dist', function () {
  var app = gulp.src(config.scripts.src)
    .pipe(angularFilesort());

  return tasks.bundle_app.dist(app);
});


gulp.task('build:css', function() {
/*  var css = gulp.src(config.styles.src.css)
    .pipe(sourcemaps.init());*/

  return scss = gulp.src(config.styles.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([precss, autoprefixer, cssnano]))
    .pipe(sourcemaps.write())
    .pipe(ext_replace('.css'))
    .pipe(gulp.dest(config.styles.dest));
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

gulp.task('watch', ['watch:styles', 'watch:html', 'watch:vendors', 'watch:scripts']);


/*-- RESTORE MISSING BOWER COMPONENTS --*/
gulp.task('bower-restore', function () {
  return bower();
});

/*-- COPY --*/
gulp.task('copy-fonts', function(){
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('copy-html', function(){
  return gulp.src(config.html.src, {base: config.devClient})
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('copy-images', function(){
  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('copy-lib', function(){
  return gulp.src(config.jasmine.src)
    .pipe(gulp.dest(config.jasmine.dest));
});

/*gulp.task('copy-map-files', function(){
  return gulp.src(config.vendor.map)
    .pipe(gulp.dest(config.dist));
});*/

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
