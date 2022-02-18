实现一个 compose 函数

```js
// 用法如下:
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // fn1(fn2(fn3(fn4(1))))
```

```js
function compose(...fns) {
  return function (params) {
    if (!fns.length) return params;
    if (fns.length === 1) return fns[0](params);
    return fns.reduceRight((prev, curr) => {
      return curr(prev);
    }, params);
  };
}
```
