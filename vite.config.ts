import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import viteProgressBar from 'vite-plugin-progress';
import viteEslint from 'vite-plugin-eslint';
// import viteStylelint from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');

  const isProd = mode === 'production';

  return {
    plugins: [
      // React 插件，支持 JSX 和 TSX
      react({
        babel: {
          plugins: [
            // 启用装饰器语法
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ],
        },
      }),

      // 显示构建进度
      viteProgressBar(),

      // ESLint 检查
      viteEslint({
        failOnError: isProd,
      }),

      // StyleLint 检查 - 暂时禁用
      /* viteStylelint({
        // 是否在开发中自动修复
        fix: true,
      }), */

      // 生产环境启用 gzip 压缩
      isProd &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz',
        }),

      // 生产环境启用打包分析
      isProd &&
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
    ],

    // 路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@store': resolve(__dirname, 'src/store'),
        '@api': resolve(__dirname, 'src/api'),
      },
    },

    // CSS 预处理器配置
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // 自定义主题
          modifyVars: {
            'primary-color': '#1890ff',
            'link-color': '#1890ff',
            'success-color': '#52c41a',
            'warning-color': '#faad14',
            'error-color': '#f5222d',
            'font-size-base': '14px',
            'heading-color': 'rgba(0, 0, 0, 0.85)',
            'text-color': 'rgba(0, 0, 0, 0.65)',
            'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
            'disabled-color': 'rgba(0, 0, 0, 0.25)',
            'border-radius-base': '4px',
            'border-color-base': '#d9d9d9',
            'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },

    // 开发服务器配置
    server: {
      port: 5173,
      open: true,
      cors: true,
      // 代理配置，解决跨域问题
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // 构建配置
    build: {
      // 指定输出路径
      outDir: 'dist',
      // 生成静态资源的存放路径
      assetsDir: 'assets',
      // 小于此阈值的导入或引用资源将内联为 base64 编码
      assetsInlineLimit: 4096,
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件
      sourcemap: !isProd,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // 代码分割策略
          manualChunks: {
            // 将 React 相关库打包成单独的 chunk 中
            'react-vendor': ['react', 'react-dom'],
            // 将第三方依赖打包成单独的 chunk 中
            vendor: [
              // 可以添加其他第三方库
            ],
          },
        },
      },
      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境去除 console
          drop_console: isProd,
          drop_debugger: isProd,
        },
      },
    },
  };
});
