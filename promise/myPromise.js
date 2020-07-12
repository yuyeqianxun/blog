const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function myPromise(fn) {
  let _this = this;
  _this.state = PENDING;
  _this.resolveCbs = []; //将then或者catch里的回调函数存起来
  _this.rejectCbs = [];
  //状态改变，开始执行resolve
  function resolve(value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED;
      _this.value = value;
      _this.resolveCbs.forEach((cb) => cb()); //当Promise进入FULFILLED，执行回调函数,回调函数的参数为Promise当前的value
    }
  }

  function reject(reason) {
    if (_this.state === PENDING) {
      _this.state = REJECTED;
      _this.reason = reason;
      _this.rejectCbs.forEach((cb) => cb());
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e); //一旦捕获报错，进入reject函数，改变Promise状态
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  let _this = this;
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : () => _this.value; //在此，你传入的onFulfilled会忽略，被赋值为一个函数，函数返回promise的value能被传递给promise2(值穿透)
  onRejected =
    typeof onRejected === "function" ? onRejected : () => {
      throw _this.reason;
    };; //同上
  let promise2;
  if (_this.state === FULFILLED) {
    //2.2.2
    promise2 = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          //2.2.7.2
          let x = onFulfilled(_this.value);
          resolveProcedure(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  } else if (_this.state === REJECTED) {
    //2.2.3
    promise2 = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          //2.2.7.2
          let x = onRejected(_this.reason);
          resolveProcedure(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  } else {
    //pending态
    promise2 = new myPromise((resolve, reject) => {
      _this.resolveCbs.push(() => {
        setTimeout(() => {
          try {
            //2.2.7.2
            let x = onFulfilled(_this.value);
            resolveProcedure(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
      _this.rejectCbs.push(() => {
        setTimeout(() => {
          try {
            //2.2.7.2
            let x = onRejected(_this.reason);
            resolveProcedure(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    });
  }
  return promise2;
};

myPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

function resolveProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("出错了"));
  }
  let lock = false;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    
    try {
      //2.3.3.2
      let then = x.then; //2.3.3.1
      if (typeof then === "function") {
        then.call(x,y=>{
            if (lock) return;
            lock = true;
            resolveProcedure(promise2, y, resolve, reject)
        },r=>{
            if (lock) return;
            lock = true;
            reject(r);
        }); //2.3.3.3
      } else {
        if (lock) return;
        lock = true;
        resolve(x); //2.3.3.4
      }
    } catch (e) {
      if (lock) return;
      lock = true;
      reject(e);
    }
  } else {
    resolve(x); //2.3.4
  }
}

myPromise.deferred = function() {
  let defer = {};
  defer.promise = new myPromise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
  });
  return defer;
}
try {
  module.exports = myPromise
} catch (e) {}