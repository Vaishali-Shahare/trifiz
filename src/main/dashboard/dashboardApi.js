/*eslint angular/window-service:warn*/

window.TRIFIZ = window.TRIFIZ || {};
window.TRIFIZ.dashboard = {};

const ExternalAppContext = {
    loadSearchView: false,
    payload: {},
    appLoaded: false,
};
window.ExternalAppContext = ExternalAppContext;

window.TRIFIZ_JS_LIB = window.TRIFIZ_JS_LIB || {};

function isInsideWB() {
    return window.self !== window.top;
}

export default {
    isInsideWB,
};
