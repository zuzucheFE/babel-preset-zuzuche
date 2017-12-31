# babel-preset-zuzuche

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

目前使用 `babel-preset-env` 来声明支持的运行环境
