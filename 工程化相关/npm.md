# npm script
package.json中通常有一列scripts命令用来管理项目
```json
"scripts": {
    "dev": "vite", // 启动开发服务器
    "build": "vite build", // 为生产环境构建产物
    "serve": "vite preview" // 本地预览生产构建产物
}
```
当我们用==npm run dev==时，相当于使用了==vite==命令，这样通常有几个好处，比如区分环境、缩短命令等。
==npm run==其实也是==npm run-script==的缩写。

### 原理
```json
"bin": {
    "vite": "bin/vite.js"
},
// https://github.com/vitejs/vite/blob/main/packages/vite/package.json
```
在vite项目中，package.json中有一行bin，这描述了vite这个命令指向了bin/vite.js文件，那么vite就等同于运行了bin/vite.js文件

### script传参
通常我们会在命令中加入一些参数，用以区分环境、差别打包等作用。
在script命令中，除了第一个字符串，之后任何以空格分隔的字符串都是传入的参数，node脚本中可以通过process.argv获取。
```sh
node index.js --mode=test  -a beep -b boop
# [
#   'C:\\Program Files\\nodejs\\node.exe',
#   'D:\\1-code\\blog\\工程化相关\\index.js',
#   '--mode=test',
#   '-a',
#   'beep',
#   '-b',
#   'boop'
# ]
```

# npm version
用以管理版本号的命令  
```sh
# 显示指定版本号
npm version <newversion>
# 主版本+1，其余归0。1.2.3->2.0.0
npm version major
# 小版本+1，修订号归0。1.2.3->1.3.0
npm version minor
# 修订号+1。1.2.3->1.2.4
npm version patch
# 主版本预发布，其余归0。1.2.3->2.0.0-0
npm version premajor
# 小版本预发布，修订号归0。1.2.3->1.3.0-0
npm version preminor
# 修订号预发布。1.2.3->1.2.4-0
npm version prepatch
# 预发布+1。1.2.3->1.2.4-1
npm version prerelease
```

# npm 发布
1. 在package.json中指定包入口文件
```json
{
    "main": "./lib/index.js",
}
```
2. 指定发布的地址，通常是npm源，或公司私服地址
```json
"publishConfig": {
    "registry": "http://xxx.xxxx.xx"
}
```
3. 在.npmignore中指定不需要上传的文件
```
node_modules
src
```
4. 登陆npm(需提前注册)
```sh
# 默认登陆npm源
npm login
# 指定登陆npm源(通常是公司私服)
npm login --registry http://xxx.xxxx.xx
# 账号密码登陆，注意密码是不显示的
# 执行发布
npm publish
```