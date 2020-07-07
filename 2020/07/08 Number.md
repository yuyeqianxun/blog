# Number

### Number.EPSILON
两个可表示(representable)数之间的最小间隔2^-52。js精度问题，在该误差范围内可忽略

### Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER
JavaScript 中最大的安全整数 (2^53 - 1),最小的安全整数 (-(2^53 - 1))。
```js
//js超出安全整数区分不出值相近的两个整数的大小
Math.pow(2, 53) === Math.pow(2, 53) +1;//true
Math.pow(2, 53) +5 === Math.pow(2, 53) +6;//true
Number.MAX_SAFE_INTEGER+10000000 === Number.MAX_SAFE_INTEGER+10000002//true
```

### Number.MAX_VALUE,Number.MIN_VALUE
能表示的最大正数，1.79E+308，大于 MAX_VALUE 的值代表 "Infinity"。最小的负数是 -MAX_VALUE。

### Number.NaN
特殊的“非数字”值。

### Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY
特殊的负无穷大值，在溢出时返回该值，等价于全局对象Infinity

### Number.isNaN()
确定传递的值是否是 NaN。
在 JavaScript 中，NaN 最特殊的地方就是，我们不能使用相等运算符（== 和 ===）来判断一个值是否是 NaN，因为 NaN == NaN 和 NaN === NaN 都会返回 false。因此，必须要有一个判断值是否是 NaN 的方法。
```js
let a = isNaN('a') // true
let a1 = Number.isNaN('a') // false,不会隐式转换
Object.is(NaN,NaN) // true
```

### Number.isFinite()
确定传递的值类型及本身是否是有限数。

### Number.isInteger()
确定传递的值类型是“number”，且是整数。

### Number.isSafeInteger()
确定传递的值是否为安全整数 ( -(253 - 1) 至 253 - 1之间)。

### Number.parseInt(string[, radix]),Number.parseFloat()
- string:要解析的值。 如果此参数不是字符串，则使用ToString抽象操作将其转换为字符串
- 一个介于2到36之间的整数，代表字符串的基数(进制),默认并不是10。表示将解析值当作radix进制来解析
```js
parseInt(0x11)//“0x”开头，会解析16进制，17
parseInt(011)//“0”开头，会解析8进制，9
parseInt(0b11)//“0b”开头，会解析2进制，3
```

和全局对象 parseInt() 一样。

### Number.prototype.toExponential(fractionDigits)
- fractionDigits:一个整数，用来指定小数点后有几位数字

返回一个使用指数表示法表示的该数值的字符串表示,科学记数法。
```js
var numObj = 77.1234;
numObj.toExponential(); //输出 7.71234e+1
numObj.toExponential(4); //输出 7.71234e+1
numObj.toExponential(2); //输出 7.71e+1
```

### Number.prototype.toFixed(digits)
- digits: 保留的小数位数，可能为[0,20]之间范围，默认为 0
返回一个使用定点表示法表示的该数值的字符串表示。该数值在必要时进行四舍五入，另外在必要时会用 0 来填充小数部分，以便小数部分有指定的位数

### Number.prototype.toLocaleString()
返回一个与语言相关的该数值对象的字符串表示。覆盖了Object.
prototype.toLocaleString() 方法。

### Number.prototype.toPrecision()
使用定点表示法或指数表示法来表示的指定显示位数的该数值对象的字符串表示。
```js
var numObj = 5123456;
numObj.toPrecision(1)//"5e+6"
numObj.toPrecision(2)//"5.1e+6"
```

### Number.prototype.toString(radix)
- radix:[2,36],默认10，要转换的数字的进制

返回一个表示该数值对象的字符串。覆盖了 Object.prototype.toString() 方法。

### Number.prototype.valueOf()
返回该数值对象的原始值。覆盖了 Object.prototype.valueOf() 方法。