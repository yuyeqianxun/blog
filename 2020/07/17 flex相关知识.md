# flex

### 容器
> flex-direction:row | row-reverse | column | column-reverse;  

排列的横竖方式

> flex-wrap:nowrap | wrap | wrap-reverse;

排列是否换行(子项长度超过容器时)

> flex-flow:flex-direction | flex-wrap

前两者简写

> justify-content:flex-start | flex-end | center | space-between | space-around;

横排对齐方式

> align-items:flex-start | flex-end | center | baseline | stretch;

竖排对齐方式(只针对一排)

> align-content:flex-start | flex-end | center | space-between | space-around | stretch;

竖排对齐方式(针对多排)

### 子项

> order:n

项目的排列顺序。数值越小，排列越靠前，默认为0

> align-self:auto | flex-start | flex-end | center | baseline | stretch;

允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性

> flex-grow:n

子项在没有填满容器时的放大比例
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .container {
        width: 500px;
        height: 300px;
        display: flex;
      }
      .left {
        flex: 1 2 100px;
        /* flex-grow: 1;
        flex-shrink: 2;
        flex-basis: 100px; */
        background: red;
      }
      .center {
        flex: 2 2 150px;
        background: red;
      }
      .right {
        flex: 3 1 100px;
        background: blue;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </body>
</html>
```

#### flex-grow 计算

父元素宽度 500px，三个子元素的 width 分别为 100px，150px，100px。
总权重：1+2+3=6
总扩展：500-100-150-100=250
- 150 * 1 / 6 = 25px
- 150 * 2 / 6 = 50px
- 150 * 3 / 6 = 75px  

left=100+25=125
center=150+50=200
right=100+75=175

> flex-shrink:n

子项在超过容器大小时的缩小比例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .container {
        width: 500px;
        height: 300px;
        display: flex;
      }
      .left {
        flex: 1 1 150px;
        /* flex-grow: 1;
        flex-shrink: 2;
        flex-basis: 100px; */
        background: red;
      }
      .center {
        flex: 2 2 200px;
        background: red;
      }
      .right {
        flex: 3 3 300px;
        background: blue;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </body>
</html>
```

#### flex-shrink计算

父元素宽度 500px，三个子元素的 width 分别为 150px，200px，300px。
总权重：1 * 150 + 2 * 200 + 3 * 300 = 1450
总压缩：150 + 200 + 300 - 500 = -150
- -150 * 1 * 150 / 1450 = -15.5px
- -150 * 2 * 200 / 1450 = -41.4px
- -150 * 3 * 300 / 1450 = -93.1px  

left=150 - 15.5 = 134.5
center=200 - 41.4 = 158.6
right=300 - 93.1 = 206.9

> flex-basis:n 

在子项放大和压缩之前，子项占据的空间

> flex:flex-grow | flex-shrink | flex-basis

以上三者的合集