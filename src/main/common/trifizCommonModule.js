import angular from 'angular';

import trifizLayoutModule from './trifizLayoutModule';

const trifizCommonModule = angular.module('trifiz.common', [
    trifizLayoutModule.name,
]);

export default trifizCommonModule;
