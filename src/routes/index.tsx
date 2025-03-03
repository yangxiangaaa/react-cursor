import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';

// 导入各个页面的路由配置
import homeRoutes from './home.routes';
import aboutRoutes from './about.routes';
import calculatorRoutes from './calculator.routes';
import profileRoutes from './profile.routes';
import { AppRoutes } from './types';

// 合并所有子路由
const childRoutes: AppRoutes = [
  ...homeRoutes,
  ...aboutRoutes,
  ...calculatorRoutes,
  ...profileRoutes,
];

// 定义主路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: childRoutes,
  },
]);

// 路由提供者组件
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
