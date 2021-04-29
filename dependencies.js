'use strict';

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
    targets: {},
    ignoreBrowserslistConfig: false, // 忽略browserslist文件配置
    useBuiltIns: false, // 怎么运用 polyfill
    modules: false, // 是否转译module syntax，默认是 commonjs
    debug: false, // 是否输出启用的plugins列表
    exclude: ['transform-typeof-symbol'] // 强制不启用的 plugins
};

var DEFAULT_TRANSFORM_RUNTIME_OPTIONS = {
    corejs: 3,
    version: require('@babel/runtime/package.json').version,
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

    if (transformRuntimeOptions.absoluteRuntime) {
        transformRuntimeOptions.absoluteRuntime = path.dirname(
            require.resolve('@babel/runtime/package.json')
        );
    }

    var plugins = [
        [require('@babel/plugin-transform-runtime').default, transformRuntimeOptions]
    ];

    return {
        presets: presets,
        plugins: plugins
    };
};
