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


  /*-- Images --*/
  imagemin            = require('gulp-imagemin'),


  /*-- JS & TS --*/
  uglify              = require('gulp-uglify'),
  rename              = require('gulp-rename'),

  typescript          = require('gulp-typescript'),



  /*-- Bundling --*/
  htmlreplace         = require('gulp-html-replace'),

  bundleHash          = new Date().getTime(),
  mainBundleName      = bundleHash + '.main.bundle.js',
  vendorBundleName    = bundleHash + '.vendor.bundle.js',
  mainStylesBundleName= bundleHash + '.styles.min.css'
;

gulp.task('dist', function(done) {
  runSequence('clean', 'bundle', function() {
    done();
  });
});

gulp.task('bundle', ['bundle:vendor', 'bundle:app', 'bundle:css'], function () {
  return gulp.src('dev/client/index.html')
    .pipe(htmlreplace({
      'app': mainBundleName,
      'vendor': vendorBundleName,
      'css': mainStylesBundleName
    }))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('bundle:vendor', function () {
  return builder
    .buildStatic('dev/client/app/vendor.js', './public/dist/' + vendorBundleName)
    .catch(function (err) {
      console.log('Vendor bundle error');
      console.log(err);
    });
});


gulp.task('build:css', function() {
  var css = gulp.src('./dev/client/assets/**/*.css')
    .pipe(sourcemaps.init());

  var scss = gulp.src('./dev/client/assets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError));
  return es.merge(css,scss)
    .pipe(postcss([precss, autoprefixer, cssnano]))
    .pipe(sourcemaps.write())
    .pipe(ext_replace('.css'))
    .pipe(gulp.dest('./public/dist/assets'));
});

gulp.task('bundle:css', ['build:css'], function() {
  var bundleCSS = {
    src: [ './public/lib/bootstrap/dist/css/bootstrap.min.css',
           './public/lib/font-awesome/css/font-awesome.min.css',
           './public/dist/assets/**/*',
           './public/dist/assets/!*styles{.min}.css'],
    dest: './public/dist/assets'
  };

    gulp.src(bundleCSS.src)
    .pipe(concat('styles.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(bundleCSS.dest));

  return gulp.src(bundleCSS.src)
    .pipe(concat(mainStylesBundleName))
    .pipe(minify())
    .pipe(gulp.dest(bundleCSS.dest));
});

/*-- CLEAN --*/
gulp.task('clean', ['clean:dist']);

gulp.task('clean:dist', function () {
  return gulp.src(['./public/dist'], {read: false})
    .pipe(clean());
});
