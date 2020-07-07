# String

## 基本字符串和字符串对象的区别

字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是基本字符串。JavaScript会自动将基本字符串转换为字符串对象，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。

![ascii码](https://note.youdao.com/yws/public/resource/fefa04f064f159e4a063a61949288b11/xmlnote/9FB8267433CD4283A74E65425AAF7FBB/14975)

#### unicode码
16进制的码，由ascii码扩展而来，前面加\u，一般有四位数字一个字节，有些超范围的汉字会有两个字节。

#### String.fromCharCode(num1, ..., numN)
> arguments:一系列UTF-16代码单元的数字
不校验参数，会自动将参数转为16进制，静态方法

作用：将unicode转为字符串
```js
String.fromCharCode(97) //'a'
String.fromCharCode(0x0061) //'a'
String.fromCharCode(0b1100001) //'a'
String.fromCharCode(194564) //不识别
```
fromCharCode()可用于返回最常见值的单个字符（即UCS-2值，即 UTF-16的子集具有最常见的字符）由于高位编码字符是用两个低位编码（lower value）表示形成的一个字符，因此可以使用String.fromCodePoint()

### String.fromCodePoint(num1[, ...[, numN]])
> arguments:一系列 Unicode 编码位置，即“代码点”  
如果传入无效的 Unicode 编码，将会抛出一个RangeError，静态方法

作用：将unicode转为字符串
```js
String.fromCodePoint(97) //'a'
String.fromCodePoint(0x0061) //'a'
String.fromCodePoint(0b1100001) //'a'
String.fromCodePoint(194564) //'你'
```

### String.raw(callSite, ...substitutions)
作用：模板，等同于``,繁琐，不建议用
```js
String.raw({ raw: 'test' }, 0, 1, 2)//`t${0}e${1}s${2}t`
String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script');//`foo${2 + 3}bar${'Java' + 'Script'}baz`
```

### String.prototype.constructor
创造对象的原型对象的特定的函数。

### String.prototype.length
返回了字符串的长度。

### String.prototype.charAt(index)
> arguments:一个介于0 和字符串长度减1之间的整数  
如果没有提供索引，charAt() 将使用0

返回特定位置的字符
```js
'string'.charAt(1)
'string'[1]
'string'.charAt(1.8)
```

### String.prototype.charCodeAt(index)
> arguments:一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。

返回表示给定索引的字符的Unicode的值
```js
'a'.charCodeAt(0) // 97
```
charCodeAt 总是返回一个小于 65,536 的值。为了查看或复制（reproduce）65536 及以上编码字符的完整字符，需要在获取 charCodeAt(i) 的值的同时获取 charCodeAt(i+1) 的值（如同查看/reproducing 拥有两个字符的字符串一样），或者改为获取 codePointAt(i) 的值

### String.prototype.codePointAt(index)
返回表示给定索引的字符的Unicode的值

### String.prototype.concat(string2, string3[, ..., stringN])
> arguments:和原字符串连接的多个字符串。

连接多个字符串文本，并返回一个新的字符串
```
"Hello, ".concat("Kevin", " have a nice day.")//"Hello, Kevin have a nice day."
```
使用赋值操作符（+, +=）代替 concat 方法,性能更高。

### String.prototype.includes(searchString[, position])
> arguments:
 - searchString要在此字符串中搜索的字符串
 - 可选。position开始索引位置,小于 0 则置为0，大于 str.length返回false

当前字符串包含被搜寻的字符串，就返回 true；否则返回 false
```js
var str = 'To be, or not to be, that is the question.';
console.log(str.includes('To be')); //true
```

### String.prototype.endsWith(searchString[, length]),String.prototype.startsWith()
> arguments:
 - 要搜索的子字符串
 - 可选。str 的长度
```js
var str = "To be, or not to be, that is the question.";
alert( str.endsWith("question.") );  // true
alert( str.endsWith("to be") );      // false
alert( str.endsWith("to be", 19) );  // true
```

### String.prototype.indexOf(searchValue [, position])
> arguments:
 - searchValue要搜索的子字符串
 - 可选。position开始索引位置,小于 0，或者大于 str.length ，那么查找分别从 0 和str.length 开始

返回调用它的 String 对象中第一次出现的指定值的索引，如果未找到该值，则返回 -1

### String.prototype.lastIndexOf(searchValue [, position])

### String.prototype.localeCompare()
返回一个数字表示是否 引用字符串 在排序中位于 比较字符串 的前面，后面，或者二者相同，分别返回-1，0，1
```
'a'.localeCompare('b') //-1
'a'.localeCompare('a') //0
'b'.localeCompare('a') //1
```

### String.prototype.match(regexp)
> arguments:正则表达式对象。如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp,不传参数返回[""]

- 如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。str.match() 将返回与 RegExp.exec() 相同的结果
- 如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性。

```js
var str = 'For more information, see Chapter 3.4.5.1';
var re = /e/i;
var re2 = /e/gi;
var found = str.match(re);//["e", index: 7, input: "For more information, see Chapter 3.4.5.1", groups: undefined]
var found2 = str.match(re);//["e", "e", "e", "e"]
```

### String.prototype.padEnd(targetLength [, padString]),String.prototype.padStart(targetLength [, padString])
> arguments:
- targetLength当前字符串需要填充到的目标长度,如果数值小于当前字符串长度，则返回字符串。
- 可选。padString填充字符串。如果字符串太长，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "

在当前字符串尾部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串
```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
```

### String.prototype.repeat(count)
> arguments:介于0和正无穷大之间的整数,值为负报错

包含指定字符串的指定数量副本的新字符串
```js
"abc".repeat(0)      // ""
"abc".repeat(2)      // "abcabc"
"abc".repeat(3.5)    // "abcabcabc" 参数count将会被自动转换成整数.
```

### String.prototype.replace(regexp|substr, newSubStr|function)
> arguments:
- 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
- 一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换
- 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名
- 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果
```js
//参数函数
/**
*match:匹配的子串
*$N:正则分组
*offset:子串在原串的位置
*string:原字符串
*/
function replacer(match, $1, $2, $3, offset, string) {
  
}
```

一个部分或全部匹配由替代模式所取代的新的字符串
```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

### String.prototype.search(regexp)
> arguments: 一个正则表达式（regular expression）对象。如果传入一个非正则表达式对象 obj，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象

对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标;否则，返回 -1
```js
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re));
```

### String.prototype.slice(beginIndex[, endIndex])
> arguments: 
- beginIndex从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待
- 可选。endIndex从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待

摘取一个字符串区域，返回一个新的字符串,不会改动原字符串。


### String.prototype.split(separator[, limit])
> arguments: 
- separator分割符，可以是一个字符串或正则表达式，当正则有括号，则其匹配结果将会包含在返回的数组中
- 可选。limit指定返回的字符串个数

通过分离字符串成字串，将字符串对象分割成字符串数组，不改变字符串。
```js
const myString = 'ca,bc,a,bca,bca,bc';
const splits = myString.split(",");//["ca", "bc", "a", "bca", "bca", "bc"]
const splits2 = myString.split(/,/);//["ca", "bc", "a", "bca", "bca", "bc"]
const splits3 = myString.split(/(,)/);["ca", ",", "bc", ",", "a", ",", "bca", ",", "bca", ",", "bc"]
```

### String.prototype.substr(start[, length])
**可能会被移除掉,但经常有人问**
> arguments: 
- start开始提取字符的位置。如果为负值，则被看作 strLength + start
- 可选。提取的字符长度

通过指定字符数返回在指定位置开始的字符串中的字符，不改变字符串。
```js
var str = "abcdefghij";
str.substr(1,3)//bcd
```

### String.prototype.substring(indexStart[, indexEnd])
> arguments:
- indexStart需要截取的第一个字符的索引,小于0重置为0,NaN重置为0
- 可选。indexEnd需要截取的最后一个字符的索引，大于length重置为length，当indexStart>indexEnd,会自动调换参数
返回在字符串中指定两个下标之间的字符。
```js
var anyString = "Mozilla";
anyString.substring(0,3)
anyString.substring(3,0)
```

### String.prototype.toLocaleLowerCase(locale),String.prototype.toLocaleUpperCase()
根据当前区域设置，将符串中的字符转换成小写。对于大多数语言来说，toLowerCase的返回值是一致的。

### String.prototype.toLowerCase(),String.prototype.toUpperCase()
将字符串转换成小写并返回。不影响字符串

### String.prototype.toString()
返回用字符串表示的特定对象。重写 Object.prototype.toString 方法。

### String.prototype.trim()
从字符串的开始和结尾去除空格。不影响字符串

### String.prototype.trimStart(),String.prototype.trimLeft(),String.prototype.trimEnd(),String.prototype.trimRight() 
 
从字符串的左侧去除空格。

### String.prototype.valueOf()
返回特定对象的原始值。重写 Object.prototype.valueOf 方法。

### String.prototype.[Symbol.iterator]()
返回一个新的迭代器对象，该对象遍历字符串值的索引位置，将每个索引值作为字符串值返回。
```js
var string = 'ABC';
var strIter = string[Symbol.iterator]();
console.log(strIter.next().value);
```