# promise原理

promise是一种异步编程解决方案,它的状态只有两种 pending -> Fulfilled 或者 pending -> Rejected 状态一经确定就不能改变

promise的then方法问题

- 1. then方法返回的是新的promise,可以采用链式调用
- 2. then方法可以被多次调用,但是它的状态是不会被改变的

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

- 实现了promise的异步调用
- 实现了promise的then方法多次调用
- 实现then方法的链式调用
```js
// then方法里再包装一层promise
then(onFulFilled, onRejected) {
    retrun new FakePromise(() => {
        if (this.status === Fulfilled) {
            onFulFilled(this.value);
        } else if (this.status === Rejected) {
            onRejected(this.reason);
        } else if (this.status === Pending) {
            this.onFulfilledCallback.push(onFulFilled);
            this.onRejectedCallback.push(onRejected);
        }
    });
}

function resolvePromise(x, resolve, reject) {
    if (x instanceof FakePromise) {
        x.then(resolve, reject)    
    } else {
        resolve(x)
    }
}
// 相当于对then函数的返回值进行promise包装,这样就实现了then的链式调用
```
- 实现了promise在then方法里返回了自身的判断

```js
const promise = new Promise((resolve, reject) => {
  resolve(100)
})
const p1 = promise.then(value => {
  console.log(value)
  // 返回了自身
  return p1
})
```

处理办法是: 通过判断

```js
const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'Rejected'

class FakePromise {
    
    status = Pending;
    value = null;
    reason = null;
    // 数组的回调
    onFulfilledCallback = [];
    onRejectedCallback = [];

    constructor(executor) {
        executor(this.resolve, this.rejected);
    }

    resolve = (value) => {
        if (this.status === Pending) {
            this.value = value;
            this.status = Fulfilled;
            while(this.onFulfilledCallback.length) {
                this.onFulfilledCallback.shift()(this.value);
            }
        }
    }

    rejected = (reason) => {
        if (this.status === Pending) {
            this.value = reason;
            this.status = Rejected;
            while(this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(this.reason)
            }
        }
    }

    then(onFulFilled, onRejected) {
        return new FakePromise((reslove, rejecte) => {
            if (this.status === Fulfilled) {
                const x = onFulFilled(this.value);
                resolvePromise(x, reslove, rejecte)
            } else if (this.status === Rejected) {
                onRejected(this.reason);
            } else if (this.status === Pending) {
                this.onFulfilledCallback.push(onFulFilled);
                this.onRejectedCallback.push(onRejected);
            }
        });
    }
}

function resolvePromise(x, resolve, reject) {
    if (x instanceof FakePromise) {
        x.then(resolve, reject)    
    } else {
        resolve(x)
    }
}

var p = new FakePromise(function (resolve, reject) {
    queueMicrotask(function () {
        resolve('1')
    })
})

p.then(res => {
    console.log(1, res)
})

p.then(res => {
    console.log(2, res)
})

p.then(res => {
    console.log(3, res)
})
```

