# useQuery

用作获取服务器数据

```js
import { useQuery } from "react-query";

function App() {
  /**
   *1、唯一key值
   *2、Promise函数
   **/
  const { isLoading, isError, isSuccess, isIdle, data, error, isFetching } =
    useQuery("todos", fetchTodoList, {
        enabled: true,//是否自动请求
        retry: 3,//失败重连次数
        retryDelay: 1000,//重连延长事件
        refetchOnWindowFocus: true//页面重获焦点自动刷新
        keepPreviousData: true//缓存前页数据
        placeholderData: []//占位数据，不会进入缓存，类似于initState
        initialData: []//初始数据(不是通过接口获得的正常数据，非占位，比较少见)，会直接进入成功态
        staleTime: 1000//设置初始数据再设置该值，会在时间后才去获取数据，否则立即获取数据(官网解释先渲染列表再从服务器请求后续数据)
        initialDataUpdatedAt: Data.now()//设置时间戳，表明initialData最后更新时间，当initialData不是最新值时，该值会决定是否更新initialData。配合staleTime，在运行时看是否超过了更新时间去更新initialData
    });
}
```

## status(状态)

- isisFetching: 区别与 isLoading,isLoading 可以用于表示初次加载的指示标，isFetching 可以用于再次加载的指示标，见下方
- isIdle：被禁用

两种写法

```js
const { isLoading, isError, data, error } = useQuery("todos", fetchTodoList);

if (isLoading) {
  return <span>Loading...</span>;
}

if (isError) {
  return <span>Error: {error.message}</span>;
}
```

```js
const { status, data, error } = useQuery("todos", fetchTodoList);

if (status === "loading") {
  return <span>Loading...</span>;
}

if (status === "error") {
  return <span>Error: {error.message}</span>;
}
```

## key

作为 react-query 缓存数据的唯一键，将来可用于取值。任何可序列化的值都可作为 key

```js
//字符串
useQuery('todos', ...)
//数组，通常后面的表示资源的参数，比如todo列表第5页
useQuery(['todo', 5], ...)
useQuery(['todo', 5, { preview: true }], ...)
useQuery(['todos', { type: 'done' }], ...)
//对象，注意，改变对象key顺序被视为同一个key
useQuery(['todos', { status, page }], ...)
useQuery(['todos', { page, status }], ...)
useQuery(['todos', { page, status, other: undefined }], ...)
//动态参数作为key
function Todos({ todoId }) {
   const result = useQuery(['todos', todoId], () => fetchTodoById(todoId))
}
```

## 并发请求

### 普通请求正常写

```js
function App () {
   // 一下函数会并行执行
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
}
```

### 查询相似参数的相同资源时

```js
function App({ users }) {
  const userQueries = useQueries(
    users.map((user) => {
      return {
        queryKey: ["user", user.id],
        queryFn: () => fetchUserById(user.id),
      };
    })
  );
}
```

## 依赖执行

传入第三个参数 enabled，当 enabled 为 true 时会自动执行

```js
const { data: user } = useQuery(["user", email], getUserByEmail);
const userId = user?.id;
const { isIdle, data: projects } = useQuery(
  ["projects", userId],
  getProjectsByUser,
  {
    enabled: !!userId,
  }
);
```

## isFetching

用于首次加载之后的再次加载提示，更友好

```js
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery("todos", fetchTodos);

  return status === "loading" ? (
    <span>Loading...</span>
  ) : status === "error" ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  );
}
```

## 关闭自动刷新

react-query 在用户重新激活页面时，会自动重新获取后台数据，通过参数可以关闭该功能

```js
//全局
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
}
//单个
useQuery("todos", fetchTodos, { refetchOnWindowFocus: false });
```

### 自定义焦点事件

react-query 在页面激活时会触发一些自带的事件，该事件允许自定义。官网解释通常用在 iframe 场景下，iframe 容易多次触发页面激活，通过该事件能避免一些问题

```js
focusManager.setEventListener((handleFocus) => {
  // Listen to visibillitychange and focus
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("visibilitychange", handleFocus, false);
    window.addEventListener("focus", handleFocus, false);
  }

  return () => {
    // Be sure to unsubscribe if a new handler is set
    window.removeEventListener("visibilitychange", handleFocus);
    window.removeEventListener("focus", handleFocus);
  };
});
```

## 禁用自动查询

设置第三个参数 enabled: false,规则如下：

- 如果有缓存
  - query 会停留在成功(isSuccess)状态
- 如果没缓存
  - query 会停留在禁用(isIdle)状态
- 查询不会自动执行
- 新实例出现时，不会在后台自动刷新数据
- 该查询将忽略查询客户端 invalidateQueries 和 refetchQueries 调用，这些调用通常会导致重新获取查询
- 通过 refetch 能手动触发

```js
function Todos() {
  const { isIdle, isLoading, isError, data, error, refetch, isFetching } =
    useQuery("todos", fetchTodoList, {
      enabled: false,
    });

  return (
    <>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {isIdle ? (
        "Not ready..."
      ) : isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
          <div>{isFetching ? "Fetching..." : null}</div>
        </>
      )}
    </>
  );
}
```

## 重新查询

通常请求失败时，react-query 会自动尝试重新执行，可以通过一些参数改变该行为

- false：禁止尝试重新执行
- num：重新尝试次数(默认 3)
- true：无限尝试
- (failureCount, error)=>：根据失败原因觉得行为

### 推迟重新查询

retryDelay：time

## 分页查询，保存前页数据(keepPreviousData)

主要用于在分页查询中，缓存加载过的前页数据

```js
useQuery(["projects", page], () => fetchProjects(page), {
  keepPreviousData: true,
});
```

## 分页查询，无限分页(useInfiniteQuery)

```js
const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
} = useInfiniteQuery("projects", fetchProjects, {
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});
```

### 刷新首页

```js
const { refetch } = useInfiniteQuery("projects", fetchProjects, {
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});

// only refetch the first page
refetch({ refetchPage: (page, index) => index === 0 });
```
