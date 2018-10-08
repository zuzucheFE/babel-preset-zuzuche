'use strict';

var path = require('path');
var obj = {};
function isType(s, typeString) {
    return obj.toString.call(s) === '[object ' + typeString + ']';
}

function isObject(s) {
    return isType(s, 'Object');
}

function validateBoolOption(name, value, defaultValue) {
    if (typeof value === 'undefined') {
        value = defaultValue;
    }

    if (typeof value !== 'boolean') {
        throw new Error('Preset zuzuche: "' + name + '" option must be a boolean.');
    }

    return value;
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
    absoluteRuntime: true
};

var DEFAULT_CLASS_PROPERTIES = {
    loose: true
};

module.exports = function (context, options) {
    var ENV = process.env.BABEL_ENV || process.env.NODE_ENV;
    var isEnvDevelopment = ENV === 'development';

    // ====================
    // presets config
    var envOptions = (options && isObject(options.env)) ?
        assign({}, DEFAULT_ENV_OPTIONS, options.env) :
        assign({}, DEFAULT_ENV_OPTIONS);

    var presets = [
        [require('@babel/preset-env').default, envOptions],
        [require('@babel/preset-react').default, {
            development: isEnvDevelopment
        }]
    ];

    var isFlowEnabled = validateBoolOption('flow', options.flow, true);
    if (isFlowEnabled) {
        presets.push(require('@babel/preset-flow').default);
    }


    // ====================
    // plugins config
    var transformRuntimeOptions = (options && isObject(options.transformRuntime)) ?
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS, options.transformRuntime) :
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS);

    if (
        typeof transformRuntimeOptions.useAbsoluteRuntime === 'boolean' &&
        transformRuntimeOptions.useAbsoluteRuntime === true
    ) {
        transformRuntimeOptions.useAbsoluteRuntime = path.dirname(
            require.resolve('@babel/runtime/package.json')
        );
    }

    var classPropertiesOptions = (options && isObject(options['class-properties'])) ?
        assign({}, DEFAULT_CLASS_PROPERTIES, options['class-properties']) :
        assign({}, DEFAULT_CLASS_PROPERTIES);

    var plugins = [
        // Adds syntax support for import()
        require('@babel/plugin-syntax-dynamic-import').default,
        [require('@babel/plugin-proposal-class-properties').default, classPropertiesOptions],
        require('@babel/plugin-proposal-object-rest-spread').default,
        [require('@babel/plugin-transform-runtime').default, transformRuntimeOptions]
    ];

    return {
        presets: presets,
        plugins: plugins
    };
};
