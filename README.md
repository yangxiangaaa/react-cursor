# React Admin System

基于 React + TypeScript + Vite 的后台管理系统解决方案。

## 功能特点

- 🚀 使用 React 19 + TypeScript + Vite 最新技术栈
- 📦 集成 Redux Toolkit 状态管理
- 🎨 响应式布局，适配不同屏幕尺寸
- 🔐 用户认证与权限管理
- 📊 丰富的图表组件
- 📝 表单验证与处理
- 📋 表格数据展示与操作
- 🌓 支持明暗主题切换
- 🧩 模块化设计，易于扩展
- 🔍 全局搜索功能
- 🌐 国际化支持
- 📱 移动端适配

## 页面功能

- 登录/注销
- Dashboard 数据统计
- 表格管理
- 表单示例
- 图表展示
- 个人中心
- 系统设置
- 权限管理
- 用户管理
- 菜单管理

## 可用的脚本命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码格式检查
npm run lint
npm run lint:fix

# 样式格式检查
npm run lint:style
npm run lint:style:fix

# 类型检查
npm run typecheck

# 清理构建文件和依赖
npm run clean
```

## 项目结构

```
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── api/              # API请求
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── hooks/            # 自定义Hooks
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面组件
│   ├── routes/           # 路由配置
│   ├── store/            # Redux状态管理
│   ├── styles/           # 全局样式
│   ├── types/            # TypeScript类型定义
│   ├── utils/            # 工具函数
│   ├── App.tsx           # 应用入口组件
│   └── main.tsx          # 应用入口文件
├── .env                  # 环境变量
├── .eslintrc.js          # ESLint配置
├── .prettierrc           # Prettier配置
├── tsconfig.json         # TypeScript配置
└── vite.config.ts        # Vite配置
```

## 浏览器支持

- 现代浏览器和 IE11+

## 许可证

[MIT](LICENSE)
