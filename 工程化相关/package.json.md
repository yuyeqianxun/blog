仅列出常用字段，以及一些非官方但约定俗成的字段
```json
{
  "name": "app", //项目名称(包名称)，必填，不能以.或_开头，不能有大写字母，发布到npm上会形成链接，通常引入的项目名称就是name(import xxx from app)
  "version": "1.0.0", //项目版本号
  "description": "app is a test demo", //项目描述
  "keywords": ["test", "project"], //关键字
  "homepage": "https://www.github.com", //项目主页
  "bugs": { //用于bug反馈issue地址或者邮箱。
    "url": "https://github.com/someone/app/issues", 
    "email": "someone@github.com" 
  },
  "license": "MIT", //项目开源协议
  "author": "someone", //作者
  "contributors": [ //贡献者
    { "name": "someone", "email": "someone@github.com" }
  ],
  "files": [ //npm publish文件发布列表，.npmignore优先级更高，如果文件被忽略，那列表中的文件不会被发布
    "es",
    "lib"
  ],
  "main": "lib/index.js", //项目的入口，require加载的就是该文件
  "module": "es/index.js", //项目的入口，通常是符合es module规范的项目入口
  "typings": "lib/index.d.ts", //ts项目入口
  "bin": { //用来指定每个内部命令对应的可执行文件的位置，定制脚手架经常用到
    "webpack": "bin/index.js",
  }, 
  "repository": { //指定源码地址
    "type": "git",
    "url": "https://github.com"
  },
  "scripts": { //管理项目命令
    "start": "webpack serve --config webpack.config.dev.js --progress"
  },
  "dependencies": {}, //生产依赖包
  "devDependencies": {}, //开发依赖包
  "peerDependencies": {}, //环境依赖包，通常UI库、插件等不会将宿主库打包进入项目(elementui是为vue开发的ui库，但最终代码并不会将vue代码打包，由具体项目为elementui提供vue依赖包)
  "engines": { "node": "0.10.x" }, //指定环境
  "os": ["win32", "darwin", "linux"], //操作系统
  "cpu": ["x64", "ia32"], //cpu
  "private": false, //是否私有，当为true，npm将不能发布
  "publishConfig": { //配置发布地址
    "registry": "https://registry.npmjs.org/"
  },
  "workspace": [ //memorepo项目指定的包路径，yarn私有字段
    "packages/*",
  ],
  "sideEffects": false, //tree-shaking相关，通常指明哪些文件有副作用，会影响tree-shaking
  "unpkg": "lib/xx.min.js", //cdn
  "jsdelivr": "lib/xx.min.js", //cdn
  "gitHooks": { //操作git时的钩子，具体配置查看git
    "pre-commit": "lint-staged"
  },
  "lint-staged": { //代码检查
    "*.{js,jsx,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  },
  "browserslist": [ //浏览器要求
    "last 3 Chrome versions"
   ]
}
```
