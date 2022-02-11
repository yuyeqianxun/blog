```js
Promise.myAll = function (list) {
  let result = [];
  //声明一个计数器 每一个promise返回就加一
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < list.length; i++) {
      //这里用 Promise.resolve包装一下 防止不是Promise类型传进来
      Promise.resolve(list[i]).then(
        (res) => {
          //这里不能直接push数组  因为要控制顺序一一对应(感谢评论区指正)
          result[i] = res;
          count++;
          //只有全部的promise执行成功之后才resolve出去
          if (count === list.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};
Promise.myRace = function (list) {
  return new Promise((resolve, reject) => {
      for (let i = 0; i < list.length; i++) {
        Promise.resolve(list[i]).then(
          (res) => {
            //promise数组只要有任何一个promise 状态变更  就可以返回
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
};

```
