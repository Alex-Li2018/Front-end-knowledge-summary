# SOLID原则

- S - Single-responsiblity Principle
- O - Open-closed Principle
- L - Liskov Substitution Principle
- I - Interface Segregation Principle
- D - Dependency Inversion Principle

## Single-responsiblity Principle

A class should have one and only one reason to change, meaning that a class should have only one job.

一个对象应该只包含单一的职责，并且该职责被完整地封装在一个类中，即又定义有且仅有一个原因使类变更。（甲类负责两个不同的职责：职责A，职责B。当由于职责A需求发生改变而需要修改类T时，有可能会导致原本运行正常的职责B功能发生故障。也就是说职责A和B被耦合在了一起”）

目的： 解耦合

## Open-closed Principle

Objects or entities should be open for extension but closed for modification

实体应该对扩展是开放的，对修改是封闭的。即可扩展(extension)，不可修改(modification)。（类应该具有扩展性，更灵活）

## Liskov Substitution Principle

This means that every subclass or derived class should be substitutable for their base or parent class.

这意味着每个子类或派生类都应该可以替代它们的基类或父类。任何基类可以出现的地方，子类一定可以出现。LSP是继承复用的基石，只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。里氏代换原则是对“开-闭”原则的补充。实现“开-闭”原则的关键步骤就是抽象化。而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范。（长方形是正方形的基类）

目的： 设计基类的时候抽象程度要高 

## Interface Segregation Principle

A client should never be forced to implement an interface that it doesn’t use, or clients shouldn’t be forced to depend on methods they do not use.

客户端不应该被强制实现它不用的接口，也不应该去依赖它不用的方法。

1）一个类对另外一个类的依赖性应当是建立在最小的接口上的。

ISP可以达到不强迫客户（接口的使用方法）依赖于他们不用的方法，接口的实现类应该只呈现为单一职责的角色（遵循SRP原则）

ISP还可以降低客户之间的相互影响---当某个客户要求提供新的职责（需要变化）而迫使接口发生改变时，影响到其他客户程序的可能性最小。

2）客户端程序不应该依赖它不需要的接口方法（功能）。

客户端程序就应该依赖于它不需要的接口方法（功能），那依赖于什么？依赖它所需要的接口。客户端需要什么接口就是提供什么接口，把不需要的接口剔除，这就要求对接口进行细化，保证其纯洁性。

目的： 原子化 最小依赖

## Dependency Inversion Principle（依赖倒置）

Entities must depend on abstractions, not on concretions. It states that the high-level module must not depend on the low-level module, but they should depend on abstractions.

实体必须依赖抽象而不是具体，高级模块不应该依赖低级模块。他们应该依赖抽象。

面向过程的开发，上层调用下层，上层依赖于下层，当下层剧烈变动时上层也要跟着变动，这就会导致模块的复用性降低而且大大提高了开发的成本。

面向对象的开发很好的解决了这个问题，一般情况下抽象的变化概率很小，让用户程序依赖于抽象，实现的细节也依赖于抽象。即使实现细节不断变动，只要抽象不变，客户程序就不需要变化。这大大降低了客户程序与实现细节的耦合度。

目的：抽象程序 解耦