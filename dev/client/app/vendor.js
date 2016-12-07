'use strict';
// export const vendor = {
function browserRequire(_){
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    return _;
  }
}

let vendor = {
  js: [
    // './public/lib/json3/lib/json3.js',
    './node_modules/systemjs/dist/system.js',
    './public/lib/angular/angular.js',
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
    './public/lib/angular-messages/angular-messages.js' // https://www.sitepoint.com/easy-form-validation-angularjs-ngmessages/
  ],
  watch: './dev/client/app/vendor.js'
};

/*

module.exports = vendor;

// works fine for [dev] with server-side systemJS load, browserRequire not needed.
// For production, all vendor becomes vendor.bundle.js, so systemJS isn't then needed.

*/

browserRequire(vendor);