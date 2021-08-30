# stylelint

- stylelint(https://github.com/stylelint/stylelint/blob/master/docs/user-guide/get-started.md)

- stylelint是『一个强大的、现代化的 CSS 检测工具』, 与 ESLint 类似, 是通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误.


```js
module.exports = {
    extends: "stylelint-scss", // 这是官方推荐的方式
    rules: {
      "at-rule-empty-line-before": "always"|"never",
      "at-rule-name-case": "lower"|"upper",
      "block-no-empty": true,
    }
};
```