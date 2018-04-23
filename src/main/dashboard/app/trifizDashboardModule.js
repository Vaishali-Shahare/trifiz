/*import './dashboardLayout.html';*/

import angular from 'angular';

/*import trifizCommonModule from '../../common/trifizCommonModule';*/
import dashboardConfig from './dashboardConfig';
import dashboardDirective from './dashboardDirective';
import dashboardRun from './dashboardRun';

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

// eslint-disable-next-line angular/module-getter
/*trifizDashboardModule.run(dashboardRun);*/

export default trifizDashboardModule;
