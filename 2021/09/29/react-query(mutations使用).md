# useMutation

用作创建/更新/删除服务器数据

```js
function App() {
  const mutation = useMutation((newTodo) => {
    return axios.post("/todos", newTodo);
  });

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

- mutation.mutate()：发送请求
- mutation.reset()：重新请求

## 其他参数

```js
useMutation(addTodo, {
  onSuccess: (data, variables, context) => {
    // I will fire first
  },
  onError: (error, variables, context) => {
    // I will fire first
  },
  onSettled: (data, error, variables, context) => {
    // I will fire first
  },
  retry: 3,
});
```

## invalidateQueries

结合 invalidateQueries 可以重新获取数据

```js
import { useMutation, useQueryClient } from "react-query";

const queryClient = useQueryClient();

// When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
const mutation = useMutation(addTodo, {
  onSuccess: () => {
    // 改变了列表，再刷新列表的常见操作
    queryClient.invalidateQueries("todos");
    queryClient.invalidateQueries("reminders");
  },
});
```

## setQueryData

不使用网络请求去更新列表

```js
const queryClient = useQueryClient();

const mutation = useMutation(editTodo, {
  onSuccess: (data) => {
    queryClient.setQueryData(["todo", { id: 5 }], data);
  },
});

mutation.mutate({
  id: 5,
  name: "Do the laundry",
});

// The query below will be updated with the response from the
// successful mutation
const { status, data, error } = useQuery(["todo", { id: 5 }], fetchTodoById);
```

## 回滚

```js
const queryClient = useQueryClient();

useMutation(updateTodo, {
  // When mutate is called:
  onMutate: async (newTodo) => {
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries("todos");

    //获取前值
    const previousTodos = queryClient.getQueryData("todos");

    //设置新值
    queryClient.setQueryData("todos", (old) => [...old, newTodo]);

    //返回前值
    return { previousTodos };
  },
  // If the mutation fails, use the context returned from onMutate to roll back
  onError: (err, newTodo, context) => {
    // 报错的话，设置前值
    queryClient.setQueryData("todos", context.previousTodos);
    // 单条数据回滚
    queryClient.setQueryData(
      ["todos", context.newTodo.id],
      context.previousTodo
    );
  },
  // Always refetch after error or success:
  onSettled: () => {
    queryClient.invalidateQueries("todos");
  },
});
```

## 取消请求

请求的取消各个库的实现并不统一，当然正常情况下也不需要去处理请求取消，这里是为了某些特别占带宽的时候出现的行为。
react-query 按某种形式去封装，就能取消

```js
const [queryKey] = useState("todos");

const query = useQuery(queryKey, () => {
  const controller = new AbortController();
  const signal = controller.signal;
  //这里可以是axios或者fetch
  const promise = ...

  //编写cancel函数，即可取消
  promise.cancel = () => controller.abort();

  return promise;
});

const queryClient = useQueryClient();

return (
  <button
    onClick={(e) => {
      e.preventDefault();
      queryClient.cancelQueries(queryKey);
    }}
  >
    Cancel
  </button>
);
```
