# 实现 picker

```ts
// qu
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// an
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

# 实现 readonly

```ts
// qu
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property

// an
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

# 元组转对象

```ts
// qu
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// an
type TupleToObject<T extends readonly (string | number)[]> = {
  [K in T[number]]: K;
};
```

# 第一个元素

```ts
// qu
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3

// an
type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never;
```

# 元组长度

```ts
// qu
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

// an
type Length<T extends readonly any[]> = T["length"];
```

# 实现 Exclude

```ts
// an
type MyExclude<T, U> = T extends U ? never : T;
```

# 实现 awaited

用来获取 Promise 返回的值的类型

```ts
// qu
type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type MyAwaited<X> // expected string
type MyAwaited<Y> // expected { field: number }
type MyAwaited<Z> // expected string | number
// an
type MyAwaited<T extends Promise<any>> = T extends Promise<infer X>
  ? X extends Promise<any>
    ? MyAwaited<X>
    : X
  : never;
```

# 实现 If

```ts
// qu
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

// an
type If<T extends boolean, K, U> = T extends true ? K : U;
```

# 实现 Concat

```ts
// qu
type Result = Concat<[1], [2]>; // expected to be [1, 2]

// an
type Concat<T extends any[], U extends any[]> = [...T, ...U];
```

# 实现 Includes

```ts
// qu
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`

// an
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? Equal<U, F> extends true
    ? true
    : Includes<R, U>
  : false;
```

# 实现 Push

```ts
// qu
type Result = Push<[1, 2], "3">; // [1, 2, '3']

// an
type Push<T extends any[], U> = [...T, U];
```

# 实现 Unshift

```ts
// qu
type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]

// an
type Unshift<T, U> = [U, ...T];
```

# 实现 Parameters

```ts
// qu
const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}
type MyParameters<typeof foo> // [string, number]
type MyParameters<typeof bar> // [boolean, { a: 'A' }]
type MyParameters<typeof baz> // []
// an
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never
```
