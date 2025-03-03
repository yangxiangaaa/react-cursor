import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/userSlice';

const About: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="about-container">
      <h1>yiiuiui</h1>
      <div className="about-content">
        <p>
          这是一个使用 React + TypeScript + Vite + Redux + React Router 构建的示例项目。
          该项目展示了如何集成这些技术来创建一个现代化的 Web 应用程序。
        </p>
        <h2 onClick={handleLogout}>{isLoggedIn ? '退出登录' : '登录'}</h2>
        <ul>
          <li>React 19 - 用户界面库</li>
          <li>TypeScript - 类型安全的 JavaScript 超集</li>
          <li>Vite - 快速的前端构建工具</li>
          <li>Redux Toolkit - 状态管理</li>
          <li>React Router - 客户端路由</li>
          <li>Less - CSS 预处理器</li>
        </ul>
        <h2>功能特点</h2>
        <ul>
          <li>类型安全的代码</li>
          <li>组件化架构</li>
          <li>集中式状态管理</li>
          <li>客户端路由</li>
          <li>响应式设计</li>
        </ul>
      </div>
      <div className="back-link">
        <Link to="/">返回首页</Link>
      </div>
    </div>
  );
};

export default About;
