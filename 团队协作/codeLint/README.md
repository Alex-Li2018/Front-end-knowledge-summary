# 设置git commit 提交模板

## 1、设置模板，命令如下

这个命令只能设置当前分支的提
+ git config commit.template   [模板文件名]    交模板

这个命令能设置全局的提交模板，注意global前面是两杠
+ git config  — —global commit.template   [模板文件名]  

例如： 
```js
git config commit.template   xxx_template

git config --global commit.template   xxx_template
```

## 2、设置文本编辑器，命令如下：

+ git config --global core.editor  [编辑器名字]

例如：
```js
git config --global core.editor vi
```

## 3、编辑模板提交代码，命令如下

+ git  commit

注意：
```js
a、git commit之前先要使用  git add  将没有入库的代码入库

b、可以使用 git  commit  -a 提交多个代码文件
```