```js
class ListNode {
  constructor(key, value) {
    //双向链表的单个节点
    this.key = key;
    this.value = value;
    this.next = null; //指向后一个节点
    this.prev = null; //指向前一个节点
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; //容量
    this.hashTable = {}; //存放键值对信息
    this.count = 0; //键值对数量
    this.dummyHead = new ListNode(); //dummy头节点 方便在链表从开始的地方插入
    this.dummyTail = new ListNode(); //dummy尾节点 方便在链表从末尾删除
    this.dummyHead.next = this.dummyTail; //dummyHead和dummyTail相互连接
    this.dummyTail.prev = this.dummyHead;
  }

  get(key) {
    let node = this.hashTable[key]; //查找哈希表中的键值对
    if (node == null) return -1; //不存在该键值对 返回-1
    this.moveToHead(node); //移动到链表头
    return node.value;
  }

  put(key, value) {
    let node = this.hashTable[key]; //哈希表中查找该键值对
    if (node == null) {
      let newNode = new ListNode(key, value); //不存在就创建节点
      this.hashTable[key] = newNode; //加入哈希表
      this.addToHead(newNode); //加入链表头
      this.count++; //节点数+1
      if (this.count > this.capacity) {
        //超过容量 从队尾删除一个
        this.removeLRUItem();
      }
    } else {
      node.value = value; //键值对存在于哈希表中 就更新
      this.moveToHead(node); //移动到队头
    }
  }

  moveToHead(node) {
    this.removeFromList(node); //从链表中删除节点
    this.addToHead(node); //将该节点添加到链表头
  }

  removeFromList(node) {
    //删除的指针操作
    let tempForPrev = node.prev;
    let tempForNext = node.next;
    tempForPrev.next = tempForNext;
    tempForNext.prev = tempForPrev;
  }

  addToHead(node) {
    //加入链表头的指针操作
    //当前第一个元素前指针指向头部
    node.prev = this.dummyHead;
    //当前第一个元素后指针指向前第一个元素
    node.next = this.dummyHead.next;
    //前第一个元素前指针指向当前第一个元素
    this.dummyHead.next.prev = node;
    //头部后指针指向当前第一个元素
    this.dummyHead.next = node;
  }

  removeLRUItem() {
    let tail = this.popTail(); //从链表中删除
    delete this.hashTable[tail.key]; //从哈希表中删除
    this.count--;
  }

  popTail() {
    let tailItem = this.dummyTail.prev; //通过dummyTail拿到最后一个节点 然后删除
    this.removeFromList(tailItem);
    return tailItem;
  }
}
```
