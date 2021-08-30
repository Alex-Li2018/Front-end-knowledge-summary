module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    plugins: ['vue'],
    env: {
        es6: true,
        node: true,
        browser: true,
        mocha: true
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:vue/strongly-recommended'
    ],
    // add your custom rules here
    rules: {
        'no-param-reassign': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
        'padded-blocks': 0,
        'one-var': 0,
        'no-return-assign': 0,
        indent: ['error', 4],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': 0,
        'no-useless-call': 0,
        'no-unused-expressions': 0,
        'func-names': 0,
        'prefer-rest-params': 0,
        'vue/max-len': 0,
        'max-len': 0,
        'vue/script-indent': ['error', 4, {
            baseIndent: 1
        }],
        // 关闭循环引用问题
        'import/no-cycle': 0,
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: []
        }],
        'linebreak-style': ['off', 'windows'],
        /*= ==================【关闭一些规则】================ */
        'vue/prop-name-casing': 0,
        /* 关闭属性链接符校验 (uni-app中使用会报错) */
        'vue/attribute-hyphenation': 0
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off'
            }
        }
    ],
    globals: {
        uni: true,
        wx: true,
        __NODE_ENV__: true,
        __TABBAR_CONF__: true,
        getCurrentPages: true,
        getApp: true,
        Component: true
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'node_modules/@vue/cli-service/webpack.config.js'
            },
            alias: {
                map: [
                    ['@', './src']
                ],
                extensions: ['.vue', '.js', '.json']
            },
        }
    },
};
