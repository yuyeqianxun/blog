```js
Function.prototype.myCall = function (context, ...args) {
  let context = context || window
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args)
  delete context.fn
  return result
}
```
```js
Function.prototype.myApply  = function (context, args) {
  let context = context || window
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args)
  delete context.fn
  return result
}
```