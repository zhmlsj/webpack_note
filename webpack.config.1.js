//  多入口的配置

const path = require("path");

module.exports = {
  //入口文件的配置项
  entry: {
    //里面的entry是可以随便写的
    entry: "./src/entry.js",
    entry2: "./src/entry2.js"
  },
  //出口文件的配置项
  output: {
    //打包的路径文职
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {},
  plugins: [],
  devServer: {}
};
