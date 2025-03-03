# React + TypeScript + Vite + Less

这是一个使用Vite构建的React+TypeScript+Less项目模板，提供了一个最小化的设置，以便快速开始开发。

## 功能特点

- 基于Vite的快速开发环境
- React 18 + TypeScript支持
- Less CSS预处理器支持
- 热模块替换(HMR)
- ESLint配置
- 装饰器语法支持
- 代码分割和优化
- 跨域代理配置
- Git提交规范检查
- 代码格式化和质量检查
- 构建分析工具

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm start
```

这将启动开发服务器，通常在 http://localhost:5173 上可以访问。

> 注意：你也可以使用 `npm run dev` 命令，它与 `npm start` 效果相同。

### 构建生产版本

```bash
npm run build
```

构建后的文件将位于`dist`目录中。

### 预览生产版本

```bash
npm run preview
```

## 可用的脚本命令

- `npm start` - 启动开发服务器
- `npm run dev` - 启动开发服务器（与start相同）
- `npm run build` - 构建生产版本
- `npm run build:analyze` - 构建生产版本并生成分析报告
- `npm run analyze` - 分析已构建的文件大小
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行ESLint检查
- `npm run lint:fix` - 运行ESLint检查并自动修复问题
- `npm run lint:style` - 运行StyleLint检查
- `npm run lint:style:fix` - 运行StyleLint检查并自动修复问题
- `npm run clean` - 清理dist和node_modules目录
- `npm run typecheck` - 运行TypeScript类型检查

## Git提交规范

本项目使用husky和lint-staged来强制执行Git提交规范。提交消息必须遵循以下格式：

```
type(scope): message
```

可用的类型:

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码风格更改（不影响代码功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统或外部依赖更改
- `ci`: CI配置更改
- `chore`: 其他更改
- `revert`: 回滚提交

示例: `feat(button): add new variant`

## Less使用说明

本项目已配置Less支持，你可以直接使用`.less`文件来编写样式。

### 示例

1. 创建一个`.less`文件，例如`src/styles/example.less`：

```less
@primary-color: #1890ff;

.example {
  color: @primary-color;

  .nested {
    font-weight: bold;
  }
}
```

2. 在组件中导入：

```tsx
import './styles/example.less';

function ExampleComponent() {
  return (
    <div className="example">
      <span className="nested">这是使用Less样式的组件</span>
    </div>
  );
}
```

## 项目结构

```
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 资源文件(图片等)
│   ├── components/     # 组件
│   ├── App.less        # 主应用样式
│   ├── App.tsx         # 主应用组件
│   └── main.tsx        # 入口文件
├── index.html          # HTML模板
├── package.json        # 项目依赖
├── tsconfig.json       # TypeScript配置
├── vite.config.ts      # Vite配置
└── README.md           # 项目说明
```

## 扩展ESLint配置

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
