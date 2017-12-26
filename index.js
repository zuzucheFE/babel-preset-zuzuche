'use strict';

var extend = require('extend');

function isType(s, typeString) {
    return {}.toString.call(s) === '[object ' + typeString + ']';
}

function isObject(s) {
    return isType(s, 'Object');
}


var DEFAULT_ENV_OPTIONS = {
    'targets': {
        chrome: 45,
        firefox: 52,
        safari: 8,
        ios: 9,
        android: 4,
        ie: 9,
        edge: 12
    },
    'useBuiltIns': false,
    'modules': false,
    'debug': false
};
function generateENVOptions(options) {
    return extend(true, {}, DEFAULT_ENV_OPTIONS, options.additionalTargets);
}

module.export = function (context, options) {
    var envOptions = (options && isObject(options.env)) ? options.env :
        generateENVOptions(options.env);

    return {
        cacheDirectory: options.cacheDirectory || true,
        presets: [
            [require.resolve('@babel/preset-env'), envOptions],
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-stage-1')
        ],
        plugins: [
            require.resolve('@babel/plugin-syntax-dynamic-import'), // Allow parsing of import()
            [require.resolve('@babel/plugin-transform-runtime'), {
                'helpers': false,
                'polyfill': true,
                'regenerator': true
            }],
            require.resolve('babel-plugin-transform-decorators-legacy')
        ]
    }
};
