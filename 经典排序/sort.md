# 1.冒泡排序

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。
- 这步做完后，最后的元素会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

```js
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        var temp = arr[j + 1]; // 元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
```

# 2. 选择排序

- 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
- 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
- 重复第二步，直到所有元素均排序完毕。

```js
function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 寻找最小的数
        minIndex = j; // 将最小数的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
```

# 3. 插入排序

- 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
- 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

```js
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
```

# 4. 希尔排序

```js

```

# 5. 归并排序

- 将数组无线两等分
- 分到最小后没等分开始分别排序
- 排序完开始合并

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let m = arr.length >> 1,
    left = arr.slice(0, m);
  right = arr.slice(m);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  let res = [];
  while (left.length && right.length) {
    res.push(left[0] > right[0] ? right.shift() : left.shift());
  }
  return res.concat(left.length ? left : right);
}
```

# 6. 快速排序
- 从数列中挑出一个基准值。
- 将所有比基准值小的摆放在基准前面，所有比基准值大的摆在基准的后面(相同的数可以到任一边)；在这个分区退出之后，该基准就处于数列的中间位置。
- 递归地把"基准值前面的子数列"和"基准值后面的子数列"进行排序。

```js
function quicksort(arr) {
  if (!(arr instanceof Array)) {
    return arr;
  }
  let base = Math.floor(arr.length / 2);
  let baseIndex = arr.splice(base, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] > baseIndex ? left.push(arr[i]) : right.push(arr[i]);
  }
  return [...quicksort(left), baseIndex, ...quicksort(left)];
}
```

# 7. 堆排序

```js
function heapSort(arr) {
  let len = arr.length;

  if (len <= 1) return arr;
  //init
  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapAdjust(arr, i, len);
  }
  for (let i = len - 1; i > 0; i--) {
    swap(0, i, arr);
    heapAdjust(arr, 0, i);
  }
  return arr;
}
function heapAdjust(arr, i, len) {
  let left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest != i) {
    swap(i, largest, arr);
    heapAdjust(arr, largest, len);
  }
}
function swap(i, j, arr) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

# 8. 计数排序

# 9. 桶排序

# 10. 基数排序
