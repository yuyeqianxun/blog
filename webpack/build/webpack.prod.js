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
