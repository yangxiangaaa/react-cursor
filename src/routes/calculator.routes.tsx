import React from 'react';
import Calculator from '../pages/Calculator';
import { AppRoutes } from './types';

// Calculator页面路由配置
const calculatorRoutes: AppRoutes = [
  {
    path: 'calculator',
    element: <Calculator />,
    meta: {
      title: '计算器',
    },
  },
];

export default calculatorRoutes;
