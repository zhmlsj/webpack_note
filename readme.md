# webpack 的安装 (使用 3.x 版本的)

```
npm install --save-dev webpack@3.x
```

- webpack 手动打包简单命令

```
webpack src/entry.js  dist/bundle.js
        入口文件的路径   打包后的存放路径
```

## 建立 webpack.config.js 文件

```
module.exports={
    //入口文件的配置项
    entry:{},
    //出口文件的配置项
    output:{},
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```

## 解析样式

- css-loader 讲 css 解析成模块,讲解析的内容插入到 style 标签内（style-loader）

```
npm install css-loader style-loader --save-dev
```

## less,sass,stylus(预处理语言)

- less-loader less css-loader style-loader
- sass-loader node-sass (因为 sass-loader 依赖于 node-sass，所以需要先安装 node-sass)
- stylus-loader

```
npm install less less-loader --save-dev
```

## 解析图片

- file-loader url-loader(是依赖于 file-loader)

```
npm install file-loader url-loader --save-dev
```

- use: ["url-loader?limit=8192"]
- 转化 base64 只在 8192 字节以下转化，其他情况输出图片

## 解析 html 插件

- 插件的作用是以我们自己的 html 为模板，讲打包后的结果自动引入 html 中，产出到 dist 目录下

```
npm install html-webpack-plugin --save-dev
```

## js 压缩插件

```
npm install uglifyjs-webpack-plugin --save-dev
```

## css 分离插件

```
npm install extract-text-webpack-plugin --save-dev
```

## 图片分离

```
npm install html-withimg-loader --save-dev
```

## css 自动加前缀 loader

```
npm install postcss-loader autoprefixer --save-dev
```

## 消除未使用的 CSS 插件 purifycss-webpack

```
npm  i -D purifycss-webpack purify-css
i(相当于 install  -D 相当于 --save-dev)
```

## babel 转译 es6->es5

- 安装 babel

```
npm install babel-core babel-loader  --save-dev
```

## babel-preset-es2015

- 让翻译官拥有解析 es6 语法的功能

```
npm install babel-preset-es2015 --save-dev

```

> 官方推荐用 babel-preset-env

创建.babelrc 配置好

```
安装后发现不能编译 于是 安装了bable-loader7.x和babel6.x
npm install babel-loader@7.x babel-core babel-preset-env webpack@3.6.x
还是不能编译
-------
发现问题所在 test: /\*.js$/  改成   test: /\.js$/ 就可以编译啦
```

##module 里面都要相对应配置

## babel-preset-stage-0

- 解析 es7 语法的

```
npm install babel-preset-stage-0 --save-dev
```

## 使用 copy-webpack-plugin copy-webpack-plugin 就是专门为我们作静态资源转移的插件，不过它不同上两节使用的插件，它是需要安装的。

```
npm  install --save-dev copy-webpack-plugin
```
