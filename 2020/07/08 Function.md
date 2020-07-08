# Function

```js
//在某些源码中创建函数会用到
const adder = new Function("a", "b", "return a + b");
```

### Function.caller 
获取调用函数的具体对象。

### Function.length
获取函数的接收参数个数。

### Function.name 
获取函数的名称。

### Function.displayName 
获取函数的display name。

### Function.prototype.constructor
声明函数的原型构造方法，详细请参考 Object.constructor 。

### Function.prototype.apply()
在一个对象的上下文中应用另一个对象的方法；参数能够以数组形式传入。

### Function.prototype.bind()
bind()方法会创建一个新函数,称为绑定函数.当调用这个绑定函数时,绑定函数会以创建它时传入 bind()方法的第一个参数作为 this,传入 bind()方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数.

### Function.prototype.call()
在一个对象的上下文中应用另一个对象的方法；参数能够以列表形式传入。

### 箭头函数
```js
//没有this，arguments，super，new.target，prototype，不能用yield
/**
*new.target属性允许你检测函数或构造方法是否是通过new运算符被调用的。在通过new运算符被初始*化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，*new.target 的值是undefined。所以箭头函数不能new。
*super关键字用于访问和调用一个对象的父对象上的函数。
*/
(param1, param2, …, paramN) => expression
```

