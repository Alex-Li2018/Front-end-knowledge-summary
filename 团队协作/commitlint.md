# code Lint 

随着nodejs和前端工程化的发展，前端圈内产出了很多成熟的Lint工具，主要包括：

- eslint 规范并校验 ECMAScript/JavaScript code的编写
- tslint 规范并校验 TypeScript code的编写
- stylelint 规范并校验css/scss/less code的编写
- commitlint 负责校验commit msg是否符合规范
- prettier 或 beautifyjs 统一代码排版格式

除此之外，我们还需要一些辅助的工具：

husky 能够监听git hooks的nodejs包，让nodejs开发者处理git hooks任务变得更加容易
lint-staged 可以将git“已暂存(staged)”的文件作为参数传入你要执行的shell script之中


# husky
- husky(https://typicode.github.io/husky/#/)
- You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.


# commitlint

- 需要利用它的cli（command-line interface）能力，配置一套属于我们自己的git commit msg 校验规则
- @commitlint/cli 是commitlint提供的命令行工具，安装后会将cli脚本放置在./node_modules/.bin/目录下
- @commitlint/config-conventional是社区中一些共享的配置，我们可以扩展这些配置，也可以不安装这个包自定义配置

可以配置的文件: commitlint.config.js, .commitlintrc.js, .commitlintrc, .commitlintrc.json, .commitlintrc.yml

```js
// 常见配置
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能（feature）
                'fix', // 修补bug
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'revert', // 回滚
                'config', // 构建过程或辅助工具的变动
                'chore', // 其他改动
            ],
        ],
        'type-empty': [0, 'never'], // 提交不符合规范时,也可以提交,但是会有警告
        'subject-empty': [0, 'never'], // 提交不符合规范时,也可以提交,但是会有警告
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72]
    }
};
```

# lint-staged 硬限制

- lint-staged(https://github.com/stylelint/stylelint)
- 在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的。但是整个项目上运行lint速度会很慢，lint-staged能够让lint只检测暂存区的文件，所以速度很快,相当于只检测你修改的内容

---

# husky与commitlint配合

```js
// 首先执行husky初始化: 激活husky
husky install

// 其次添加git钩子

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit'
```


# 相关文章
[husky hooks 不起作用的解决方法](http://www.ptbird.cn/husky-hooks-not-working.html)
[前端codeLint-- 为项目集成ESLint、StyleLint、commitLint实战和原理](https://zhuanlan.zhihu.com/p/100427908)
[前端代码风格自动化系列（二）之Commitlint](https://segmentfault.com/a/1190000017790694)



