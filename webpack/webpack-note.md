# webpack5从零配置学习笔记

1. 初始化项目
npm init -y

2. 安装webpack
npm install webpack webpack-cli --save-dev （webpack-cli作用？）

3. 根目录下创建入口文件 src/index.js
未额外添加webpack配置文件时 webpack默认入口是src/index.js

4. 添加添加webpack.config.js
webpack.config.js 默认导出一个对象 属性就是webpack的各项配置