# 获取函数返回类型

```ts
// qu
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"

// an
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer U
  ? U
  : never;
```

# 实现 Omit

```ts
// qu
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};

// an
type MyExclude<T, U> = T extends U ? never : T;

type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P];
};

type MyOmit<T, K extends keyof T> = {
  [U in keyof T as U extends K ? never : U]: T[U];
};
```

# Readonly 2

```ts
// qu
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK

// an
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & { readonly [P in K]: T[P] }; //意思是type PickedReadonly<T,keyof T>
```

# 实现深度 readonly

```ts
type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type Todo = DeepReadonly<X>; // should be same as `Expected`

type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
```

# 元组转数组

```ts
type Arr = ["1", "2", "3"];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

type TupleToUnion<T extends any[]> = T[number];
```

# 可串联构造器

```ts
//你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。
declare const config: Chainable;

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// 期望 result 的类型是：
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}

type Chainable<T = {}> = {
  //传入一个默认对象保存{key:value}
  option<K extends string, V extends unknown>(
    key: K extends keyof T ? never : K, //如果K已经存在，就不处理
    value: V
  ): Chainable<T & { [P in K]: V }>; //合并已存在的key
  get(): T;
};
```

# 最后一个元素

```ts
// qu
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1

// an
type Last<T extends any[]> = T extends [...infer Rest, infer Last]
  ? Last
  : never;
```

# 出堆

```ts
// qu
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]

// an
type Pop<T extends any[]> = T extends [...infer A, infer L] ? A : never;
```

# Promise.all

```ts
// qu
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

// expected to be `Promise<[number, 42, string]>`
const p = Promise.all([promise1, promise2, promise3] as const);

// an
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;
```
