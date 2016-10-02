'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'ui.bootstrap',

  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'Services'
])
.constant("api", {
        "url": "http://localhost:9001"
    });