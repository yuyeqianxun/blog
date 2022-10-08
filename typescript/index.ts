type Chainable<T = {}> = {//传入一个默认对象保存{key:value}
  option<K extends string, V extends unknown>(
    key: K extends keyof T ? never : K,//如果K已经存在，就不处理
    value: V
  ): Chainable<T & { [P in K]: V }>//合并已存在的key
  get(): T
}

function A(a,b) {
  
}