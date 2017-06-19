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
import glob             from 'glob';
import sourcemaps       from 'gulp-sourcemaps';
import ext_replace      from 'gulp-ext-replace';
import concat           from 'gulp-concat';
import es               from 'event-stream';
import bs               from 'browser-sync';
let    browserSync      = bs.create();

import runSequence      from 'run-sequence';
import shell            from 'gulp-shell';
// logger
import notify           from 'gulp-notify';
import chalk            from 'chalk';
// sanity
import clean            from 'gulp-clean';
// dependencies management
import bower            from 'gulp-bower';


/*-- Images --*/
import imagemin         from 'gulp-imagemin';

/*-- JS & TS --*/
import source           from 'vinyl-source-stream';
import browserify       from 'browserify';
import babelify         from 'babelify';
import babel            from 'gulp-babel';
import uglify           from 'gulp-uglify';
import rename           from 'gulp-rename';

import angularFilesort  from 'gulp-angular-filesort';
import ngAnnotate       from 'gulp-ng-annotate';

import typescript       from 'gulp-typescript';



/*-- Bundling --*/
import htmlreplace      from 'gulp-html-replace';

import moment           from 'moment';

// let bundleHash        = moment(new Date().getTime()).format('YYYY-MM-DD-HH-mm-ss'), // 'MMM Do h:mm:ss A'
let bundleHash        = moment().format('YYYY-MM-DD-HH-mm-ss'),
  mainBundleName      = bundleHash + '.main.bundle.js',
  mainScript          = 'babel.bundle.js',
  mainShortName       = 'main.bundle.js',
  testScript          = 'test.bundle.js',
  testBundleName      = bundleHash + '.test.bundle.js',
  vendorBundleName    = bundleHash + '.vendor.bundle.js',
  vendorShortName     = 'vendor.bundle.js',
  mainStylesBundleName= bundleHash + '.styles.min.css'
;

gulp.task('default', ['serve']);
gulp.task('shell', shell.task(['lite-server']));
gulp.task('serve:dev', ['watch', 'shell']);

gulp.task('dist', function(callback) {
  runSequence('clean', 'copy', 'bundle', callback);
});

gulp.task('serve', function(callback) {
  runSequence('clean:dev', 'copy:dev', 'bundle:dev', 'watch', 'shell', callback);
});

gulp.task('copy:dev', ['copy_images', 'copy_maps', 'copy_fonts', 'copy_lib']);
gulp.task('copy',     ['copy_images', 'copy_maps', 'copy_fonts', 'copy_lib', 'copy_html']);

