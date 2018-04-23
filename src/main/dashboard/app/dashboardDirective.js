import dashboardDirectiveHtml from './dashboardDirective.html';

function dashboardDirective() {
    const directive = {
        bindToController: {},
        controller: DashboardController,
        controllerAs: 'dashboardVm',
        link: linkFunc,
        restrict: 'E',
        scope: {},
        template: dashboardDirectiveHtml,
        replace: true,
    };
    return directive;

    function linkFunc() {}
}

function DashboardController() {}

DashboardController.$inject = [];

export default {
    fn: dashboardDirective,
    name: 'trifizDashboard',
};
