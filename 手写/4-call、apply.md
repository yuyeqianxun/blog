```js
Function.prototype.myCall = function (context, ...args) {
  let that = context || window
  let fn = Symbol();
  that[fn] = this;
  let result = that[fn](...args)
  delete that[fn]
  return result
}
```
```js
Function.prototype.myApply  = function (context, args) {
  let that = context || window
  let fn = Symbol();
  that[fn] = this;
  let result = that[fn](...args)
  delete that[fn]
  return result
}
```