'use strict';

var extend = require('extend');
var ENV = process.env.BABEL_ENV || process.env.NODE_ENV;

var obj = {};
function isType(s, typeString) {
    return obj.toString.call(s) === '[object ' + typeString + ']';
}

function isObject(s) {
    return isType(s, 'Object');
}
function isUndefined(s) {
    return isType(s, 'Undefined');
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
    'moduleName': '@babel/runtime'
};

module.export = function (context, options) {
    var envOptions = (options && isObject(options.env)) ?
        extend(true, {}, DEFAULT_ENV_OPTIONS, options.env) :
        DEFAULT_ENV_OPTIONS;

    var transformRuntimeOptions = (options && isObject(options.transformRuntime)) ?
        extend(true, {}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS, options.transformRuntime) :
        DEFAULT_TRANSFORM_RUNTIME_OPTIONS;

    var config = {
        cacheDirectory: isUndefined(options.cacheDirectory) ? true : options.cacheDirectory,
        presets: [
            [require.resolve('@babel/preset-env'), envOptions],
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-stage-0')
        ],
        plugins: [
            require.resolve('@babel/plugin-syntax-dynamic-import'), // Allow parsing of import()
            [require.resolve('@babel/plugin-transform-runtime'), transformRuntimeOptions],
            require.resolve('babel-plugin-transform-decorators-legacy')
        ]
    };
    if (ENV === 'development' && process.env.DEVELOPMENT_ENV === 'hmr') {
        config.plugins.unshift(require.resolve('react-hot-loader/babel'));
    }

    return config;
};
