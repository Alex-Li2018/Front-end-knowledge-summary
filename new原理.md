# new原理
# new做了哪些事情

- 创建一个空的简单JavaScript对象（即{}）；
- 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
- 将步骤1新创建的对象作为this的上下文 ；
- 如果该函数没有返回对象，则返回this。

## 白话文版本

- 创建一个空对象 u = {}
- 绑定原型，u.__proto__ = User.prototype
- 调用 User() 函数，并把空对象 u 当做 this 传入，即 User.call(u)
- 如果 User() 函数执行完自己 return 一个 object 类型，那么返回此变量，否则返回 this，注意：如果构造函数返回基本类型值，则不影响，还是返回 this

```js
function fakeNew () {
    const emptyObj = Object.create({});

    emptyObj.__proto = fakeNew.prototype;

    const cator = [].shift.apply(arguments);
    const res = cator.apply(emptyObj, arguments);
    return typeof res === 'object' ? res : obj;
}

function User(name) {
    this.name = name;
}

User.prototype.getName = function() {
    return this.name;
}

let u = FakeNew(User, 'leo');
console.log(u);
console.log(u.getName());
```
