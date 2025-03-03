import React from 'react';
import Home from '../pages/Home';
import { AppRoutes } from './types';

// Home页面路由配置
const homeRoutes: AppRoutes = [
  {
    index: true,
    element: <Home />,
    meta: {
      title: '首页',
    },
  },
];

export default homeRoutes;
