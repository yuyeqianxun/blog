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
