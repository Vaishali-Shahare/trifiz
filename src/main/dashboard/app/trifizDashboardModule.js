/*import './dashboardLayout.html';*/

import angular from 'angular';

import dashboardConfig from './dashboardConfig';
import dashboardDirective from './dashboardDirective';

const trifizDashboardModule = angular.module('dashboard', [
    'ngSanitize',
    'ui.bootstrap',
    'angularMoment',
    'angucomplete-alt',
    'dndLists',
    'angularFileUpload',
]);

// eslint-disable-next-line angular/window-service
window.TRIFIZ_JS_LIB.dashboard = trifizDashboardModule;

trifizDashboardModule
    .config(dashboardConfig)
    .directive(dashboardDirective.name, dashboardDirective.fn);

export default trifizDashboardModule;
