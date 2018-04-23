'use strict';

module.exports = {
    create: function(context) {
        const sourceCodeAstBody = context.getSourceCode().ast.body;
        const sourceCodeAstBodyLength = sourceCodeAstBody.length;
        if (sourceCodeAstBodyLength > 0) {
            const reportTxt = 'Wrap the whole file with IIFE';
            const firstNode = sourceCodeAstBody[0];

            if (sourceCodeAstBodyLength === 1) {
                if (firstNode.type === 'ExpressionStatement') {
                    const firstNodeExpression = firstNode.expression;
                    if (
                        firstNodeExpression.type !== 'CallExpression' ||
                        firstNodeExpression.callee.type !== 'FunctionExpression'
                    ) {
                        context.report(firstNode, reportTxt);
                    }
                } else {
                    context.report(firstNode, reportTxt);
                }
            } else {
                context.report(firstNode, reportTxt);
            }
        }
        return {};
    },
};
