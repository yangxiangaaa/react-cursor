import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { increment, decrement } from '../store/slices/counterSlice';
import Button from '../components/Button';

const Home: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="home-container">
      <h1>首页</h1>
      <div className="counter-section">
        <h2>Redux 计数器示例</h2>
        <div className="counter-display">
          <p>
            当前计数: <strong>{count}</strong>
          </p>
          <div className="counter-buttons">
            <Button onClick={() => dispatch(decrement())} type="primary">
              减少
            </Button>
            <Button onClick={() => dispatch(increment())} type="primary">
              增加
            </Button>
          </div>
        </div>
      </div>
      <div className="navigation-links">
        <h3>导航</h3>
        <ul>
          <li>
            <Link to="/about">关于我们</Link>
          </li>
          <li>
            <Link to="/calculator">计算器</Link>
          </li>
          <li>
            <Link to="/profile">个人资料</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
