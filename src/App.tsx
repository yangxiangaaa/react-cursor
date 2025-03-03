import React from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.less';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header">
          <h1>React 应用示例</h1>
        </header>
        <main className="app-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} React 应用示例. 保留所有权利.</p>
        </footer>
      </div>
    </Provider>
  );
};

export default App;
