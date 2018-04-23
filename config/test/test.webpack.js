'use strict';

var specHelpers;
var testsContext;

require('babel-polyfill');
require('lodash');
window.moment = require('moment');
require('../../src/lib/moment-timezone-with-data');
window.saveAs = require('file-saver').saveAs;
window.XLSX = require('xlsx');
window.jQuery = window.$ = require('jquery');
require('../../src/lib/jquery-ui');
require('bootstrap');
/*require("../../src/lib/jquery.datetimepicker");*/
require('angular');
require('angular-sanitize');
require('angular-resource');
require('angular-route');
require('../../src/lib/angular-moment.min');
require('../../src/lib/ui-bootstrap-tpls');
require('../../src/lib/angular-cache-buster');
require('../../src/lib/ngProgress');
require('../../src/lib/angucomplete-alt.js');
require('../../src/lib/angular-file-upload-html5-shim.min');
require('../../src/lib/angular-file-upload.min');
require('../../src/lib/angular-drag-and-drop-lists');

require('/main/dashboard/dashboardApi');
require('/main/dashboard/app/globalDashboardModule');
require('angular-mocks');

specHelpers = require.context('../../src/test/spec-helpers', true, /\.js/);
specHelpers.keys().forEach(specHelpers);

testsContext = require.context('/main', true, /.*?spec\.js/);
testsContext.keys().forEach(testsContext);
