npm install vue --save
npm install @vitejs/plugin-vue @vue/compiler-sfc vite --save-dev

"dev": "vite", // 启动开发服务器
"build": "vite build", // 为生产环境构建产物
"serve": "vite preview" // 本地预览生产构建产物

css modules
任何以.modules.css 为后缀的 css 文件都会被 当成 css module 文件来处理

yarn add typescript @babel/core @babel/preset-env @babel/preset-typescript --save-dev
