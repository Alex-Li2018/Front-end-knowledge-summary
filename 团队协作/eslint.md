# eslint

- eslint(https://eslint.bootcss.com/docs/user-guide/getting-started)

- ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误

文件: .eslintrc
```js
module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
      "parser": "babel-eslint",
      "ecmaVersion": 2017,
      "sourceType": "module"
    },
    plugins:[
      "vue"
    ],
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
      browser: true,
      es6: true,
    },
    // 配置js代码风格
    extends: [
      'airbnb-base',
      'eslint:recommended',
      'plugin:vue/recommended', 
      'plugin:vue/strongly-recommended'
    ],
    // 解析@,@api等内容,后缀
    settings: {
      'import/resolver': {
        alias: {
            map: [
                ['@', './src'],
                ['assets', './src'],
                ['@api', './src/api'],
                ['@util', './src/utils'],
                ['@components', './src/components'],
                ['@mixin', './src/mixins'],
                ['@subCom', './src/subPackages/components/common']
            ],
            extensions: ['.vue', '.js', '.json']
        }
      }
    },
    // 允许的全局变量
    'globals': {
        'wx': true,
        'uni': true,
        'require': true,
        "__NODE_ENV__": true,
        "__TABBAR_CONF__": true,
        "getCurrentPages": true,
        "getApp": true,
        "arguments": true
    },
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
        'padded-blocks': 0,
        'one-var': 0,
        'no-return-assign': 0,
        'indent': ['error', 4],
        // 禁止无用表达式 关闭
        'no-unused-expressions': 0,
        'no-param-reassign': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': 0,
        'no-useless-call': 0,
        // var _a的形式允许
        'no-underscore-dangle': 0,
        // i-- 的形式
        'no-plusplus': 0,
        'vue/max-len': 0,
        'max-len': 0,
        'vue/script-indent': ['error', 4, {
            'baseIndent': 1
        }],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        /*===================【关闭一些规则】================*/
        "vue/prop-name-casing": 0,
        /* 关闭属性链接符校验 (uni-app中使用会报错) */
        'vue/attribute-hyphenation':0
    },
    'overrides': [
      {
        'files': ['*.vue'],
        'rules': {
          'indent': 'off'
        }
      }
    ]
};
```

# eslint 忽略文件

文件: .eslintignore
```js
.vscode
dist/*
build/*
hook/*
loaders/*
src/pages.json
node_modules/*
src/utils/
src/vendor
src/plugin
subPackages/components/schedule/mescroll-uni/*
vue.config.js
babel.config.js
postcss.config.js
```
