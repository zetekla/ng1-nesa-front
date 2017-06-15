'use strict';
export default {
  js: [
    // './public/lib/json3/lib/json3.js',
    './node_modules/systemjs/dist/system.js',
    './node_modules/babel-core/browser-polyfill.min.js',
    './public/lib/angular/angular.js',
    './public/lib/jasmine/lib/jasmine-core/json2.js',
    './public/lib/jasmine/lib/jasmine-core/jasmine.js',
    './public/lib/jasmine/lib/jasmine-core/jasmine-html.js',
    './public/lib/jasmine/lib/jasmine-core/boot.js',
    './public/lib/angular-mocks/angular-mocks.js',
    './public/lib/angular-ui-router/release/angular-ui-router.js',
    './public/lib/moment/moment.js',
    './public/lib/tether/dist/js/tether.js',
    './public/lib/angular-animate/angular-animate.js',
    './public/lib/angular-cookies/angular-cookies.js',
    './public/lib/angular-resource/angular-resource.js',
    './public/lib/angular-route/angular-route.js',
    './public/lib/angular-sanitize/angular-sanitize.js',
    './public/lib/angular-touch/angular-touch.js',
    './public/lib/lodash/dist/lodash.js',
    './public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
    './public/lib/ng-file-upload-shim/ng-file-upload-shim.js', // https://github.com/danialfarid/ng-file-upload
    './public/lib/ng-file-upload/ng-file-upload.js',
    './public/lib/ng-img-crop/compile/unminified/ng-img-crop.js',
    './public/lib/highlightjs/highlight.pack.js',
    // './public/lib/ngEmbed/src/ng-embed.js',
    './public/lib/angular-messages/angular-messages.js' // https://www.sitepoint.com/easy-form-validation-angularjs-ngmessages/
  ],
  watch: './dev/client/app/vendor.js'
}