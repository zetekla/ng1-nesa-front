module.exports = {
  devClient: './dev/client/',
  dist: './public/dist/',
  lib: './public/lib/',
  partials: ['dev/client/**/*.html', '!dev/client/index.html'],
  index: './dev/client/index.html',
  scripts: {
    src: [
      './dev/client/app/**/*.js',
      'test/client/jasmineBootstrap.js'
    ],
    watch: './dev/client/app/**/*.+(ts|js)'
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
        './public/dist/assets/**/*.css',
        '!./public/dist/assets/styles{,.min}.css'
      ]
    },
    dest: './public/dist/assets/'
  },
  html: {
    src:  './dev/client/app/**/*.html',
    dest: './public/dist/'
  },
  fonts: {
    src: ['./public/lib/font-awesome/fonts/**/*'],
    dest:'./public/dist/fonts/'
  },
  images: {
    src: ['./public/lib/jasmine/images/jasmine_favicon.png'],
    dest:'./public/dist/images/'
  },
  jasmine: {
    src: [
      './public/lib/jasmine/lib/jasmine-core/json2.js',
      './public/lib/jasmine/lib/jasmine-core/jasmine.js',
      './public/lib/jasmine/lib/jasmine-core/jasmine-html.js'
    ],
    dest: './public/dist/lib/'
  },
  vendor: require('./dev/client/vendor')
};