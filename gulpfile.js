var gulp = require('gulp'),

  /*-- CSS --*/
  sass                = require('gulp-sass'),
  postcss             = require('gulp-postcss'),
  autoprefixer        = require('autoprefixer'),
  precss              = require('precss'),
  cssnano             = require('cssnano'),
  minify              = require('gulp-minify-css'),


  /*-- Mixed --*/
  sourcemaps          = require('gulp-sourcemaps'),
  ext_replace         = require('gulp-ext-replace'),
  concat              = require('gulp-concat'),
  es                  = require('event-stream'),
  browserSync         = require('browser-sync').create(),
  runSequence         = require('run-sequence'),
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


var config = {
  dist: './public/dist',
  lib: './public/lib',
  client: './dev/client',
  partials: ['dev/client/**/*.html', '!dev/client/index.html'],
  index: './dev/client/index.html',
  scripts: {
    src: [
      './dev/client/app/**/**/*.js',
      'test/client/jasmineBootstrap.js'
    ]
  },
  styles: {
    src: {
      scss: [
        './dev/client/assets/**/*.+(css|scss)',
        '!./dev/client/assets/styles{,.min}.+(css|scss)'
      ],
      bundle: [
        './public/lib/jasmine/lib/jasmine-core/jasmine.css',
        './public/lib/bootstrap/dist/css/bootstrap.css',
        './public/lib/font-awesome/css/font-awesome.css',
        './public/dist/assets/**/**/*.css',
        '!./public/dist/assets/styles{,.min}.css'
      ]
    },
    dest: './public/dist/assets'
  },
  html: {
    src:  './dev/client/app/**/**/**/*.html',
    dest: './public/dist'
  },
  fonts: {
    src: ['./public/lib/font-awesome/fonts/**/*'],
    dest:'./public/dist/fonts'
  },
  images: {
    src: ['./public/lib/jasmine/images/jasmine_favicon.png'],
    dest:'./public/dist/images'
  },
  bower: {
    src: [
      './public/lib/jasmine/lib/jasmine-core/json2.js',
      './public/lib/jasmine/lib/jasmine-core/jasmine.js',
      './public/lib/jasmine/lib/jasmine-core/jasmine-html.js'
    ],
    dest: './public/dist/lib'
  },
  vendor: {
    js: [
/*      './public/lib/jasmine/lib/jasmine-core/json2.js',
      './public/lib/jasmine/lib/jasmine-core/jasmine.js',
      './public/lib/jasmine/lib/jasmine-core/jasmine-html.js',*/
      './public/lib/angular/angular.js',
      './public/lib/angular-mocks/angular-mocks.js',
      './public/lib/angular-ui-router/release/angular-ui-router.js',
      './public/lib/moment/min/moment.js',
      './public/lib/tether/dist/js/tether.js',
      './public/lib/angular-animate/angular-animate.js',
      './public/lib/angular-cookies/angular-cookies.js',
      './public/lib/angular-resource/angular-resource.js',
      './public/lib/angular-route/angular-route.js',
      './public/lib/angular-sanitize/angular-sanitize.js',
      './public/lib/angular-touch/angular-touch.js',
      './public/lib/lodash/dist/lodash.js',
      './public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
    ]
  }

};



gulp.task('dist', function(done) {
  runSequence('clean', 'copy-fonts', 'copy-html', 'copy-images', 'copy-lib', 'bundle', function() {
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
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('bundle:vendor', ['bower-restore'], function () {

  var vendor = gulp.src(config.vendor.js);

  vendor
    .pipe(sourcemaps.init())
    .pipe(concat(vendorBundleName))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(config.dist));

  return vendor.pipe(concat(vendorShortName))
    .pipe(gulp.dest(config.client));
});

gulp.task('bundle:app', function () {
  var app = gulp.src(config.scripts.src)
    .pipe(angularFilesort());
  app
    .pipe(sourcemaps.init())
    .pipe(concat(mainBundleName))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(config.dist));

  return app.pipe(concat(mainShortName))
    .pipe(gulp.dest(config.client));
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
    gulp.src(config.styles.src.bundle)
    .pipe(concat('styles.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(config.styles.dest));

  return gulp.src(config.styles.src.bundle)
    .pipe(concat(mainStylesBundleName))
    .pipe(minify())
    .pipe(gulp.dest(config.styles.dest));
});


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
  return gulp.src(config.html.src, {base:'./dev/client/'})
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('copy-images', function(){
  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('copy-lib', function(){
  return gulp.src(config.bower.src)
    .pipe(gulp.dest(config.bower.dest));
});

/*gulp.task('copy-map-files', function(){
  return gulp.src(config.vendor.map)
    .pipe(gulp.dest(config.client))
    .pipe(gulp.dest(config.dist));
});*/

/*-- CLEAN --*/
gulp.task('clean', ['clean:dist', 'clean:dev']);

gulp.task('clean:dist', function () {
  return gulp.src(['./public/dist'], {read: false})
    .pipe(clean());
});

gulp.task('clean:dev', function () {
  return gulp.src(['./dev/client/*.bundle.js'], {read: false})
    .pipe(clean());
});
