# webpack

### 基本配置
打包命令
> "build": "webpack"

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'})
  ]
}
```

### 入口
- 单入口
```js
entry: './src/index.js',
```

- 多页面
```js
module.epxort = {
    entry: {
        pageOne: './src/pageOne/index.js',
        pageTwo: './src/pageTwo/index.js',
    }
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
        filename: 'pageOne.html',
        chunks: ["pageOne"],
        template: './public/pageOne/index.html'
        }),
        new HtmlWebpackPlugin({
        filename: 'pageTwo.html',
        chunks: ["pageTwo"],
        template: './public/pageTwo/index.html'
        })
    ]
}
```

- 动态入口
```js
const fs = require('fs')

const pages = fs.readdirSync('public', function (err, files) {
  if (err) {
    return console.log('目录不存在')
  }
  return files
})

let entry = pages.reduce((acc,page)=>{
  acc[page] = `./src/${page}/index.js`;
  return acc;
},{})

let html = pages.map(item=>new HtmlWebpackPlugin({
  filename: `${item}.html`,
  chunks: [item],
  template: `./public/${item}/index.html`
}))

module.exports = {
  mode: 'production',
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [...html]
}
```

- 自动清除dist
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.export = {
    //......
    plugins: [
        new CleanWebpackPlugin(),
        ...html
    ]
}
```

### 出口
```js
module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: '[name].[chunkhash].bundle.js',//懒加载模块
  },
}
```

### 解析
```js
module.exports = {
  //...
  resolve: {
    // configuration options
    alias: {//路径别名
        'tool': path.resolve(__dirname, 'src/utils/')
    }
  },
};
```

### 热重载
启动命令
> "start": "webpack-dev-server"

> yarn add webpack-dev-serve -D
```js
module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true
  },
};

```