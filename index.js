"use strict";

var path = require('path');
var obj = {};
function isType(s, typeString) {
    return obj.toString.call(s) === '[object ' + typeString + ']';
}

function isObject(s) {
    return isType(s, 'Object');
}

var assign = Object.assign;

var DEFAULT_ENV_OPTIONS = {
    'targets': {
        browsers: [
            'Chrome >= 45', 'last 2 Firefox versions',
            'ie >= 9', 'Edge >= 12',
            'iOS >= 9', 'Android >= 4', 'last 2 ChromeAndroid versions'
        ]
    },
    'useBuiltIns': false,
    'modules': false,
    'debug': false
};

var DEFAULT_TRANSFORM_RUNTIME_OPTIONS = {
    'helpers': false,
    'polyfill': true,
    'regenerator': true,
    'moduleName': path.dirname(require.resolve('@babel/runtime/package.json'))
};

module.exports = function (context, options) {
    var ENV = process.env.BABEL_ENV || process.env.NODE_ENV;
    var isEnvDevelopment = ENV === 'development';

    var envOptions = (options && isObject(options.env)) ?
        assign({}, DEFAULT_ENV_OPTIONS, options.env) :
        assign({}, DEFAULT_ENV_OPTIONS);

    var transformRuntimeOptions = (options && isObject(options.transformRuntime)) ?
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS, options.transformRuntime) :
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS);

    return {
        presets: [
            [require.resolve('@babel/preset-env'), envOptions],
            require.resolve('@babel/preset-react', {
                development: isEnvDevelopment
            }),
            [require.resolve('@babel/preset-stage-0'), {
                decoratorsLegacy: true
            }]
        ],
        plugins: [
            require.resolve('@babel/plugin-syntax-dynamic-import'), // Allow parsing of import()
            [require.resolve('@babel/plugin-transform-runtime'), transformRuntimeOptions],
            require.resolve('babel-plugin-transform-decorators-legacy')
        ]
    };
};
