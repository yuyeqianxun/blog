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
