import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.less';

// 侧边栏组件
const Sidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const menuItems = [
    { key: 'dashboard', icon: '📊', label: '仪表盘', path: '/dashboard' },
    { key: 'table', icon: '📋', label: '表格管理', path: '/table' },
    { key: 'form', icon: '📝', label: '表单示例', path: '/form' },
    { key: 'charts', icon: '📈', label: '图表展示', path: '/charts' },
    { key: 'profile', icon: '👤', label: '个人中心', path: '/profile' },
    { key: 'settings', icon: '⚙️', label: '系统设置', path: '/settings' },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo">{collapsed ? 'R' : 'React Admin'}</div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.key} className="menu-item">
            <a href={item.path}>
              <span className="icon">{item.icon}</span>
              {!collapsed && <span className="label">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 顶部导航组件
const Header: React.FC<{ collapsed: boolean; toggleCollapse: () => void }> = ({
  collapsed,
  toggleCollapse,
}) => {
  return (
    <div className="header">
      <div className="toggle" onClick={toggleCollapse}>
        {collapsed ? '☰' : '✖'}
      </div>
      <div className="search">
        <input type="text" placeholder="搜索..." />
      </div>
      <div className="actions">
        <span className="action">🔔</span>
        <span className="action">✉️</span>
        <span className="user">👤 管理员</span>
      </div>
    </div>
  );
};

// 主布局组件
const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="main-layout">
      <Sidebar collapsed={collapsed} />
      <div className={`content-container ${collapsed ? 'expanded' : ''}`}>
        <Header collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <div className="content">
          <Outlet />
        </div>
        <div className="footer">
          <p>© {new Date().getFullYear()} React Admin System. 保留所有权利.</p>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
