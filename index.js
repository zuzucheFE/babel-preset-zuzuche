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
    targets: { // 目标环境
        browsers: [ // 浏览器
            'Chrome >= 45', 'last 2 Firefox versions',
            'ie >= 9', 'Edge >= 12',
            'iOS >= 9', 'Android >= 4', 'last 2 ChromeAndroid versions'
        ]
    },
    ignoreBrowserslistConfig: true, // 忽略browserslist文件配置
    useBuiltIns: false, // 怎么运用 polyfill
    modules: false, // 是否转译module syntax，默认是 commonjs
    debug: false, // 是否输出启用的plugins列表
    exclude: ['transform-typeof-symbol'] // 强制不启用的 plugins
};

var DEFAULT_TRANSFORM_RUNTIME_OPTIONS = {
    corejs: '2',
    helpers: true,
    regenerator: true,
    useESModules: true,
    absoluteRuntime: true
};

var DEFAULT_CLASS_PROPERTIES_OPTIONS = {
    loose: true
};

var DEFAULT_REACT_OPTIONS = {
    useBuiltIns: true
};

var DEFAULT_DESTRUCTURING_OPTIONS = {
    loose: false,
    selectiveLoose: [
        'useState',
        'useEffect',
        'useContext',
        'useReducer',
        'useCallback',
        'useMemo',
        'useRef',
        'useImperativeHandle',
        'useLayoutEffect',
        'useDebugValue'
    ]
};

module.exports = function (context, options) {
    var ENV = process.env.BABEL_ENV || process.env.NODE_ENV;
    var isEnvDevelopment = ENV === 'development';

    // ====================
    // presets config
    var envOptions = (options && isObject(options.env)) ?
        assign({}, DEFAULT_ENV_OPTIONS, options.env) :
        assign({}, DEFAULT_ENV_OPTIONS);

    var reactOptions = (options && isObject(options.react)) ?
        assign({}, DEFAULT_REACT_OPTIONS, options.react) :
        assign({}, DEFAULT_REACT_OPTIONS);
    reactOptions.development = isEnvDevelopment;

    var presets = [
        [require('@babel/preset-env').default, envOptions],
        [require('@babel/preset-react').default, reactOptions]
    ];

    var isFlowEnabled = validateBoolOption('flow', options.flow, true);
    if (isFlowEnabled) {
        presets.push(require('@babel/preset-flow').default);
    }


    // ====================
    // plugins config
    var transformRuntimeOptions = (options && isObject(options['transform-runtime'])) ?
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS, options['transform-runtime']) :
        assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS);

    var classPropertiesOptions = (options && isObject(options['class-properties'])) ?
        assign({}, DEFAULT_CLASS_PROPERTIES_OPTIONS, options['class-properties']) :
        assign({}, DEFAULT_CLASS_PROPERTIES_OPTIONS);

    var destructuringOptions = (options && isObject(options['destructuring'])) ?
        assign({}, DEFAULT_DESTRUCTURING_OPTIONS, options['destructuring']) :
        assign({}, DEFAULT_DESTRUCTURING_OPTIONS);

    var plugins = [
        [require('@babel/plugin-transform-destructuring').default, destructuringOptions],
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
