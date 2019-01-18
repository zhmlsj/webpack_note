const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const uglifyPlugin = require("uglifyjs-webpack-plugin"); //压缩js代码插件
const htmlPlugin = require("html-webpack-plugin"); // 解析html插件
const extractTextPlugin = require("extract-text-webpack-plugin"); //分离css 插件
const purifyCSSPlugin = require("purifycss-webpack"); //消除未使用的 CSS 插件
const copyWebpackPlugin = require("copy-webpack-plugin"); //作静态资源转移的插件

// 引入自己写的模块
const entry = require("./webpack_config/entry_webpack"); //入口模块

if (process.env.type == "build") {
  var website = {
    publicPath: "http://192.168.1.43:1717/"
  };
} else {
  var website = {
    publicPath: "http://192.168.1.43:1717/"
  };
}

module.exports = {
  devtool: "source-map", //调试四种模式1.source-map  独立map  包括 行列 2.cheap-module-source-map  独立 行 不包括列 3.eval-source-map 4.cheap-module-eval-source-map
  //入口文件的配置项
  entry: {
    //里面的entry是可以随便写的
    entry: "./src/entry.js",
    // 第三方库抽离出来
    jquery: "jquery"
  },
  // entry: entry,
  //出口文件的配置项
  output: {
    //打包的路径位置  绝对路径
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: website.publicPath
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   // 几种写法
      //   use: ["style-loader", "css-loader"]
      //   // loader: ["style-loader", "css-loader"],
      //   // use: [
      //   //   {
      //   //     loader: "style-loader"
      //   //   },
      //   //   {
      //   //     loader: "css-loader"
      //   //   }
      //   // ]

      //   // 可惜配置项
      //   // include/exclude
      //   // query
      // },
      //  css分离出来使用插件
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000,
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.(html|htm)$/,
        use: ["html-withimg-loader"]
      },
      // {
      //   test: /\.less$/,
      //   use: ["style-loader", "css-loader", "less-loader"]
      // },
      //  把less 分离出来
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: ["css-loader", "less-loader"],
          fallback: "style-loader"
        })
      },
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // },
      //  把sass 分离出来
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: ["css-loader", "sass-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: "babel-loader"
          // 配置项，最好写在.babelrc
          // options: {
          //   presets: ["env", "react"]
          // }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    // new uglifyPlugin(),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: "./src/index.html"
    }),
    new extractTextPlugin("css/index.css"),
    // 使用 purifyCSSPlugin前提是使用extractTextPlugin插件
    new purifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "src/*.html"))
    }),
    // 在JS中加上我们的版权或开发者声明
    new webpack.BannerPlugin("zzz版权所有"),
    new webpack.optimize.CommonsChunkPlugin({
      //name对应入口文件中的名字，我们起的是jQuery
      name: ["jquery"],
      //把文件打包到哪里，是一个路径
      filename: "assets/js/[name].js",
      //最小打包的文件模块数，这里直接写2就好
      minChunks: 2
    }),
    new copyWebpackPlugin([
      {
        from: __dirname + "/src/public",
        to: "./public"
      }
    ])
  ],
  devServer: {
    // 配置服务器基本运行路径，用于找到程序打包地址
    contentBase: path.resolve(__dirname, "dist"),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: "192.168.1.43",
    //服务端压缩是否开启
    compress: true,
    //配置服务端口号
    port: 1717
  },
  watchOptions: {
    //检测修改的时间，以毫秒为单位
    poll: 1000,
    //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
    aggregateTimeout: 500,
    //不监听的目录
    ignored: /node_modules/
  }
};
