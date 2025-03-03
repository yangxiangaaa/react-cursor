import { RouteObject } from 'react-router-dom';

// 使用交叉类型定义路由对象
export type AppRouteObject = RouteObject & {
  // 可以在这里添加自定义属性，例如：
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    permissions?: string[];
  };
};

// 路由配置类型
export type AppRoutes = AppRouteObject[];
