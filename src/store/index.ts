import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';

// 配置Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  // 在开发环境中启用Redux DevTools
  devTools: process.env.NODE_ENV !== 'production',
});

// 从store本身推断出RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
