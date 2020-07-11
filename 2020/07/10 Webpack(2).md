# webpack

### module

```js
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/, //忽略第三方库解析
  },
};
```

### 配置 babel

> yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D

```js
/**
 *@babel/core:@babel/core-babel核心模块
 *@babel/preset-env:编译ES6等
 *@babel/plugin-transform-runtime: 避免 polyfill 污染全局变量，减小打包体积
 */
//webpack.config.js
module.exports = {
  //...
  module: {
    //...
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
//babel.config.js
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: ["@babel/plugin-transform-runtime"],
};
```

### 配置 css+postcss+less(scss)

为了配合效果，先安装 Vue/React,选取自己熟悉的环境安装，这边选取 Vue。

> yarn add vue  
> yarn add vue-loader vue-template-compiler -D  
> yarn add style-loader css-loader postcss-loader less less-loader -D  
> yarn add autoprefixer

```js
//index.js
import Vue from 'vue';
import App from './App.vue';

new Vue({
    render: h => h(App)
}).$mount("#app");

//App.vue
<template>
    <div class="app">
        APP
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="less" scoped>
.app {
    font-size: 20px;
    color: aqua;
}
</style>

//webpack.config.js
module.export = {
  //...
  module:{
    rules:[
      //...
      {//解析vue模板
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {//解析less
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
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
  resolve: {
    //...
    extensions:['.js','.vue']//配置后缀名，这样引入文件不需要加.vue
  },
}

//postcss.config.js用来配置postcss插件
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};

```

loader 是有解析顺序的，顺序是从后往前/从右往左。为什么呢？
打个比方就好理解：工厂流水线。loader 就是流水线上的一道道工序，先提取原材料，做成产品，添加包装，装箱售卖，没有人会将工序倒过来干。loader 就是这样一道道工序，具体可以了解下 loader 的作用和写法，具体等以后。

### 配置图片解析

> yarn add file-loader url-loader -D

```js
module: {
    rules: [
      {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            esModule: false
          },
        },
      ],
    },
  ]
```
好了，目前为止，一个勉强能用的webpack就算配置好了。

我们来打包一下...

当你看见dist的时候，果然是勉强能用吧，所有东西都混在一起了，css也不见踪影，虽然我们并不会去调试dist，但是写代码这一行强迫症多啊。