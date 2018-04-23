import contextService from './service/contextService';

function dashboardRun(contextSrv, $window) {
    if (contextSrv.setContext) {
        contextSrv.setContext($window.otmJsContext);
    }
}

dashboardRun.$inject = [contextService.name, '$window'];

export default dashboardRun;
