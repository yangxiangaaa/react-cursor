import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { updateUserProfile, loginSuccess, logout } from '../store/slices/userSlice';
import Button from '../components/Button';

const Profile: React.FC = () => {
  const { currentUser, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(currentUser?.name ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');

  const handleLogin = () => {
    // 模拟登录
    dispatch(
      loginSuccess({
        id: '1',
        name: '测试用户',
        email: 'test@example.com',
        avatar: 'https://via.placeholder.com/150',
      }),
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile({ name, email }));
  };

  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <h1>个人资料</h1>
        <div className="login-section">
          <p>您尚未登录，请先登录查看个人资料。</p>
          <Button onClick={handleLogin} type="primary">
            模拟登录
          </Button>
        </div>
        <div className="back-link">
          <Link to="/">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>个人资料</h1>
      <div className="profile-content">
        {currentUser?.avatar && (
          <div className="avatar">
            <img src={currentUser.avatar} alt="用户头像" />
          </div>
        )}
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <Button onClick={handleUpdateProfile} type="primary">
              更新资料
            </Button>
            <Button onClick={handleLogout} type="default">
              退出登录
            </Button>
          </div>
        </div>
      </div>
      <div className="back-link">
        <Link to="/">返回首页</Link>
      </div>
    </div>
  );
};

export default Profile;
