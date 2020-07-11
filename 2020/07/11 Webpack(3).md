# webpack

## 优化dist输出

### 抽离css
> yarn add mini-css-extract-plugin optimize-css-assets-webpack-plugin -D

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.export = {
    //...
    module: {
        //...
        rules: [
            //...
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    hmr: process.env.NODE_ENV === 'development',
                    },
                },
                // 不使用style-loader,否则会报错
                // {
                //   loader: 'style-loader',
                // },
                {
                    loader: 'css-loader',
                    options: {
                    importLoaders: 1,
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'less-loader',
                },
                ]
            }
        ]
    },
    plugins: [
        //...
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'production' ? '[name].css' : '[name].[hash].css',
            chunkFilename: process.env.NODE_ENV === 'production' ? '[id].css' : '[id].[hash].css',
        }),
        new OptimizeCssAssetsPlugin({})
    ],
}

```

### 指定文件夹
```js
module.export = {
    //...
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[hash].js",//添加js/
        chunkFilename: 'js/[name].[chunkhash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false,
                            outputPath: './img',//outputPath
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        //...
        new MiniCssExtractPlugin({//添加css/
            filename: process.env.NODE_ENV === 'production' ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: process.env.NODE_ENV === 'production' ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
    ],
}
```

好了，现在开始打包，发现代码和文件都放进相应的文件夹里去了。

如果你再次打包，发现报错了，不用慌忙动手打我！我猜你~~的枪里没有子弹~~用到是vscode，并且正在浏览器预览dist效果(●'◡'●)，所以知道了吧！

### 按需加载
```js
component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
```
很多人瞅着这段代码眼熟，是滴，它是写在Vue的router里面的，用来按需加载组件。
```js
/* webpackChunkName: "about" */
```
这一段可不是写给你看的，要记得改动字段，不要无脑复制粘贴，修改相应的名字，再打包，发现相应组件的代码都被抽出来了，并且名字就是 webpackChunkName: "about"对应的value。
```js
module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: 'js/[name].[chunkhash].bundle.js',//出口配置在这里
  },
}
```

### 分离manifest
一旦你的应用在浏览器中以 index.html 文件的形式被打开，一些 bundle 和应用需要的各种资源都需要用某种方式被加载与链接起来。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack 优化 之后，你精心安排的 /src 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来……

当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

以上是webpack官网对应manifest的解释。说白了是webpack用来统筹你代码的东西，和你的业务代码无关，可以拆分出来。

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
  },
}
```
再次打包，你会发现多了一个manifest.js

### css tree sharking
> yarn add purgecss-webpack-plugin -D
Webpack plugin to remove unused css.
这是该插件的描述，很简单，但够我们知道它的用处了。

我尝试了下，懒加载模块的css全没了...原因未知，慎用。

### js tree sharking
```js
module.export = {
    //...
    optimization: {
        //...
        usedExports: true,
    },
}
```

### 优化打包速度
你可能听说过dll打包，但是你现在就当没听过吧,目前webpack的优化已经非常不错了，dll没有继续维护的必要。dll打包在操作上过于繁琐，无论是vue-cli还是还是create-react-app都不再使用，hard-source-webpack-plugin能有些帮助打包速度优化。
> yarn add hard-source-webpack-plugin -D

```js
module.export = {
    //...
    plugins: [
        new HardSourceWebpackPlugin()
    ]
}
```
成功从7s优化至2s

### thread-loader
webpack是单线程的，而放置在这个loader之后的 loader 会被放在一个单独的 worker 池(worker pool)中运行。
貌似没啥用，不过大项目可以试试。

### cache-loader
该主要是将打包好的文件缓存在硬盘的一个目录里，一般存在 node_modules/.cache 下
> yarn add cache-loader -D
```js
module.export = {
    //...
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                "thread-loader",
                "cache-loader",
                "babel-loader"
            ]
        },
    }
}
```