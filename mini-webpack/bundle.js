const options = require("./mwebpack.config");
const fs = require("fs");
const path = require('path');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

// 创建一个 MiniWebpack 类
class MiniWebpack {
  constructor(options) {
    // 配置项
    this.options = options;
  }

  // 解析入口文件
  parse(filename) {
    // 利用 Node 的核心模块 fs 读取文件
    const fileBuffer = fs.readFileSync(filename, "utf-8");
    // 基于 @babel/parser 解析文件得到 AST
    const ast = parser.parse(fileBuffer, { sourceType: "module" });
    const deps = {}; // 用来收集依赖
    // 遍历 AST
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        const absPath = "./" + path.join(dirname, node.source.value);
        deps[node.source.value] = absPath;
      },
    });
    // 代码转换
    const { code } = babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    const moduleInfo = { filename, deps, code };
    return moduleInfo;
  }
  
  // 收集模块依赖图
  analyse(file) {
    // 定义依赖图
    const depsGraph = {};
    // 首先获取入口的信息
    const entry = this.parse(file);
    const temp = [entry];
    for (let i = 0; i < temp.length; i++) {
      const item = temp[i];
      const deps = item.deps;
      if (deps) {
        // 遍历模块的依赖，递归获取模块信息
        for (const key in deps) {
          if (deps.hasOwnProperty(key)) {
            temp.push(this.parse(deps[key]));
          }
        }
      }
    }
    temp.forEach((moduleInfo) => {
      depsGraph[moduleInfo.filename] = {
        deps: moduleInfo.deps,
        code: moduleInfo.code,
      };
    });
    return depsGraph;
  }
  
  // 生成最终执行的代码
  generate(graph, entry) {
    // 是一个立即执行函数
    return `(function(graph){
        function require(file) {
            var exports = {};
            function absRequire(relPath){
                return require(graph[file].deps[relPath])
            }
            (function(require, exports, code){
                eval(code)
            })(absRequire, exports, graph[file].code)
            return exports
        }
        require('${entry}')
    })(${graph})`;
  }
  
  // 指定打包后的文件的目录
  outputFile(output, code) {
      const {path: dirPath, filename} = output;
      const outputPath = path.join(dirPath, filename);
      if(!fs.existsSync(dirPath)){
          fs.mkdirSync(dirPath)
      }
      fs.writeFileSync(outputPath, code, 'utf-8')
  }
  
  // 将所有打包逻辑串起来
  bundle(){
      const {entry, output} = this.options
      const graph = this.analyse(entry)
      const graphStr = JSON.stringify(graph)
      const code = this.generate(graphStr, entry)
      this.outputFile(output, code)
  }
}

// 实例化一个 MiniWebpack
const miniWebpack = new MiniWebpack(options)

// 运行打包逻辑
miniWebpack.bundle()