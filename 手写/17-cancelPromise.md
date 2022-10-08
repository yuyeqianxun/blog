```js
class CancelablePromise<T> {
  /**
   * 构造器
   * @param executor Promise中的 executor
   * @param abortSignal AbortController中的signal对象
   * @returns
   */
  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void,
    abortSignal: AbortSignal
  ) {
    // 记录reject和resolve方法
    let _reject: any = null;
    let _resolve: any = null;
    let _isExecResolve = false;

    // 创建和执行Promise
    const cancelablePromise =
      new Promise() <
      T >
      ((resolve, reject) => {
        _reject = reject;
        _resolve = (value: T) => {
          _isExecResolve = true;
          resolve(value);
        };
        return executor(_resolve, reject);
      });

    // 监听Signal的abourt事件
    abortSignal.addEventListener("abort", () => {
      if (_isExecResolve) {
        return;
      }
      // 抛出错误
      const error = new DOMException(
        "user cancel promise",
        CancelablePromise.CancelExceptionName
      );
      _reject(error);
    });
    return cancelablePromise;
  }

  // 取消后抛出的异常名称
  static CancelExceptionName = "CancelablePromise AbortError";
}

export default CancelablePromise;
```
