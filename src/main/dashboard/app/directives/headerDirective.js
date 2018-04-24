import headerDirectiveHtml from '../partials/headerDirective.html';

function headerDirective() {
    const directive = {
        bindToController: {},
        controller: HeaderController,
        controllerAs: 'headerVm',
        link: linkFunc,
        restrict: 'E',
        scope: {},
        template: headerDirectiveHtml,
        replace: true,
    };
    return directive;

    function linkFunc() {}
}

function HeaderController() {}

HeaderController.$inject = [];

export default {
    fn: headerDirective,
    name: 'trifizHeader',
};
