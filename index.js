"use strict";

var path = require('path');
var extend = require('extend');
var obj = {};
function isType(s, typeString) {
    return obj.toString.call(s) === '[object ' + typeString + ']';
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
        extend(true, {}, DEFAULT_ENV_OPTIONS, options.env) :
        DEFAULT_ENV_OPTIONS;

    var transformRuntimeOptions = (options && isObject(options.transformRuntime)) ?
        extend(true, {}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS, options.transformRuntime) :
        DEFAULT_TRANSFORM_RUNTIME_OPTIONS;

    return {
        presets: [
            [require.resolve('@babel/preset-env'), envOptions],
            require.resolve('@babel/preset-react', {
                development: isEnvDevelopment
            }),
            require.resolve('@babel/preset-stage-0')
        ],
        plugins: [
            require.resolve('@babel/plugin-syntax-dynamic-import'), // Allow parsing of import()
            [require.resolve('@babel/plugin-transform-runtime'), transformRuntimeOptions],
            require.resolve('babel-plugin-transform-decorators-legacy')
        ]
    };
};
