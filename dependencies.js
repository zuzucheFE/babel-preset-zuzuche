'use strict';

var path = require('path');
var obj = {};
function isType(s, typeString) {
    return obj.toString.call(s) === '[object ' + typeString + ']';
}

function isObject(s) {
    return isType(s, 'Object');
}
function isNumber(s) {
    return isType(s, 'Number');
}
function isString(s) {
    return isType(s, 'String');
}
function isBoolean(s) {
    return isType(s, 'Boolean');
}
function toInt(s) {
    return parseInt(s, 10) || 0;
}

var assign = Object.assign;

var DEFAULT_ENV_OPTIONS = {
    targets: {
        browsers: [
            'Chrome >= 45', 'last 2 Firefox versions',
            'ie >= 9', 'Edge >= 12',
            'iOS >= 9', 'Android >= 4', 'last 2 ChromeAndroid versions'
        ]
    },
    ignoreBrowserslistConfig: true,
    useBuiltIns: false,
    modules: false,
    debug: false,
    exclude: ['transform-typeof-symbol']
};

var DEFAULT_TRANSFORM_RUNTIME_OPTIONS = {
    corejs: false,
    helpers: true,
    regenerator: true,
    useESModules: true,
    absoluteRuntime: true
};

module.exports = function (context, options) {
    // ====================
    // presets config
    var envOptions = (options && isObject(options.env)) ?
        assign({}, DEFAULT_ENV_OPTIONS, options.env) :
        assign({}, DEFAULT_ENV_OPTIONS);

    var presets = [
        [require('@babel/preset-env').default, envOptions]
    ];

    // ====================
    // plugins config
    var transformRuntimeOptions = (options && isObject(options['transform-runtime'])) ?
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS, options['transform-runtime']) :
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS);

    var corejsVersion = transformRuntimeOptions.corejs;
    if (
        corejsVersion !== false &&
        (!isNumber(corejsVersion) || corejsVersion !== 2) &&
        (!isString(corejsVersion) || corejsVersion !== '2')
    ) {
        throw new Error(
            "The 'corejs' option must be undefined, false, 2 or '2', " +
            "but got " + JSON.stringify(corejsVersion) + "."
        );
    }

    if (
        isBoolean(transformRuntimeOptions.absoluteRuntime) &&
        transformRuntimeOptions.absoluteRuntime === true
    ) {
        transformRuntimeOptions.absoluteRuntime = path.dirname(
            require.resolve(
                '@babel/runtime' + (toInt(corejsVersion) === 2 ? '-corejs2' : '') + '/package.json'
            )
        );
    }

    var plugins = [
        [require('@babel/plugin-transform-runtime').default, transformRuntimeOptions],
        require('@babel/plugin-syntax-dynamic-import').default
    ];

    return {
        presets: presets,
        plugins: plugins
    };
};
