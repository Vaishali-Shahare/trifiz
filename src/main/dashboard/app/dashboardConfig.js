function dashboardConfig($compilerProvider) {
    $compilerProvider.aHrefSanitizationWhitelist(
        /^\s*(https?|ftp|mailto|sip|tel):/
    );
}
dashboardConfig.$inject = ['$compileProvider'];
export default dashboardConfig;
