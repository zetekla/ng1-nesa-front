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

var vendor = {
  js: [
    // './public/lib/json3/lib/json3.js',
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
    './public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
  ],
  watch: './dev/client/vendor.js'
};

browserRequire(vendor);