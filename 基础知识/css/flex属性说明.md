# flex属性

项目上的属性:

- flex-grow: 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- flex-shrink: 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
- flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

- flex属性: 是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
```css

.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}

常用的
flex: 1 表示
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;

```

# 例子
```js
<style>
    .box {
        display: flex;
        width: 600px;
    }

    .red {
        flex: 1 1 100px;
    }

    .yellow {
        flex: 2 1 100px;
    }

    .turquo {
        flex: 3 1 100px;
    }
</style>

<div class="box">
    <div class="red" style="background: red;">One</div>
    <div class="yellow" style="background: yellow;">Two</div>
    <div class="turquo" style="background: turquoise;">Three has more content</div>
</div>
```

计算公式是当flex-basis来确定子项目在主轴有多余空间的时候,分配的规则

- (600 - 100 * 3) / (1 + 2 + 3) 就是每一份分配多余空间的大小
- turquo的宽度就是 (600 - 100 * 3) / (1 + 2 + 3) * 3

如果是容器偏小

```js
<style>
  .box {
      display: flex;
      width: 200px;
  }

  .red {
      flex: 1 1 100px;
  }

  .yellow {
      flex: 1 2 100px;
  }

  .turquo {
      flex: 1 3 100px;
  }
</style>
```

当容器偏小的时候计算规则
- 总权重 1 * 100 + 2 * 100 + 3 * 100 = 600
- 超出 200 - 100 * 3 = -100
- red: 100 - (100 * 1 * 100 / 600) = 83

# 参考
[控制Flex子元素在主轴上的比例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)