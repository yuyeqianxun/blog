# 盒模型
- 标准
```js
width = content
```
- IE
```js
width = content + border + padding
```
- 转换
```css
box-sizing:border-box | content-box;
```

# CSS权重
> !important > 内联样式 > id > class > 标签 > 通配符 > 继承 > 默认

!important 权值10000
第一等：代表内联样式，如: style=””，权值为1000。
第二等：代表ID选择器，如：#content，权值为0100。
第三等：代表类，伪类和属性选择器，如.content，权值为0010。
第四等：代表标签选择器和伪元素选择器，如div p，权值为0001。
第五等：通用选择器（*），子选择器（>），相邻同胞选择器（+），权值为0000

# 居中
- margin: 0 auto;
```html
<style>
.container{
  width: 300px;
  border: 1px solid grey;
  text-align: center;
}
.ele2{
  border: 1px solid grey;
  width: 200px;
  margin:0 auto;
}
</style>
<div class="container">
  this is inner text
  <div classs="ele2">
      this is another block element
  </div>
</div>
```

- absolute + transform
```html
<style>
.container{
    height: 100px;
    width: 200px;
    position: relative;
    border: 1px solid grey;
  	text-align: center;
}
.ele1{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);  
    width: 100px; // 此处可以不设置，默认为父元素一半宽度
    border: 1px solid #888;
}
</style>
<div class="container">
   this is inner text
  <div class="ele1">
    this is a block element
  </div>
</div>
```

- absolute + margin
```html
<style>
.container{
    height: 100px;
    width: 200px;
    position: relative;
    border: 1px solid grey;
  	text-align: center;
}
.ele1{
    position: absolute;
    left: 50%;
    margin-left: -50px; // 负值，设为元素自身宽度的一半
    width: 100px; // 此处必须设置
    border: 1px solid #888;
}
</style>
<div class="container">
   this is inner text
  <div class="ele1">
    this is a block element
  </div>
</div>
```

- flex
```html
<style>
.container{
    height: 100px;
    width: 200px;
    position: relative;
    border: 1px solid grey;
  	text-align: center;
}
.ele1{
    position: absolute;
    left: 50%;
    margin-left: -50px; // 负值，设为元素自身宽度的一半
    width: 100px; // 此处必须设置
    border: 1px solid #888;
}
</style>
<div class="container">
   this is inner text
  <div class="ele1">
    this is a block element
  </div>
</div>
```

- absolute + margin: auto
```html
<style>
.container{
    height: 100px;
    width: 200px;
    position: relative;
    border: 1px solid grey;
  	text-align: center;
}
.ele1{
    position: absolute;
    left: 50%;
    margin-left: -50px; // 负值，设为元素自身宽度的一半
    width: 100px; // 此处必须设置
    border: 1px solid #888;
}
</style>
<div class="container">
   this is inner text
  <div class="ele1">
    this is a block element
  </div>
</div>
```

# display
| 值 | 作用 |
| -- | ---- |
| none | 使用后元素将不会显示 |
| block | 使用后元素将变为块级元素显示，元素前后带有换行符 |
| inline | display默认值。使用后原色变为行内元素显示，前后无换行符 |
| list-item | 使用后元素作为列表显示 |
| run-in | 使用后元素会根据上下文作为块级元素或行内元素显示 |
| table | 使用后将作为块级表格来显示（类似<table>），前后带有换行符 |
| inline-table | 使用后元素将作为内联表格显示（类似<table>），前后没有换行符 |
| table-row-group | 元素将作为一个或多个行的分组来显示（类似<tbody>） |
| table-header-group | 元素将作为一个或多个行的分组来表示（类似<thead>） |
| table-footer-group | 元素将作为一个或多个行分组显示（类似<tfoot>） |
| table-row | 元素将作为一个表格行显示（类似<tr>） |
| table-column-group | 元素将作为一个或多个列的分组显示（类似<colgroup>） |
| table-column | 元素将作为一个单元格列显示（类似<col>） |
| table-cell | 元素将作为一个表格单元格显示（类似<td>和<th>） |
| table-caption | 元素将作为一个表格标题显示（类似<caption>） |
| inherit | 规定应该从父元素集成display属性的值 |

# 伪元素和伪类的区别
css引入伪类和伪元素概念是为了格式化文档树以外的信息。
- 伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。虽然它和普通的css类相似，可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。
- 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

### css伪类
| 选择器 | 示例 | 示例说明 |
| [:link] | a:link | 选择所有未访问链接 |
| [:visited] | a:visited | 选择所有访问过的链接 |
| [:active] | a:active | 选择正在活动链接 |
| [:hover] | a:hover | 把鼠标放在链接上的状态 |
| [:focus] | input:focus | 选择元素输入后具有焦点 |

### css伪元素
| 选择器 | 示例 | 示例说明 |
| [:first-letter] | p:first-letter | 选择每个元素的第一个字母 |
| [:first-line] | p:first-line | 选择每个元素的第一行 |
| [:first-child] | p:first-child | 选择器匹配属于任意元素的第一个子元素的元素 |
| [:before] | p:before | 在每个元素之前插入内容 |
| [:after] | p:after | 在每个元素之后插入内容 |
| [:lang(language)] | p:lang(it) | 为元素的lang属性选择一个开始值 |

# BFC
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

### BFC的布局约束规则
- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
- 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。即BFC中子元素不会超出他的包含块。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算。

### BFC触发方式
1.根元素，即HTML标签
2.浮动元素：float值为left、right
3.overflow值不为 visible，为 auto、scroll、hidden
4.display值为 inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
5.定位元素：position值为 absolute、fixed  

注意：display: table也可以生成BFC的原因在于Table会默认生成一个匿名的table-cell，是这个匿名的table-cell生成了BFC。

### BFC作用
BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。我们可以利用BFC的这个特性来做很多事。
1.同一个 BFC 下外边距会发生折叠
2.BFC 可以包含浮动的元素
3.BFC 可以阻止元素被浮动元素覆盖