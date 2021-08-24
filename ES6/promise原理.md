# promise原理

```js
new Promise(function(resolve, reject) {
    queueMicrotask(() => {
        resolve('success')
    })
}).then(res => {
    console.log(res);
})
```

其中queueMicrotask是暴露给开发者直接使用微任务的API

## 实现原理

- 理解promise是一个类，其中传入了executor
- promise有三种状态 
    - Pending 等待 
    - Fulfilled 完成
    - Rejected 失败
- 状态只能由Pending -> Fulfilled 或者 Pending -> Rejected
- Promise使用 resolve 与 rejected 来改变状态
- then方法做的事情就是状态判断
    - 如果是成功状态，就调用成功的方法
    - 如果是失败状态，就调用失败的方法

- 同步版本

```js
const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'Rejected'

class FakePromise {
    
    status = Pending;
    value = null;
    reason = null;

    constructor(executor) {
        executor(this.resolve, this.rejected);
    }

    resolve(value) {
        if (this.status === Pending) {
            this.value = value;
            this.status = Fulfilled;
        }
    }

    rejected(reason) {
        if (this.status === Pending) {
            this.value = reason;
            this.status = Rejected;
        }
    }

    then(onFulFilled, onRejected) {
        if (this.status === Fulfilled) {
            onFulFilled(this.value);
        } else if (this.status === Rejected) {
            onRejected(this.reason);
        }
    }
}
```
我们发现promise里的resolve是在改变状态，然后then做状态判断

## 异步版本

```js
new FakePromise((resolve, reject) => {
  queueMicrotask(() => {
    resolve('1')
  })
}).then(res => {
    console.log(res)
})


const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'Rejected'

class FakePromise {
    
    status = Pending;
    value = null;
    reason = null;
    onFulfilledCallback = null;
    onRejectedCallback = null;

    constructor(executor) {
        executor(this.resolve, this.rejected);
    }

    resolve(value) {
        if (this.status === Pending) {
            this.value = value;
            this.status = Fulfilled;
            this.onFulfilledCallback && this.onFulfilledCallback(this.value);
        }
    }

    rejected(reason) {
        if (this.status === Pending) {
            this.value = reason;
            this.status = Rejected;
            this.onRejectedCallback && this.onRejectedCallback(this.reason);
        }
    }

    then(onFulFilled, onRejected) {
        if (this.status === Fulfilled) {
            onFulFilled(this.value);
        } else if (this.status === Rejected) {
            onRejected(this.reason);
        } else if (this.status === Pending) {
            this.onFulfilledCallback = onFulFilled;
            this.onRejectedCallback = onRejected;
        }
    }
}
```