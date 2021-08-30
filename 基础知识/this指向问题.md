# this指向问题

### 1. 在普通函数中,this指向window

### 2. 在对象中this指向这个对象,但是有特殊情况

特殊例子

```js
	var obj = {
		val: 1,
		cb() {
			//this指向window,语法会报错
			console.log(this.val)
		},
		fn() {
			this.cb()
		}
	}

	obj.fn()

	// 在其被调用时才确定this指向
```

 

### 3. 定时器,延时器里的this指向是window

### 4. 构造函数中的this指向是new实例化之后的实例

### 5. apply,call,bind会改变this指向

+ 1. apply改变this指向,第二个参数是数组

+ 2. call改变this指向,第二参数是一个一个参数

+ 3. bind改变this指向,但是不会立即执行,返回一个新的函数

### 6. 箭头函数

+ 1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象

