# sentry

- 异常上报，源码定位
- 性能表现
- 测试覆盖
- 问题解决分配
- 版本 环境区分
- 支持语言非常多几乎囊括了所有编程语言

## 接入指南

### 搭建sentry的服务端

如果不搭建自己的服务端就需要在![sentry](https://sentry.io/signup/)官网上注册一个账号以及新建一个项目。如果以上步骤都执行完成，会得到

- DNS：sentry上报地址

### vue接入sentry

- 安装sentry依赖

```js
npm install --save @sentry/vue @sentry/tracing
```

- vue2 配置

```js
import Vue from "vue";
import Router from "vue-router";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

Vue.use(Router);

const router = new Router({
  // ...
});

Sentry.init({
  Vue,
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// ...

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
```

- vue3 配置

```js
import { createApp } from "vue";
import { createRouter } from "vue-router";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp({
  // ...
});
const router = createRouter({
  // ...
});

Sentry.init({
  app,
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(router);
app.mount("#app");
```

## sentry配置

### Basic Options

```js
Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  maxBreadcrumbs: 50,
  debug: true,
});
```

**常见选项**

- dsn: 上报地址
- debug: 开启之后会在控制台打印对应的内容
- release: 版本号，最后利用CI/CD自动填充
- environment: 环境 dev / test / prod
- sampleRate: 配置错误示例的采样率，如果设置1.0那么就是100%全采样，如果是0.1就是10%的随机采样
- denyUrls: 一个匹配路由正则表达式列表可以定制那些页面的错误不上报
- allowUrls: 一个匹配路由正则表达式列表可以定制那些页面的错误上报
- initialScope: 可以是一个对象或者函数，可以定制用户信息
  ```js
  Sentry.init({
    dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
    debug: true,
    initialScope: {
        tags: { "my-tag": "my value" },
        user: { id: 42, email: "john.doe@example.com" },
    },
  });
  ```

**一体化配置（Integration Configuration）**

- 主要是vue router的配置,支持vue-router v2 - v4版本
  
  ```js
    Sentry.init({
        Vue,
        dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
        tracesSampleRate: 1.0,
        integrations: [
            new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            }),
        ],
    });
  ```


## source map

大部分的javascript代码都要经过压缩，混淆之后才能投入生产，这样排查错误变得非常困难。通常，JavaScript的解释器会告诉你，第几行第几列代码出错。但是，这对于转换后的代码毫无用处。举例来说，jQuery 1.9压缩后只有3行，每行3万个字符，所有内部变量都改了名字。你看着报错信息，感到毫无头绪，根本不知道它所对应的原始位置。

Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。

### 上传source map到sentry

[利用sentry cli上传](https://docs.sentry.io/platforms/javascript/guides/vue/sourcemaps/uploading/cli/)

## 参考

- [sentry vue](https://docs.sentry.io/platforms/javascript/guides/vue/)
- [JavaScript Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)