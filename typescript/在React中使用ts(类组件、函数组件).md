# 类组件
```tsx
interface IProps {
  name: string;
  onClick: () => void; // 点击事件
  onClick(event: React.MouseEvent<HTMLButtonElement>): void; // 传递event的点击
  onChange: (id: number) => void;
  children: React.ReactNode; // 子组件
  functionChildren: (name: string) => React.ReactNode; // 函数子组件
  style?: React.CSSProperties; // 样式
  onChange?: React.FormEventHandler<HTMLInputElement>; // 表单事件！泛型参数是event.target的类型
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}

interface IState {
  count: number;
}

class App extends React.Component<IProps, IState> {
  state = {
    count: 0
  };

  render() {
    return (
      <div>
        {this.state.count}
        {this.props.name}
      </div>
    );
  }
}

export default App;
```

# 函数组件
```tsx
type AppProps = {
  message: string;
};
const App: React.FC<IProps> = ({ message }: AppProps) => <div>{message}</div>;

const App: React.FC<IProps> = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

const App: React.FC<IProps> = ({ message }: { message: string }) => <div>{message}</div>;

```

# Hooks
### useState
```tsx
const [count, setCount] = useState<number>(1)
const [count, setCount] = useState<number | null>(null);
const [user, setUser] = React.useState<IUser>({} as IUser);
```

### useReducer
```tsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}
```

### useEffect、useLayoutEffect
不需要去处理类型

### useRef
1. DOM指代
```tsx
function Foo() {
  const divRef = useRef<HTMLDivElement>(null);
  return <div ref={divRef}>etc</div>;
}
```
如果一定有current值，可以非空断言
```tsx
function Foo() {
  const divRef = useRef<HTMLDivElement>(null!);
  return <div ref={divRef}>etc</div>;
}
```
2. Value指代
```tsx
function Foo() {
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    intervalRef.current = 123;
  }, []);
  return <button>按钮</button>;
}
```

### useContext
```tsx
import * as React from "react";

interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}
const AppCtx = React.createContext<AppContextInterface | null>(null);
const sampleAppContext: AppContextInterface = {
  name: "Using React Context in a Typescript App",
  author: "thehappybug",
  url: "http://www.example.com",
};
export const App = () => (
  <AppCtx.Provider value={sampleAppContext}>...</AppCtx.Provider>
);
export const PostInfo = () => {
  const appContext = React.useContext(AppCtx);
  return (
    <div>
      Name: {appContext.name}, Author: {appContext.author}, Url:{" "}
      {appContext.url}
    </div>
  );
};
```

### createRef
```tsx
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef = React.createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

### forwardRef
```tsx
type Props = { children: React.ReactNode; type: "submit" | "button" };
export type Ref = HTMLButtonElement;
export const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```

# 事件
### 事件类型
- 剪切板事件对象：ClipboardEvent<T = Element>
- 拖拽事件对象：DragEvent<T = Element>
- 焦点事件对象：FocusEvent<T = Element>
- 表单事件对象：FormEvent<T = Element>
- Change事件对象：ChangeEvent<T = Element>
- 键盘事件对象：KeyboardEvent<T = Element>
- 鼠标事件对象：MouseEvent<T = Element, E = NativeMouseEvent>
- 触摸事件对象：TouchEvent<T = Element>
- 滚轮事件对象：WheelEvent<T = Element>
- 动画事件对象：AnimationEvent<T = Element>
- 过渡事件对象：TransitionEvent<T = Element>

### 事件函数类型
- 剪切板事件处理函数：ClipboardEventHandler<T = Element>
- 拖拽事件处理函数：DragEventHandler<T = Element>
- 焦点事件处理函数：FocusEvent<T = Element>
- 表单事件处理函数：FormEventHandler<T = Element>
- Change事件处理函数：ChangeEventHandler<T = Element>
- 键盘事件处理函数：KeyboardEventHandler<T = Element>
- 鼠标事件处理函数：MouseEventHandler<T = Element, E = NativeMouseEvent>
- 触摸事件处理函数：TouchEventHandler<T = Element>
- 滚轮事件处理函数：WheelEventHandler<T = Element>
- 动画事件处理函数：AnimationEventHandler<T = Element>
- 过渡事件处理函数：TransitionEventHandler<T = Element>
- 指针事件处理函数：PointerEventHandler<T = Element>
- 界面事件处理函数：UIEventHandler<T = Element>

# HTML标签
### 标签
- a: HTMLAnchorElement;
- body: HTMLBodyElement;
- br: HTMLBRElement;
- button: HTMLButtonElement;
- div: HTMLDivElement;
- h1: HTMLHeadingElement;
- h2: HTMLHeadingElement;
- h3: HTMLHeadingElement;
- html: HTMLHtmlElement;
- img: HTMLImageElement;
- input: HTMLInputElement;
- ul: HTMLUListElement;
- li: HTMLLIElement;
- link: HTMLLinkElement;
- p: HTMLParagraphElement;
- span: HTMLSpanElement;
- style: HTMLStyleElement;
- table: HTMLTableElement;
- tbody: HTMLTableSectionElement;
- video: HTMLVideoElement;
- audio: HTMLAudioElement;
- meta: HTMLMetaElement;
- form: HTMLFormElement; 

### 属性
- HTML属性类型：HTMLAttributes
- 按钮属性类型：ButtonHTMLAttributes
- 表单属性类型：FormHTMLAttributes
- 图片属性类型：ImgHTMLAttributes
- 输入框属性类型：InputHTMLAttributes
- 链接属性类型：LinkHTMLAttributes
- meta属性类型：MetaHTMLAttributes
- 选择框属性类型：SelectHTMLAttributes
- 表格属性类型：TableHTMLAttributes
- 输入区属性类型：TextareaHTMLAttributes
- 视频属性类型：VideoHTMLAttributes
- SVG属性类型：SVGAttributes
- WebView属性类型：WebViewHTMLAttributes