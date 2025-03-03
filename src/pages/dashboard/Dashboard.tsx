import React from 'react';
import './Dashboard.less';

// 卡片组件
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: string;
  color: string;
}> = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
};

// 图表组件（模拟）
const ChartCard: React.FC<{
  title: string;
  height: number;
}> = ({ title, height }) => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{title}</h3>
      </div>
      <div className="chart-content" style={{ height: `${height}px` }}>
        <div className="chart-placeholder">图表区域 - 实际项目中可集成 Recharts 或其他图表库</div>
      </div>
    </div>
  );
};

// 表格组件（模拟）
const TableCard: React.FC<{
  title: string;
  data: Array<{ id: number; name: string; status: string; date: string }>;
}> = ({ title, data }) => {
  // 渲染状态标签
  const getStatusClass = (status: string) => {
    switch (status) {
      case '完成':
        return 'status-completed';
      case '进行中':
        return 'status-in-progress';
      case '待处理':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>{title}</h3>
      </div>
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>状态</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <span className={`status ${getStatusClass(item.status)}`}>{item.status}</span>
                </td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 仪表盘页面
const Dashboard: React.FC = () => {
  // 模拟数据
  const tableData = [
    { id: 1, name: '产品发布', status: '完成', date: '2023-05-12' },
    { id: 2, name: '市场推广', status: '进行中', date: '2023-05-15' },
    { id: 3, name: '客户反馈', status: '待处理', date: '2023-05-18' },
    { id: 4, name: '系统更新', status: '完成', date: '2023-05-20' },
    { id: 5, name: '数据分析', status: '进行中', date: '2023-05-22' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>仪表盘</h2>
        <p>欢迎回来，管理员</p>
      </div>

      <div className="stats-container">
        <StatCard title="用户总数" value="1,286" icon="👥" color="#1890ff" />
        <StatCard title="订单总数" value="256" icon="📦" color="#52c41a" />
        <StatCard title="本月收入" value="¥28,560" icon="💰" color="#faad14" />
        <StatCard title="待处理工单" value="12" icon="📝" color="#f5222d" />
      </div>

      <div className="charts-container">
        <div className="chart-row">
          <ChartCard title="访问量趋势" height={300} />
          <ChartCard title="销售额分析" height={300} />
        </div>
      </div>

      <div className="table-container">
        <TableCard title="最近活动" data={tableData} />
      </div>
    </div>
  );
};

export default Dashboard;
