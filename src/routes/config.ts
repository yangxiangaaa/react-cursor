import homeRoutes from './home.routes';
import aboutRoutes from './about.routes';
import calculatorRoutes from './calculator.routes';
import profileRoutes from './profile.routes';
import { AppRoutes } from './types';

// 合并所有子路由
export const routes: AppRoutes = [
  ...homeRoutes,
  ...aboutRoutes,
  ...calculatorRoutes,
  ...profileRoutes,
];

export { homeRoutes, aboutRoutes, calculatorRoutes, profileRoutes };
