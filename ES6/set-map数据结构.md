# set/map数据结构

## set数据

### 集合,类似于数组,但是只都是唯一的

### 方法:

- 1. add添加成员
- 2. has判断是否包含
- 3. delete删除成员
- 4. size成员长度

### 遍历的方法

- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员

遍历器是用for...of...来循环

## weakSet数据

### weakSet的成员只能是对象
WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存

## map数据

### 字典: 键值对的形式,键和值都是可以是参数的形式

### 方法: 

- 1. set设置键值对
- 2. get获取键值
- 3. size成员总数
- 4. has某个键是否存在
- 5. delate删除某个键
- 6. clear清空

### 遍历的方法

- Map.prototype.keys()：返回键名的遍历器
- Map.prototype.values()：返回键值的遍历器
- Map.prototype.entries()：返回键值对的遍历器
- Map.prototype.forEach()：使用回调函数遍历每个成员

遍历器是用for...of...来循环

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

## weakmap

### 只接受对象作为键名
### weakmap对键名所指向的对象,不计入垃圾回收机制
### 总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏

可以用来处理循环引用的问题

```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```
上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用

```js
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

但是如果用weakmap解决

```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = new WeakMap([
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
]);

// 这样就把对对象键名的引用解决了
arr = null;
```

