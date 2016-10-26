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

  angularFilesort     = require('gulp-angular-filesort'),

  typescript          = require('gulp-typescript'),



  /*-- Bundling --*/
  htmlreplace         = require('gulp-html-replace'),

  bundleHash          = new Date().getTime(),
  mainBundleName      = bundleHash + '.main.bundle.js',
  vendorBundleName    = bundleHash + '.vendor.bundle.js',
  mainStylesBundleName= bundleHash + '.styles.min.css'
;


var config = {
  dist: './public/dist',
  lib: './public/lib',
  partials: ['dev/client/**/*.html', '!dev/client/index.html'],
  index: './dev/client/index.html',
  styles: {
    src: [ './public/lib/bootstrap/dist/css/bootstrap.min.css',
           './public/lib/font-awesome/css/font-awesome.min.css',
           './public/dist/assets/**/*.+(css|scss)',
           './public/dist/assets/!*styles{.min}.+(css|scss)'],
    dest: './public/dist/assets'
  },
  fonts: {
    src: ['./public/lib/font-awesome/fonts/**/*'],
    dest:'./public/dist/fonts'
  }
};

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

gulp.task('bundle:app', function () {
  return gulp.src(['./dev/client/app/**/**/*.js'])
    .pipe(angularFilesort())
    .pipe(concat(mainBundleName))
    .pipe(gulp.dest('./public/build'));
});


gulp.task('build:css', function() {
  return gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([precss, autoprefixer, cssnano]))
    .pipe(sourcemaps.write())
    .pipe(ext_replace('.css'))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('bundle:css', ['build:css'], function() {
    gulp.src(config.styles.src)
    .pipe(concat('styles.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(config.styles.dest));

  return gulp.src(config.styles.src)
    .pipe(concat(mainStylesBundleName))
    .pipe(minify())
    .pipe(gulp.dest(config.styles.dest));
});


/*-- COPY --*/
gulp.task('copy-fonts', function(){
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

/*-- CLEAN --*/
gulp.task('clean', ['clean:dist']);

gulp.task('clean:dist', function () {
  return gulp.src(['./public/dist'], {read: false})
    .pipe(clean());
});
