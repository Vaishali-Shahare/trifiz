/*eslint angular/window-service:warn*/

window.TRIFIZ_JS_LIB = window.TRIFIZ_JS_LIB || {};
window.TRIFIZ_JS_LIB.dashboard = {};

const ExternalAppContext = {
    loadSearchView: false,
    payload: {},
    appLoaded: false,
};
window.ExternalAppContext = ExternalAppContext;

/*window.TRIFIZ_JS_LIB.dashboard = window.TRIFIZ_JS_LIB.dashboard || {};*/

function isInsideWB() {
    return window.self !== window.top;
}

export default {
    isInsideWB,
};
