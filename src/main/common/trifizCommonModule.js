import angular from 'angular';

import headerDirective from '../dashboard/app/directives/headerDirective';

const trifizCommonModule = angular
    .module('trifiz.common', [])
    .directive(headerDirective.name, headerDirective.fn);

export default trifizCommonModule;
