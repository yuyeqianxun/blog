# Object

### Object.assign(target, ...sources)

- target: 目标对象
- sources: 源对象 1.不会深拷贝 2.会调用对象 get,set 3.继承属性和不可枚举属性是不能拷贝的 4.原始类型会被包装为对象,但只有字符串能拷贝 5.报错会中断拷贝

通过复制一个或多个对象来创建一个新的对象。

```js
const v1 = "abc";
const v2 = true;
const v3 = null;
const v4 = undefined;
const v5 = 123;
const v6 = Symbol("fn");
const obj1 = Object.assign({}, v1); // { "0": "a", "1": "b", "2": "c" }
const obj2 = Object.assign({}, v2); // {}
const obj3 = Object.assign({}, v3); // {}
const obj4 = Object.assign({}, v4); // {}
const obj5 = Object.assign({}, v5); // {}
const obj6 = Object.assign({}, v6); // {}
```

### Object.create(proto[, propertiesObject])

- target: 源对象
- proto: 可选。相当于 Object.defineProperties()

```js
var o = {},
  o2 = {},
  obj = { c: 1 };
o = Object.create(obj); //{},o.__proto__===obj
o2 = Object.create(obj, {
  foo: {
    writable: true,
    configurable: true,
    value: "hello",
  },
}); //{foo: "hello"},o2.__proto__===obj
o3 = Object.create(null); //保证原型链是空的
```

使用指定的原型对象和属性创建一个新对象。

### Object.defineProperty(obj, prop, descriptor)

- obj:要定义属性的对象
- prop:要定义或修改的属性的名称或 Symbol
- descriptor:要定义或修改的属性描述符

数据描述符和存取描述符不能一同使用。

- configurable:描述符是否可修改，默认 false
- enumerable:属性是否可枚举，默认 false
- value:属性值
- writable:属性是否可修改
- get:属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。
- set:属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。

| 描述       | configurable | enumerable | value | writable | get  | set  |
| ---------- | ------------ | ---------- | ----- | -------- | ---- | ---- |
| 数据描述符 | 可           | 可         | 可    | 可       | 不可 | 不可 |
| 存取描述符 | 可           | 可         | 不可  | 不可     | 可   | 可   |

给对象添加一个属性并指定该属性的配置。

```js
var o = {},
  o1 = {};
temperature = 1;
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(o1, "a", {
  get: function () {
    console.log("get!");
    return temperature;
  },
  set: function (value) {
    temperature = value;
  },
});
```

### Object.defineProperties()

给对象添加多个属性并分别指定它们的配置。

### Object.entries(obj)

- obj: 可以返回其可枚举属性的键值对的对象

返回给定对象自身可枚举属性的 [key, value] 数组。

```js
const obj = { foo: "bar", baz: 42 };
const arr = [1, 2, 3];
const str = "123";
Object.entries(obj); // [ ['foo', 'bar'], ['baz', 42] ]
Object.entries(arr); // [ ['0', '1'], ['1', 2], ['2', 3] ]
Object.entries(str); // [ ['0', '1'], ['1', '2'], ['2', '3'] ]
```

### Object.freeze(obj)

- obj: 被冻结的对象
  冻结对象：其他代码不能删除或更改任何属性。

### Object.getOwnPropertyDescriptor(obj, prop)

- obj: 需要查找的目标对象
- prop: 目标对象内属性名称

返回对象指定的属性描述符。

```js
var o = {},
  o1 = {};
temperature = 1;
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(o1, "a", {
  get: function () {
    console.log("get!");
    return temperature;
  },
  set: function (value) {
    temperature = value;
  },
});
let d = Object.getOwnPropertyDescriptor(o, "a"); //{value: 1, writable: true, enumerable: true, configurable: true}
let d1 = Object.getOwnPropertyDescriptor(o1, "a"); //{enumerable: false, configurable: false, get: ƒ, set: ƒ}
```

### Object.getOwnPropertyNames(obj)

返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名,但不包含原型链和 Symbol 属性。

```js
var my_obj = { a: 1 };
Object.defineProperty(my_obj, "b", {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: false,
});
my_obj[Symbol("fn")] = 4;
let res = Object.getOwnPropertyNames(my_obj); //["a", "b"]
```

### Object.getOwnPropertySymbols()

返回一个数组，它包含了指定对象自身所有的符号属性，仅限 Symbol。

### Object.getPrototypeOf(obj)

- obj: 指定的对象
  返回指定对象的原型对象。

```js
function Father() {}
let child = new Father();
let f = Object.getPrototypeOf(child);
console.log(f === child.__proto__); //true
let empty = Object.create(null);
console.log(empty.__proto__, Object.getPrototypeOf(empty)); //undefined,null
```

### Object.is(value1, value2)

比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。

```js
Object.is(0, -0); //false
0 === -0; //true
Object.is(NaN, NaN); //true
NaN === NaN; //false
```

### Object.isExtensible()

Object.preventExtensions,Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible

判断对象是否可扩展。

### Object.isFrozen()

判断对象是否已经冻结。

### Object.isSealed()

判断对象是否已经密封。

> 以上几个在 MDN 文档有误,用的也不多

### Object.keys()

返回一个包含所有给定对象自身可枚举属性名称的数组。

### Object.preventExtensions()

防止对象的任何扩展。

### Object.seal()

防止其他代码删除对象的属性。

### Object.setPrototypeOf()

设置对象的原型（即内部 [[Prototype]] 属性），尽量使用 Object.create()

### Object.values()

返回给定对象自身可枚举值的数组。

### Object.prototype.hasOwnProperty(prop)

- prop: 要检测的属性的 String 字符串形式表示的名称，或者 Symbol。

返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。

### Object.prototype.isPrototypeOf(object)

- object: 在该对象的原型链上搜寻

```js
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();
//baz.__proto__=Baz.prototype
//Baz.prototype.__proto__=Bar.prototype
//Bar.prototype.__proto__=Foo.prototype
console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

返回一个布尔值，表示指定的对象是否在本对象的原型链中。

### Object.prototype.propertyIsEnumerable()

判断指定属性是否可枚举，内部属性设置参见 ECMAScript [[Enumerable]] attribute 。

### Object.prototype.toLocaleString()

直接调用 toString()方法。

### Object.prototype.toString()

返回对象的字符串表示。

### Object.prototype.valueOf()

返回指定对象的原始值。

