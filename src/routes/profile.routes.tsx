import React from 'react';
import Profile from '../pages/Profile';
import { AppRoutes } from './types';

// Profile页面路由配置
const profileRoutes: AppRoutes = [
  {
    path: 'profile',
    element: <Profile />,
    meta: {
      title: '个人资料',
      requiresAuth: true,
    },
  },
];

export default profileRoutes;
