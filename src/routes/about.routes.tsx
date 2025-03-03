import React from 'react';
import About from '../pages/About';
import { AppRoutes } from './types';

// About页面路由配置
const aboutRoutes: AppRoutes = [
  {
    path: 'about',
    element: <About />,
    meta: {
      title: '关于我们',
    },
  },
];

export default aboutRoutes;
