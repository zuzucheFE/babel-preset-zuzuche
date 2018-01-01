# babel-preset-zuzuche

[![npm](https://img.shields.io/npm/v/babel-preset-zuzuche.svg)](https://www.npmjs.com/package/babel-preset-zuzuche)
[![Travis branch](https://img.shields.io/travis/zuzucheFE/babel-preset-zuzuche/master.svg)](https://travis-ci.org/zuzucheFE/babel-preset-zuzuche)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kidney/babel-preset-zuzuche/master/LICENSE)

租租车javascript babel预设转换器

目前包含的plugins/presets:

 - [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
 - [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)
 - [@babel/preset-stage-0](https://www.npmjs.com/package/@babel/preset-stage-0)
 - [@babel/plugin-syntax-dynamic-import](https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import)
 - [@babel/plugin-transform-runtime](https://www.npmjs.com/package/@babel/plugin-transform-runtime)
 - [babel-plugin-transform-decorators-legacy](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy)
 - [react-hot-loader/babel](https://www.npmjs.com/package/react-hot-loader) (for `development` and `HMR` 模式)



## 安装

```sh
$ npm install --save-dev babel-preset-zuzuche
```

## 用法

### 使用 `.babelrc` 配置 (推荐)

**.babelrc**

```json
{
  "presets": ["zuzuche"]
}
```

### 使用 CLI

```sh
$ babel script.js --presets zuzuche
```

### 使用 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["zuzuche"]
});
```


## 目标运行环境配置

目前使用 `babel-preset-env` 来配置支持的运行环境

`targets` 参数支持多种传递格式，详情查看 [babel-preset-env#targets](https://github.com/babel/babel/tree/master/packages/babel-preset-env)

如需支持更多自定义的运行环境，需了解 `browserslist`，详情查看 [browserlist](https://github.com/ai/browserslist).

默认运行环境配置：

```json
{
  "presets": [["zuzuche", {
    "targets": {
      "chrome": 45,
      "firefox": 52,
      "safari": 8,
      "ios": 9,
      "android": 4,
      "ie": 9,
      "edge": 12
    }
  }]]
}
```

只支持国内主流PC端配置：
```json
{
  "presets": [["zuzuche", {
    "targets": ["chrome >= 45", "firefox >= 52", "safari >= 8", "ie >= 9", "edge >= 12"]
  }]]
}
```



只支持国内主流移动端配置：
```json
{
  "presets": [["zuzuche", {
    "targets": ["iOS >= 9", "Android >= 4", "last 2 ChromeAndroid versions"]
  }]]
}
```
