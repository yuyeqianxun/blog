# Array

### Array.length
Array 构造函数的 length 属性，其值为1（注意该属性为静态属性，不是数组实例的 length 属性）。

### get Array[@@species]
Array[Symbol.species],返回 Array 构造函数。

### Array.prototype
通过数组的原型对象可以为所有数组对象添加属性。

### Array.from(arrayLike[, mapFn[, thisArg]])
- arrayLike: 类数组或可迭代对象
- mapFn: 可选。一个函数，会遍历arrayLike执行该函数
- thisArg: 可选。回调函数mapFn的this对象
```js
Array.from([1, 2, 3], x => x + x);
```

从类数组对象或者可迭代对象中创建一个新的数组实例。

### Array.isArray(obj)
- obj:要检测的对象

用来判断某个变量是否是一个数组对象。

### Array.of(element0[, element1[, ...[, elementN]]])
- elementN:参数
```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

根据一组参数来创建新的数组实例，支持任意的参数数量和类型。

## 以下会改变自身

### Array.prototype.copyWithin(index[, start[, end]]) 
- index: 索引，复制序列到该位置。如果是负数，index = arr.length + index。如果 index 大于等于 arr.length，将会不发生拷贝。如果 index 在 start 之后，复制的序列将被修改以符合 arr.length。
- start: 索引，复制开始的位置。如果是负数，start = arr.length + start。如果 start 被忽略，copyWithin 将会从0开始复制。
- end: 索引，复制结束的位置。如果是负数，end = arr.length + end。如果 end 被忽略，copyWithin 将会从0开始复制。
```js
[1, 2, 3, 4, 5].copyWithin(2)//[1,2,1,2,3]
[1, 2, 3, 4, 5].copyWithin(0, 3)// [4, 5, 3, 4, 5]
```

在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值，不会改变数组的长度，忽略后两个参数并不是将从头复制到尾，而是替换索引到结束位置。

### Array.prototype.fill(value[, start[, end]]) 
- value: 要填充的值
- start: 填充开始位置
- end: 填充结束位置，不包括该位置, 默认为arr.length
```js
[1, 2, 3].fill(4); //[4, 4, 4]
[1, 2, 3].fill(4,1); //[1, 4, 4]
[1, 2, 3].fill(4,1,2); //[1, 4, 3]
[1, 2, 3].fill(4,1,3); //[1, 4, 4]
```

将数组中指定区间的所有元素的值，都替换成某个固定的值。

### Array.prototype.pop()
```js
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(plants.pop());
```

删除数组的最后一个元素，并返回这个元素, []返回undefined。

### Array.prototype.push(element1, ..., elementN)
```js
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");
console.log(sports,total)// ["soccer", "baseball", "football", "swimming"], 4
```

在数组的末尾增加一个或多个元素，并返回数组的新长度。

### Array.prototype.reverse()
```js
const a = [1, 2, 3];
a.reverse(); 
console.log(a); // [3, 2, 1]
```
颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

### Array.prototype.shift()
```js
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];
var shifted = myFish.shift(); 
console.log(myFish,shifted); // ["clown", "mandarin", "surgeon"] "angel"
```
删除数组的第一个元素，并返回这个元素。

### Array.prototype.sort(compareFunction)
```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);
//如果 compareFunction(a, b) 小于 0 ，会从小到大排
//如果 compareFunction(a, b) 大于 0 ，会从大到小排
```
对数组元素进行排序，并返回当前数组。

### Array.prototype.splice(index[, deleteCount[, item1[, item2[, ...]]]])
- index: 指定修改的索引位置，超过arr.length,则添加到末尾，为负数，则为arr.length+index
- deleteCount: 要移除的数组元素的个数
- itemN: 要添加进数组的元素，如果不指定则只删除元素
```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 2, 'drum', 'guitar');
console.log(myFish,removed)//["angel", "clown", "drum", "guitar"],["mandarin", "sturgeon"]
```
在任意的位置给数组添加或删除任意个元素,返回由被删除的元素组成的一个数组。

### Array.prototype.unshift(element1, ..., elementN)
- elementN: 要添加到数组开头的元素或多个元素
```js
let arr = [4,5,6];
arr.unshift(1,2,3);
console.log(arr); // [1, 2, 3, 4, 5, 6]
```
在数组的开头增加一个或多个元素，并返回数组的新长度。

## 以下不会改变数组，但会返回一个新数组或期望值 

### Array.prototype.concat()
```js
var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];
var nums = num1.concat(num2, num3);
console.log(nums); //[1, 2, 3, 4, 5, 6, 7, 8, 9]
```
返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

### Array.prototype.includes(valueToFind[, fromIndex]) 
- valueToFind: 需要查找的值
- fromIndex: 索引开始的位置
```js
var arr = ['a', 'b', 'c'];
arr.includes('c');   // true
arr.includes('c', 100); // false
```
判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

### Array.prototype.join(separator)
- separator: 可选，分割符,默认为","
```js
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      //"Wind,Rain,Fire"
```

连接所有数组元素组成一个字符串。

### Array.prototype.slice(begin[, end])
- begin: 开始索引，负值时为arr.length+begin
- end: 结束索引，不包括在里面，默认arr.length
```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
console.log(fruits,citrus);
// ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// ['Orange','Lemon']
```

抽取当前数组中的一段元素组合成一个新数组。

### Array.prototype.toString()
```js
const array1 = [1, 2, 'a', '1a'];
const array2 = [];
console.log(array1.toString(),array2.toString());//"1,2,a,1a",""
```
返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。

### Array.prototype.toLocaleString()
返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。

### Array.prototype.indexOf(searchElement[, fromIndex])
返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

### Array.prototype.lastIndexOf(searchElement[, fromIndex])
返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

## 迭代

### Array.prototype.forEach(callback(currentValue [, index [, array]])[, thisArg])
- callback: 为数组中每个元素执行的函数
  - currentValue: 正在处理的当前元素
  - index: 可选。当前元素索引
  - array: 可选。当前数组
- thisArg: callback的this

调用 forEach 后
- 添加到数组中的项不会被 callback 访问到。
- 如果已经存在的值被改变，则传递给 callback 的值是 forEach() 遍历到他们那一刻的值。
- 已删除的项不会被遍历到。
```js
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
// one,two,four
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.pop();
  }
});
// one,two,three
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.push('five');
  }
});
// one,tow,three,four
```
为数组中的每个元素执行一次回调函数。

### Array.prototype.entries() 
将数组转为迭代器，注意与Object方法完全不同
```js
var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next());
```
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

### Array.prototype.every(callback[, thisArg])
- callback: 用来测试每个元素的函数，它可以接收三个参数：
  - element: 当前值
  - index: 可选。当前索引
  - array: 当前数组
- thisArg: callback的this
```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
```
如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

### Array.prototype.some(callback[, thisArg])
- callback: 用来测试每个元素的函数，它可以接收三个参数：
  - element: 当前值
  - index: 可选。当前索引
  - array: 当前数组
- thisArg: callback的this
```js
function isBigThan10(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].some(isBigEnough);   // true
```
如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

### Array.prototype.filter(callback[, thisArg])
- callback: 用来测试每个元素的函数，它可以接收三个参数：
  - element: 当前值
  - index: 可选。当前索引
  - array: 当前数组
- thisArg: callback的this
```js
function isBigThan10(element, index, array) {
  return element >= 10;
}
let arr = [12, 5, 8, 130, 44].filter(isBigEnough);   // [12, 130, 44]
```
将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

### Array.prototype.find(callback[, thisArg])
- callback: 用来测试每个元素的函数，它可以接收三个参数：
  - element: 当前值
  - index: 可选。当前索引
  - array: 当前数组
- thisArg: callback的this
```js
function isBigThan10(element, index, array) {
  return element >= 10;
}
let res = [12, 5, 8, 130, 44].find(isBigEnough);   // 12
```
找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。

### Array.prototype.findIndex() 
找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。

### Array.prototype.keys() 
```js
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']//不会找出空数组
console.log(denseKeys);  // [0, 1, 2]//会找出undefined
```
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

### Array.prototype.map(callback[, thisArg])
- callback: 用来测试每个元素的函数，它可以接收三个参数：
  - element: 当前值
  - index: 可选。当前索引
  - array: 当前数组
- thisArg: callback的this

返回一个由回调函数的返回值组成的新数组。

### Array.prototype.reduce(callback[, initialValue])
- callback: 用来测试每个元素的函数，它可以接收三个参数：
  - accumulator: 累积值
  - element: 当前值
  - index: 可选。当前索引
  - array: 当前数组
- initialValue: 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素

从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

### Array.prototype.reduceRight(callback[, initialValue])
- callback: 用来测试每个元素的函数，它可以接收三个参数：
  - accumulator: 累积值
  - element: 当前值
  - index: 可选。当前索引
  - array: 当前数组
- initialValue: 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素

从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

### Array.prototype.values() 
创建一个迭代器，和entries类似。

返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。

### Array.prototype[@@iterator]() 
```js
arr[Symbol.iterator]()
```
和上面的 values() 方法是同一个函数。