gulp.task('bundle:dev', ['bundle:css:dev', 'bundle:vendor:dev', 'bundle:app:dev', 'bundle:test:dev', 'bundle:browserify']);
gulp.task('bundle', ['bundle:vendor', 'bundle:app', 'bundle:test', 'bundle:css'], function () {
  return gulp.src('dev/client/index.html')
    .pipe(htmlreplace({
      'app': mainBundleName,
      'vendor': vendorBundleName,
      'test': testBundleName,
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
                .pipe(uglify())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(config.dist))
  },
  bundle_app: {
    dev:      (app) =>  app.pipe(concat(mainScript))
                          .pipe(ngAnnotate())
                          .pipe(gulp.dest(config.dist))
                          .pipe(notify({message: 'Compiled [dev] babel.bundle.js (' + moment().format('YYYY-MM-DD-HH-mm-ss') + ')', onLast: true})),
    dist:     (app) =>  app.pipe(sourcemaps.init())
                          .pipe(concat(mainBundleName))
                          .pipe(ngAnnotate())
                          .on('error', notify.onError("Error: <%= error.message %>"))
                          .pipe(uglify()) // review appSpec for mangle
                          .on('error', notify.onError("Error: <%= error.message %>"))
                          .pipe(sourcemaps.write('.'))
                          .pipe(gulp.dest(config.dist))
                          .pipe(notify({message: 'Compiled [dist] main.bundle.js (' + moment().format('YYYY-MM-DD-HH-mm-ss') + ')', onLast: true}))
  },
  bundle_test: {
    dev:      (app) =>  app.pipe(concat(testScript))
                          .pipe(gulp.dest(config.dist))
                          .pipe(notify({message: 'Compiled [dev] test.bundle.js (' + moment().format('YYYY-MM-DD-HH-mm-ss') + ')', onLast: true})),
    dist:     (app) =>  app.pipe(sourcemaps.init())
                          .pipe(concat(testBundleName))
                          .on('error', notify.onError("Error: <%= error.message %>"))
                          .pipe(uglify()) // review appSpec for mangle
                          .on('error', notify.onError("Error: <%= error.message %>"))
                          .pipe(sourcemaps.write('.'))
                          .pipe(gulp.dest(config.dist))
                          .pipe(notify({message: 'Compiled [dist] test.bundle.js (' + moment().format('YYYY-MM-DD-HH-mm-ss') + ')', onLast: true}))
  },
  build_css:            function(src, srcmaps = null, dest){
    return gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([precss, autoprefixer, cssnano]))
      .pipe(sourcemaps.write(srcmaps))
      .pipe(ext_replace('.css'))
      .pipe(gulp.dest(dest))
      .pipe(notify({message: 'Compiled scss (' + moment().format('YYYY-MM-DD-HH-mm-ss') + ')', onLast: true}));
  }
};

gulp.task('bundle:vendor', ['bundle:vendor:dev', 'bundle:vendor:dist']);

gulp.task('bundle:vendor:dev', ['bower_restore'], function () {
  let vendor = gulp.src(config.vendor.js);
    return tasks.bundle_vendor.dev(vendor);
});
gulp.task('bundle:vendor:dist', ['bower_restore'], function () {
  let vendor = gulp.src(config.vendor.js);
    return tasks.bundle_vendor.dist(vendor);
});

gulp.task('bundle:app', ['bundle:app:dev', 'bundle:app:dist']);
gulp.task('bundle:test', ['bundle:test:dev', 'bundle:test:dist']);

gulp.task('bundle:browserify', ['bundle:app:dev'], function () {
    return (function(entry) {
      browserify({ entries: [entry], debug: true })
        .transform(babelify,
          { "presets": ["es2015"] }
        )
        .bundle()
        .pipe(source(entry))
        .pipe(rename(mainShortName))
        .pipe(gulp.dest(config.dist))
        .pipe(notify({message: 'Compiled [dev] main.bundle.js (' + moment().format('YYYY-MM-DD-HH-mm-ss') + ')', onLast: true}));
    })('./public/dist/'+ mainScript);
});

gulp.task('browserify', function (done) {
  glob('./dev/client/app/**/*.js', function(err, files){
    if (err) done(err);
    let tasks = files.map(function(entry) {
        return browserify({ entries: [entry], debug: true })
            .transform(babelify,
              { "presets": ["es2015"] }
            )
            .bundle()
            .pipe(source(entry))
            .pipe(rename({
                extname: '.bundle.js'
            }))
            .pipe(gulp.dest('./browserify'));
        });
    es.merge(tasks).on('end', done);
  })

});

gulp.task('release', ['browserify'], function () {
  let app = gulp.src('./browserify/**/*.js')
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(angularFilesort());

  return tasks.bundle_app.dev(app);
});

gulp.task('clean:browserified', ['release'], function(){
  return gulp.src([
    './browserify/**/*.js'
  ], {read: false})
    .pipe(clean());
});

gulp.task('bundle.app.dev', ['browserify', 'release', 'clean:browserified']);

gulp.task('bundle:app:dev', function () {
  let app = gulp.src(config.scripts.src)
    .pipe(babel({ presets: ['es2015'] }))
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(angularFilesort());

  return tasks.bundle_app.dev(app);
});
gulp.task('bundle:app:dist', function () {
  let app = gulp.src(config.scripts.src)
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(angularFilesort());

  return tasks.bundle_app.dist(app);
});

gulp.task('bundle:test:dev', function () {
  let app = gulp.src(config.test.src)
    .pipe(babel({ presets: ['es2015'] }))
    .on('error', notify.onError("Error: <%= error.message %>"));

  return tasks.bundle_test.dev(app);
});
gulp.task('bundle:test:dist', function () {
  let app = gulp.src(config.test.src)
    .pipe(babel({ presets: ['es2015'] }));

  return tasks.bundle_test.dist(app);
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
  return gulp.watch(config.scripts.watch, file => {
    console.log(chalk.green(' ✓ registered changes in %s'), file.path.split('/').pop());
    runSequence('bundle:app:dev');
  });
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
    config.scripts.dest + mainShortName,
    config.scripts.dest + mainScript
  ], {read: false})
    .pipe(clean());
});

gulp.task('clean:dev', ['clean:styles', 'clean:vendor', 'clean:scripts']);
