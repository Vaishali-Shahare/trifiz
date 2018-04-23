'use strict';

module.exports = {
    port: 8091,
    apiProxies: {
        apiContexts: ['/trifiz-rest'],
        defaultProxy: 'trifiz',
        proxyOptions: {
            trifiz: {
                url: 'http://trifiz.com:80',
                altUrls: ['http://trifiz.com:80'],
            },
        },
    },
};
