'use strict';

module.exports = {
    create: function(context) {
        return {
            CallExpression: function(node) {
                const callee = node.callee;
                const calleeObject = callee.object;
                if (calleeObject && calleeObject.name === 'angular') {
                    const calleeProp = callee.property;
                    const ngFnArr = [
                        'bind',
                        'copy',
                        'equals',
                        'extend',
                        'forEach',
                        'fromJson',
                        'identity',
                        'isArray',
                        'isDate',
                        'isDefined',
                        'isElement',
                        'isFunction',
                        'isNumber',
                        'isObject',
                        'isString',
                        'isUndefined',
                        'lowercase',
                        'merge',
                        'noop',
                        'toJson',
                        'uppercase',
                    ];

                    if (calleeProp && ngFnArr.indexOf(calleeProp.name) > -1) {
                        context.report(
                            node,
                            "Don't use angular." +
                                calleeProp.name +
                                '. ' +
                                'Instead, use plain JS function or Lodash function if possible'
                        );
                    }
                }
            },
        };
    },
};
