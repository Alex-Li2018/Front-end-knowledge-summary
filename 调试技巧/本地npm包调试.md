# 本地npm包调试技巧

## npm link 分为两步

### 第一步
在一个包文件夹内执行 npm link 将在全局文件 {prefix}/lib/node_modules/<package> 内，创建一个符号链接（symlink），这个链接指向 npm link 命令执行的地方。

### 第二步
到其它目录下，执行 npm link packageName 命令，将会创建一个从全局安装的 packageName 到当前文件内的 node_modules 下的符号链接。

需要注意的的是， packageName 是取自包的 package.json 中 name 字段，不是文件夹名称。

包的名称可能有作用域前缀，如果有， packageName 也要对应加上。