# typeScript的数据类型

## 基础数据类型

- number
- string 
- Boolean
- null 
- undefined
- never 表示没有的值,不存在的值,用来处理抛出的错误的函数
- any 是语法的逃生舱,可以被赋值为任意类型
- unknown 是第二个any,但是any可以被赋值为任意类型,unknow的变量只能赋值给unknow与any的变量
- void 表示无效,无返回值在函数的返回值上使用

## 复杂数据类型

- Array

```js
let arr1: [] = [1, 2, 3]
let arr2: Array<T> = [1,2,3]
let arr3: number[] = [1,2,3]
let arr4: object[] = [{}]
```
- Object
```js
let obj: object = {};
let obj1: object = null;
let obj2: object = [];
let obj3: {} = {}
```
- Function
```js
function add(a: number, b: number): number {
    return a + b;
}

function add<T>(a: T, b: T) {
    return a + b;
}
```
- 元祖
```js
const arr: [ string, number ] = ['1', 1]
```
- 枚举
```js
enum color {
    Red,
    Blue,
    White
}

color['Red'] = 0
```
- class
    - public（默认） : 公有，可以在任何地方被访问。

    - protected : 受保护，可以被其自身以及其子类和父类访问。

    - private : 私有，只能被其定义所在的类访问。
```js
class Greeter {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

- 接口interface

  - 面向对象语言中，接口（Interfaces）是对行为的抽象（可以用事物的本质来辅助理解）。而具体如何行动由类（class）来实现（implement）（可以用事物的现象来辅助理解）。

  - 对象接口(对象形状的描述)

```js
// 变量的属性必须和接口的属性保持一致

interface Person {
    name: string;
    age: number;
    sex?: string; // 可选
    readonly weight: number; // 只读
    [propName: string]: any // 任意属性(接口的逃逸舱)
}

const p1: Person = {
    name: 'li',
    age: 14
}

// 接口
```

  - 类接口: 对类的行为进行抽象
  - 类实现接口
  - 接口继承接口
  - 接口继承类

```js
// 类实现接口,当两个类都有同一个方法时,可以把这个方法抽离为接口,让类去实现它
interface alter {
    alter(str: string): void
}

class door {
    width: number;
    height: number;

    constructor(x: number, y: number) {
        this.width = x;
        this.height = y;
    }
}

class SecurityDoor extends door implements alter {
    color: string;

    constructor(x: number, y: number, c: string) {
        super(x, y);
        this.color = c;
    }

    alter(str: string): void {
        console.log(str);
    }
}

const d1 = new SecurityDoor(100, 200, 'red');
d1.alter('叫');

// 接口继承接口
interface door {
    alter(str: string): void
}

interface secretDoor extends door {
    secretAlter(str1: string): void
}
```
