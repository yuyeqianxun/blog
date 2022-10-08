请你为 最不经常使用（LFU）缓存算法设计并实现数据结构。

实现 LFUCache 类：

LFUCache(int capacity) - 用数据结构的容量 capacity 初始化对象
int get(int key) - 如果键 key 存在于缓存中，则获取键的值，否则返回 -1 。
void put(int key, int value) - 如果键 key 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，移除最不经常使用的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 最近最久未使用 的键。
为了确定最不常使用的键，可以为缓存中的每个键维护一个 使用计数器 。使用计数最小的键是最久未使用的键。

当一个键首次插入到缓存中时，它的使用计数器被设置为 1 (由于 put 操作)。对缓存中的键执行 get 或 put 操作，使用计数器的值将会递增。

函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
```js
/**
 * 定义节点
 * @param {*} key 
 * @param {*} val 
 */
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.freq = 1;
        this.next = null;
        this.prev = null;
    }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.hash = {};
    this.count = 0;
    this.dummyHead = new ListNode();
    this.dummyTail = new ListNode();
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
  }

  get(key) {
    let node = this.hash[key];
    if (node == null) return -1;
    this.incFreq(node);
    return node.value;
  }

  put(key, value) {
    let node = this.hash[key];
    if (node == null) {
      if (this.count == this.capacity) {
        this.removeLRUItem();
      }
      let newNode = new ListNode(key, value);
      this.hash[key] = newNode;
      this.addToHead(newNode);
      this.count++;
    } else {
      node.value = value;
      this.incFreq(node);
    }
  }
}

DoublyLinkedList.prototype.removeNode = function(node) {
  // 1. 将当前节点的前一个节点的 post 指针指向当前节点的 post 指针
  node.pre.post = node.post
  // 2. 将当前节点的后一个节点的 pre 指针指向当前节点的 pre 指针
  node.post.pre = node.pre
}

DoublyLinkedList.prototype.addNode = function(node) {
  // 为了方便理解，不妨设当前只有头尾节点以及需要插入的该节点
  // 总的来说，就是分别处理该节点与头尾节点的 pre/post 指针
  // 1. 将 该节点的后一个节点 设置为 头节点的后一个节点(即尾节点)
  node.post = this.head.post
  // 2. 将 尾节点的前一个节点 设置为 该节点
  this.head.post.pre = node
  // 3. 将头节点的后一个节点设置为该节点
  this.head.post = node
  // 4. 将该节点的前一个节点设置为头节点
  node.pre = this.head
}

/**
 * 定义 LFU 类
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
  this.capacity = capacity // 总的容量
  this.size = 0 // 当前已使用的容量
  this.minFreq = 0 // 最小使用频率，为删除操作服务
  this.cacheMap = new Map() // key-value map
  this.freqMap = new Map() // 频率-(key，value，频率)
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  // 缓存中没有这个 key，直接返回 -1
  if (!this.cacheMap.has(key)) {
    return -1
  }
  // 获取缓存
  const node = this.cacheMap.get(key)
  // 将该节点的频率 +1
  this.incFreq(node)
  // 返回该节点的值
  return node.val
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  // 若缓存容量为 0，直接返回
  if (this.capacity === 0) {
    return
  }
  // 获取缓存中 key 对应的节点
  const node = this.cacheMap.get(key)
  if (node) {
    // 若节点存在，则只需要更新该节点的值以及频率
    node.val = value
    this.incFreq(node)
  } else {
    // 如果容量已被使用完，则需要移除 最不经常使用 的节点，以空出容量
    if (this.capacity === this.size) {
      // 获取最小使用频率所对应的双向链表
      const minFreqLinkedList = this.freqMap.get(this.minFreq)
      // 将该链表的尾节点的前一个节点移除(尾节点的前一个节点才是有效节点，尾节点充当哨兵作用)
      this.cacheMap.delete(minFreqLinkedList.tail.pre.key)
      minFreqLinkedList.removeNode(minFreqLinkedList.tail.pre)
      this.size--
    }
    // 将该值封装成节点并放进 cacheMap 中
    const newNode = new Node(key, value)
    this.cacheMap.set(key, newNode)
    // 同时需要将该节点插入 freqMap 中频率最小的双向链表中
    // 获取使用频率为 1 的双向链表
    let linkedList = this.freqMap.get(1)
    // 若使用频率为 1 的双向链表是空的，则创建该链表并放进 freqMap 中
    if (!linkedList) {
      linkedList = new DoublyLinkedList()
      this.freqMap.set(1, linkedList)
    }
    // 将新节点放入双向链表中，同时更新 size / minFreq
    linkedList.addNode(newNode)
    this.size++
    this.minFreq = 1
  }

  /**
   * @param {Node} node
   */
  LFUCache.prototype.incFreq = function(node) {
    // 总的来说，把该节点从旧频率对应的链表中移除，然后放进新频率对应的链表中
    // 获取该节点的使用频率
    let freq = node.freq
    // 获取该使用频率(旧频率)对应的链表
    let linkedList = this.freqMap.get(freq)
    // 将该节点从旧频率对应的链表中移除
    linkedList.removeNode(node)
    // 同时满足以下两种情况时，更新 Freq 的值
    // 1. 旧频率等于最小频率
    // 2. 该链表为空链表
    if (freq === this.minFreq && linkedList.head.post === linkedList.tail) {
      this.minFreq = freq + 1
    }
    // 增加该节点的使用频率，姑且称为 新频率
    node.freq++
    // 获取新频率对应的链表
    linkedList = this.freqMap.get(freq + 1)
    // 如果链表为空，则需要新建链表，并将其放入 freqMap
    if (!linkedList) {
      linkedList = new DoublyLinkedList()
      this.freqMap.set(freq + 1, linkedList)
    }
    // 将新频率的节点放进链表中
    linkedList.addNode(node)
  }
};
```
