import { useLocation, useNavigate } from 'react-router-dom';
import { AppRouteObject } from './types';

/**
 * 获取当前路由的元数据
 * @param routes 路由配置
 * @param pathname 当前路径
 * @returns 当前路由的元数据
 */
export const getRouteMetaData = (routes: AppRouteObject[], pathname: string) => {
  const route = routes.find((route) => {
    if (route.index && pathname === '/') {
      return true;
    }
    return route.path === pathname.replace(/^\//, '');
  });

  return route?.meta;
};

/**
 * 检查路由是否需要认证
 * @param routes 路由配置
 * @param pathname 当前路径
 * @returns 是否需要认证
 */
export const isAuthRequired = (routes: AppRouteObject[], pathname: string) => {
  const meta = getRouteMetaData(routes, pathname);
  return meta?.requiresAuth || false;
};

/**
 * 获取路由标题
 * @param routes 路由配置
 * @param pathname 当前路径
 * @returns 路由标题
 */
export const getRouteTitle = (routes: AppRouteObject[], pathname: string) => {
  const meta = getRouteMetaData(routes, pathname);
  return meta?.title || '默认标题';
};

/**
 * 路由守卫钩子
 * @param routes 路由配置
 * @param isAuthenticated 是否已认证
 * @returns 路由守卫函数
 */
export const useRouteGuard = (routes: AppRouteObject[], isAuthenticated: boolean) => {
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = () => {
    const requiresAuth = isAuthRequired(routes, location.pathname);
    if (requiresAuth && !isAuthenticated) {
      // 重定向到登录页面
      navigate('/', { replace: true });
      return false;
    }
    return true;
  };

  return { checkAuth };
};
