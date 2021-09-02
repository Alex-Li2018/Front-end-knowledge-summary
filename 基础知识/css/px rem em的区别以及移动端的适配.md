# px rem em vw/vh 区别

- px 绝对像素点
- em 相对于父元素font-size计算,如果没有按照浏览器的默认font-size计算
```css
<div class="a">A
    <div class="b">B
        <div class="c">C</div>
    </div>
</div>

<style>
	.a{ font-size:16px;}
	.b{ font-size:2em;} /* 相当于32px */
	.c{ font-size:1em;} /* 相当于32px */
</style>
```
- rem 相对于html的font-size计算
```css
<div class="a">A
    <div class="b">B
        <div class="c">C</div>
    </div>
</div>
		
<style>
    html{ font-size:16px;}
    .a{ font-size:3rem;} /* 相当于48px */
    .b{ font-size:2rem;} /* 相当于32px */
    .c{ font-size:1rem;} /* 相当于16px */
</style>
```
- vw/vh 为一个视窗的宽高
- 百分比 通常子元素的百分比完全相对于直接父元素

# 移动端的适配方案

- 完全百分比方案（不建议使用）
- 媒体查询 + 不同设备不同css （代码工作量大）
- rem 方案（根元素字体大小作为参考值）
- vw/vh 方案（屏幕宽高作为参考值）
- flex 弹性布局方案

## rem方案

webpack.config.js

```js
//引入postcss-pxtorem
const pxtorem = require("postcss-pxtorem")

//module的配置
{
    test: /\.(scss|css)$/,
    loaders: [
        'style-loader',
        'css-loader',
        //**************************适配配置开始
        {
            //放在这'style-loader','css-loader'后面，sass-loader前面
            loader: 'postcss-loader', 
            options: {
                //当引入外部的依赖包作为组件配置项时需要定义一个唯一的标识符，推荐这样写
                ident: 'postcss', 
                plugins: [
                    pxtorem({
                        //表示根元素html的fontSize值,也可以是100,获取任意其他值
                        rootValue: 16,
                        //设置px转换成rem的属性值，*表示所有属性的px转换为rem 
                        propList: ['*'], 
                    }),
                ],
            },
        },
        //**************************适配部分结束
        'sass-loader',
    ],
},

```

页面里 rem.js
```js
(function () {
  var initFontSize = 16
  var iPhone6Width = 375
  var clientWidth = window.document.documentElement.clientWidth || iPhone6Width
  var newFontSize = initFontSize * (clientWidth / iPhone6Width)
  document.documentElement.style.fontSize = newFontSize + 'px'
})()
```

## 适配整体流程

- 1. 先确定设计稿(iphone6) 根字体 16px 手机屏幕宽度 375 
- 2. 计算不同屏幕下的根字体适配,计算公式如下: iphoneXR为例(414)
    - 414 / 375 * 16
    - 适配的屏幕宽 / 设计稿的屏幕宽 * 设计稿的根字体大小

