# 术语
1.1 Promise是一个具有then方法的对象或函数，其行为符合此规范
1.2 thenable是一个定义了then方法的对象或函数
1.3 value是任何合法的JavaScript值
1.4 exception是使用throw语句抛出的值
1.5 reason是表明Promise进入rejected原因的一个值

# 需求
2.1 Promise状态
Promise必须处于以下三种状态之一：pending, fulfilled, 和 rejected.
2.1.1 处于pending态，Promise
  2.1.1.1 可能会转换为fulfilled或者rejected
2.1.2 处于fulfilled态，Promise
  2.1.2.1 不能再转变为任何状态
  2.1.2.2 必须有一个value，不能再改变
2.1.3 处于rejected态，Promise
  2.1.3.1 不能再转变为任何状态
  2.1.3.2 必须有一个reason，不能再改变

2.2 then方法
Promise必须提供一个then方法，去访问其当前或最终then。
then函数必须接受两个参数：
```js
promise.then(onFulfilled, onRejected)
```
2.2.1 onFulfilled和onRejected都是可选参数
  2.2.1.1 如果onFulfilled不是函数，忽略它
  2.2.1.2 如果onRejected不是函数，忽略它
2.2.2 如果onFulfilled是函数：
  2.2.2.1 它必须在Promise进入fulfilled态后被执行，将Promise的value作为它第一个参数
  2.2.2.2 它一定不能在Promise进入fulfilled态前被执行
  2.2.2.3 它一定不能被执行超过一次
2.2.3 如果onRejected是函数：
  2.2.3.1 它必须在Promise进入rejected态后被执行，将Promise的reason作为它第一个参数
  2.2.3.2 它一定不能在Promise进入rejected态前被执行
  2.2.3.3 它一定不能被执行超过一次
2.2.4 onFulfilled 或 onRejected，直到上下文堆栈仅包含平台代码之前，不得调用[3.1]
2.2.5 onFulfilled 和 onRejected必须被作为函数调用[3.2]
2.2.6 在同一个Promise，then可能被多次调用
  2.2.6.1 如果当Promise是fulfilled态，所有各自的onFulfilled回调都必须按照其原始调用顺序执行
  2.2.6.2 如果当Promise是rejected态，所有各自的onRejected回调都必须按照其原始调用顺序执行
2.2.7 then必须返回一个Promise[3.3]
```js
promise2 = promise1.then(onFulfilled, onRejected);
```
  2.2.7.1 如果onFulfilled或onRejected返回值x，请运行Promise兼容程序 [[Resolve]](promise2，x)
  2.2.7.2 如果onFulfilled或onRejected抛出错误e，promise2必须以e为reason进入rejected态
  2.2.7.3 如果onFulfilled不是一个函数，并且promise1已经是fulfilled态，promise2必须以promise1同样的value进入fulfilled态
  2.2.7.4 如果onRejected不是一个函数，并且promise1已经是rejected态，promise2必须以promise1同样的reason进入fulfilled态

2.3 Promise兼容程序
Promise兼容程序是一个将promise和value作为参数的抽象程序。如果x是一个thenable对象，假设x至少在行为上类似于Promise，Promise将会试着采用x的state。否则Promise会将x作为value进入fulfilled态。
这种对thenable的处理允许promise实现互操作，只要他们符合Promises / A +的then方法规范，它还允许符合Promises / A +的规范实现的then方法“整合”不合格的实现。
运行 [[Resolve]](promise2，x)，遵循以下步骤：
2.3.1 如果promise2和x引用了同一个对象，Promise将TypeError作为reason进入rejected态
2.3.2 如果x是一个Promise，采取它的state：[3.4]
  2.3.2.1 如果x是pending态，Promise必须保持pending态直到x进入fulfilled态或者rejected态
  2.3.2.2 如果当x是fulfilled态，Promise以x的value进入fulfilled态
  2.3.2.3 如果当x是rejected态，Promise以x的reason进入rejected态
2.3.3 否则，如果x是一个对象或者函数
  2.3.3.1 将x.then赋值给then。[3.5]
  2.3.3.2 如果x.then取值报错，报错为e，Promise以e为reason进入rejected态
  2.3.3.3 如果then是一个函数，将x作为this执行它，参数为resolvePromise和rejectPromise
    2.3.3.3.1 如果当resolvePromise以y为value执行，执行[[Resolve]](promise, y)
    2.3.3.3.2 如果当rejectPromise以r为reason执行，Promise以r为reason进入rejected态
    2.3.3.3.3 如果resolvePromise和rejectPromise同时执行，或多次调用同一个参数，只执行第一次，以后忽略
    2.3.3.3.4 如果then抛出一个错误e：
      2.3.3.3.4.1 如果resolvePromise和rejectPromise已经被执行，忽略错误
      2.3.3.3.4.2 否则，Promise以e为reason进入rejected态
  2.3.3.4 如果then不是一个函数，Promise以x为value进入fulfill态
2.3.4 如果x既不是对象也不是函数，Promise以x为value进入fulfilled态
如果Promise以thenable对象为解决状态参与到thenable循环链中，[[Resolve]](promise, thenable)的递归性质会使得[[Resolve]](promise, thenable)再次调用，遵循上述算法将导致无限递归。鼓励这样实现，但是并不是必须这样实现，检测此类递归并拒绝Promise，并提供信息丰富的TypeError作为reason[3.6]

# 笔记
3.1 这里的“平台代码”是指引擎，环境和Promise实现代码。实际上，此要求可以确保在event loop之后，当then被调用，onFulfilled 和 onRejected能够在新的evenloop中异步执行，可以使用宏任务机制“setTimeout”或者“setImmediate”或者微任务机制“MutationObserver”、“process.nextTick”实现，由于promise实现被视为平台代码，因此它本身可能包含任务调度队列或“蹦床”，在其中调用处理程序。(没翻译好，能看懂大概意思)
3.2 也就是说，在严格模式下，这在它们内部是不确定的。 在草率模式下，它将是全局对象。
3.3 如果实现满足所有要求，则实现可以允许promise2 === promise1。但每个实现都应记录promise2 === promise1的原因
3.4 通常，只有x来自当前的实现，才知道它是一个真正的Promise。 本节允许特定实现的使用意味着采用已知符合承诺的state
3.5 首先存储对x.then的引用，然后测试该引用，然后调用该引用的过程避免了对x.then属性的多次访问。 此类预防措施对于确保访问者属性的一致性非常重要，因为访问者属性的值在两次检索之间可能会发生变化
3.6 实现不应在thenable链的深度上做任意限制，并假定超出该任意限制，则递归将是无限的。 只有真正的循环才应该导致TypeError； 如果遇到无限多个不同的Promise，则永远递归是正确的行为