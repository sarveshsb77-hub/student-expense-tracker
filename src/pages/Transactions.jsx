 import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Swal from 'sweetalert2';

const Transactions = () => {
  const navigate = useNavigate();
  const { transactions, deleteTransaction } = useApp();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    type: 'all',
    startDate: '',
    endDate: '',
  });

  const categoryOptions = ['Food', 'Travel', 'Education', 'Shopping', 'Rent', 'Entertainment', 'Healthcare', 'Other'];
  const typeOptions = ['income', 'expense'];

  useEffect(() => {
    applyFilters();
  }, [transactions, filters]);

  const applyFilters = () => {
    const { search, category, type, startDate, endDate } = filters;
    let result = [...transactions];
    if (search) result = result.filter(t => t.description.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') result = result.filter(t => t.category === category);
    if (type !== 'all') result = result.filter(t => t.type === type);
    if (startDate) result = result.filter(t => t.date >= startDate);
    if (endDate) result = result.filter(t => t.date <= endDate);
    setFiltered(result);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: 'all', type: 'all', startDate: '', endDate: '' });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Transaction?',
      text: 'Are you sure you want to delete this transaction?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4f8cff',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(id);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: '🗑️ Transaction deleted!',
        });
      }
    });
  };

  const handleEdit = (id) => navigate(`/edit-transaction/${id}`);

  const summary = {
    total: filtered.length,
    income: filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    expense: filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
  };

  return (
    <>
      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800' }}>📋 Transactions</h1>
            <Link to="/add-transaction" className="btn btn-primary">➕ Add Transaction</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="filter-section">
            <h3 style={{ marginBottom: '16px' }}>🔍 Filter Transactions</h3>
            <div className="filter-grid">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input type="date" id="startDate" value={filters.startDate} onChange={handleFilterChange} />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input type="date" id="endDate" value={filters.endDate} onChange={handleFilterChange} />
              </div>
              <div className="form-group">
                <label htmlFor="categoryFilter">Category</label>
                <select id="categoryFilter" value={filters.category} onChange={handleFilterChange}>
                  <option value="all">All Categories</option>
                  {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="typeFilter">Type</label>
                <select id="typeFilter" value={filters.type} onChange={handleFilterChange}>
                  <option value="all">All Types</option>
                  {typeOptions.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="searchInput">Search</label>
                <input type="text" id="searchInput" value={filters.search} onChange={handleFilterChange} placeholder="Search by description..." />
              </div>
              <div style={{ display: 'flex', gap: '8px', alignSelf: 'end', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm" onClick={applyFilters}>Apply Filters</button>
                <button className="btn btn-outline btn-sm" onClick={clearFilters}>Clear</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Total Records</p>
              <p style={{ fontSize: '24px', fontWeight: '800' }}>{summary.total}</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Total Income</p>
              <p style={{ fontSize: '24px', fontWeight: '800', color: 'var(--success)' }}>₹{summary.income.toLocaleString('en-IN')}</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Total Expenses</p>
              <p style={{ fontSize: '24px', fontWeight: '800', color: 'var(--danger)' }}>₹{summary.expense.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card" style={{ overflow: 'hidden', padding: '0' }}>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr><th>#</th><th>Description</th><th>Category</th><th>Amount</th><th>Type</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No transactions found. Add your first transaction!</td></tr>
                  ) : (
                    filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tx, index) => (
                      <tr key={tx.id}>
                        <td>{index + 1}</td>
                        <td><strong>{tx.description}</strong></td>
                        <td><span className="category-badge">{tx.category}</span></td>
                        <td className={tx.type === 'income' ? 'income' : 'expense'}>
                          {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                        </td>
                        <td><span className={`type-badge ${tx.type}`}>{tx.type.toUpperCase()}</span></td>
                        <td>{tx.date}</td>
                        <td>
                          <div className="action-buttons">
                            <button onClick={() => handleEdit(tx.id)} className="btn btn-primary btn-sm">✏️</button>
                            <button onClick={() => handleDelete(tx.id)} className="btn btn-danger btn-sm">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transactions;