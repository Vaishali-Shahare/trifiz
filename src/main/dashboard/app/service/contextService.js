import _ from 'lodash';

function contextService() {
    let context = {};

    const service = {
        setContext: setContext,
    };
    return service;

    function setContext(ctx) {
        if (_.isEmpty(context)) {
            context = _.cloneDeep(ctx);
        }
    }
}

contextService.$inject = [];

export default {
    fn: contextService,
    name: 'TrifizAppContext',
};
