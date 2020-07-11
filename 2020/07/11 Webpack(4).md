# Webpack

# 分离webpack配置
```js
//build/webpack.common.js
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: path.resolve(process.cwd(), "src/index.js"),
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[chunkhash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["thread-loader", "cache-loader", "babel-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false,
              outputPath: "./img",
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  resolve: {
    alias: {
      //路径别名
      tool: path.resolve(process.cwd(), "src/utils/"),
      "@": path.resolve(process.cwd(), "src/"),
    },
    extensions: [".js", ".vue"],
  },
  plugins: [new VueLoaderPlugin()],
};
```
process.cwd()是指Node.js 进程的当前工作目录，之前的__dirname是指文件所在的更目录，随着配置文件移入build目录，使用process.cwd()将更加方便找寻其他文件。
```js
//webpack.dev.js
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
module.exports = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(process.cwd(), "dist"),
    compress: true,
    port: 9000,
    hot: true,
  },
});
```
webpack-merge是一个用来合并webpack配置的工具包。
```js
//webpack.prod.js
const {merge} = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === "production"
          ? "css/[name].css"
          : "css/[name].[hash].css",
      chunkFilename:
        process.env.NODE_ENV === "production"
          ? "css/[id].css"
          : "css/[id].[hash].css",
    }),
    new OptimizeCssAssetsPlugin({}),
    new HardSourceWebpackPlugin(),
  ],
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: "manifest",
    },
  },
});
```

当然，需要改动package.json
```js
"start": "webpack-dev-server --config ./build/webpack.dev.js",
"build": "webpack --config ./build/webpack.prod.js"
```

至此，webpack的配置就算是告了一段落。

- [webpack完整代码](https://github.com/yuyeqianxun/yuyeqianxun.github.io/blob/master/webpack/)