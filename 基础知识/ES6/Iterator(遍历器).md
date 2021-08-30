# Iterator遍历器

## 概念

- 为不同的数据提供统一的遍历接口
- 数据结构的成员能够按某种次序排列
- ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费

## 遍历原理

- （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

- （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

- （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

- （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

## Symbol.iterator属性

ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。

语言默认内置了Symbol.iterator属性

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象