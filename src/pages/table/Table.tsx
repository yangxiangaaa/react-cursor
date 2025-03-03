import React, { useState } from 'react';
import './Table.less';

// 定义表格数据类型
interface TableData {
  id: number;
  name: string;
  age: number;
  address: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
}

// 表格页面组件
const TablePage: React.FC = () => {
  // 模拟表格数据
  const initialData: TableData[] = [
    {
      id: 1,
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      email: 'zhangsan@example.com',
      status: 'active',
    },
    {
      id: 2,
      name: '李四',
      age: 42,
      address: '上海市浦东新区',
      email: 'lisi@example.com',
      status: 'active',
    },
    {
      id: 3,
      name: '王五',
      age: 28,
      address: '广州市天河区',
      email: 'wangwu@example.com',
      status: 'inactive',
    },
    {
      id: 4,
      name: '赵六',
      age: 35,
      address: '深圳市南山区',
      email: 'zhaoliu@example.com',
      status: 'pending',
    },
    {
      id: 5,
      name: '钱七',
      age: 45,
      address: '杭州市西湖区',
      email: 'qianqi@example.com',
      status: 'active',
    },
    {
      id: 6,
      name: '孙八',
      age: 29,
      address: '成都市武侯区',
      email: 'sunba@example.com',
      status: 'inactive',
    },
    {
      id: 7,
      name: '周九',
      age: 38,
      address: '南京市鼓楼区',
      email: 'zhoujiu@example.com',
      status: 'active',
    },
    {
      id: 8,
      name: '吴十',
      age: 27,
      address: '武汉市江汉区',
      email: 'wushi@example.com',
      status: 'pending',
    },
  ];

  // 状态
  const [data, setData] = useState<TableData[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof TableData | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<TableData>({
    id: 0,
    name: '',
    age: 0,
    address: '',
    email: '',
    status: 'active',
  });

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 重置到第一页
  };

  // 处理排序
  const handleSort = (field: keyof TableData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 处理选择行
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // 处理全选
  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.id));
    }
  };

  // 处理删除
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      setData(data.filter((item) => item.id !== id));
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    if (selectedRows.length === 0) {
      alert('请先选择要删除的记录');
      return;
    }

    if (window.confirm(`确定要删除选中的 ${selectedRows.length} 条记录吗？`)) {
      setData(data.filter((item) => !selectedRows.includes(item.id)));
      setSelectedRows([]);
    }
  };

  // 处理编辑
  const handleEdit = (id: number) => {
    const rowToEdit = data.find((item) => item.id === id);
    if (rowToEdit) {
      setEditingId(id);
      setEditFormData(rowToEdit);
    }
  };

  // 处理编辑表单变化
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'age' ? parseInt(value) : value,
    });
  };

  // 处理保存编辑
  const handleSaveEdit = () => {
    setData(data.map((item) => (item.id === editingId ? editFormData : item)));
    setEditingId(null);
  };

  // 处理取消编辑
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // 过滤数据
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 排序数据
  const sortedData = sortField
    ? [...filteredData].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      })
    : filteredData;

  // 分页数据
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // 渲染分页器
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }
    return (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          上一页
        </button>
        {pages}
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          下一页
        </button>
      </div>
    );
  };

  // 渲染状态标签
  const renderStatus = (status: string) => {
    let className = '';
    let text = '';

    switch (status) {
      case 'active':
        className = 'status-active';
        text = '活跃';
        break;
      case 'inactive':
        className = 'status-inactive';
        text = '不活跃';
        break;
      case 'pending':
        className = 'status-pending';
        text = '待处理';
        break;
      default:
        className = '';
        text = status;
    }

    return <span className={`status-tag ${className}`}>{text}</span>;
  };

  return (
    <div className="table-page">
      <div className="table-header">
        <h2>用户管理</h2>
        <div className="table-actions">
          <div className="search-box">
            <input type="text" placeholder="搜索..." value={searchTerm} onChange={handleSearch} />
          </div>
          <button className="add-button">添加用户</button>
          <button
            className="delete-button"
            onClick={handleBatchDelete}
            disabled={selectedRows.length === 0}
          >
            批量删除
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input
                  type="checkbox"
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th onClick={() => handleSort('id')} className="sortable">
                ID
                {sortField === 'id' && (
                  <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                姓名
                {sortField === 'name' && (
                  <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => handleSort('age')} className="sortable">
                年龄
                {sortField === 'age' && (
                  <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>地址</th>
              <th>邮箱</th>
              <th onClick={() => handleSort('status')} className="sortable">
                状态
                {sortField === 'status' && (
                  <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                  />
                </td>
                <td>{item.id}</td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      name="age"
                      value={editFormData.age}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    item.age
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    item.address
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    item.email
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditFormChange}
                    >
                      <option value="active">活跃</option>
                      <option value="inactive">不活跃</option>
                      <option value="pending">待处理</option>
                    </select>
                  ) : (
                    renderStatus(item.status)
                  )}
                </td>
                <td className="action-column">
                  {editingId === item.id ? (
                    <>
                      <button className="save-button" onClick={handleSaveEdit}>
                        保存
                      </button>
                      <button className="cancel-button" onClick={handleCancelEdit}>
                        取消
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit-button" onClick={() => handleEdit(item.id)}>
                        编辑
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(item.id)}>
                        删除
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="pagination-info">
          显示 {indexOfFirstItem + 1} 到 {Math.min(indexOfLastItem, sortedData.length)} 条，共{' '}
          {sortedData.length} 条
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default TablePage;
