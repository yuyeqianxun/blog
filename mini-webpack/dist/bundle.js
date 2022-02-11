(function (graph) {
  function require(file) {
    var exports = {};
    function absRequire(relPath) {
      return require(graph[file].deps[relPath]);
    }
    (function (require, exports, code) {
      eval(code);
    })(absRequire, exports, graph[file].code);
    return exports;
  }
  require("./src/index.js");
})({
  "./src/index.js": {
    deps: { "./minus.js": "./src\\minus.js", "./add.js": "./src\\add.js" },
    code: '"use strict";\n\nvar _minus = _interopRequireDefault(require("./minus.js"));\n\nvar _add = _interopRequireDefault(require("./add.js"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n\nconsole.log(\'3-1 = >>>>>>\', (0, _minus["default"])(3, 1));\nconsole.log(\'3+1 = >>>>>>\', (0, _add["default"])(3, 1));',
  },
  "./src\\minus.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\n\n// minus.js \nvar _default = function _default(a, b) {\n  return a - b;\n};\n\nexports["default"] = _default;',
  },
  "./src\\add.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\n\n// add.js \nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports["default"] = _default;',
  },
});
