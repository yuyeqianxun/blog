```js
Function.prototype.myBind = function (context, ...args) {
    const fn = this
    args = args ? args : []
    function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs)
        }
        return fn.apply(context, [...args,...newFnArgs])
    }
    function Fn() {};
    Fn.prototype = this.prototype;
    newFn.prototype = new Fn();
    return newFn
}
```