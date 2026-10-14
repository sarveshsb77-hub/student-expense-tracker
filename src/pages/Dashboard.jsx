 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import WeeklyChart from '../components/charts/WeeklyChart';
import CategoryChart from '../components/charts/CategoryChart';

const Dashboard = () => {
  const { user, transactions } = useApp();
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    remaining: 0,
    budgetUsed: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    const incomes = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');
    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const budget = user?.budget || 10000;
    const remaining = budget - totalExpense;
    const percentage = budget > 0 ? Math.min((totalExpense / budget) * 100, 100) : 0;
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

    setStats({ totalIncome, totalExpense, remaining, budgetUsed: percentage, recentTransactions: sorted });
  }, [transactions, user]);

  return (
    <>
      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '800' }}>📊 Dashboard</h1>
              <p style={{ color: 'var(--gray-500)' }}>Welcome back, {user?.name || 'Student'}!</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>
              🔄 Refresh
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="stats-row">
            <div className="stat-card income">
              <div className="stat-label">💰 Total Income</div>
              <div className="stat-value positive">₹{stats.totalIncome.toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card expense">
              <div className="stat-label">💸 Total Expenses</div>
              <div className="stat-value negative">₹{stats.totalExpense.toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card balance">
              <div className="stat-label">📈 Remaining Balance</div>
              <div className="stat-value">₹{Math.max(stats.remaining, 0).toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card budget">
              <div className="stat-label">🎯 Budget Used</div>
              <div className="stat-value">{Math.round(stats.budgetUsed)}%</div>
              <div className="stat-sub">of ₹{(user?.budget || 10000).toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="budget-progress">
            <div className="budget-header">
              <span className="label">📅 Monthly Budget Progress</span>
              <span className="amount">
                ₹{stats.totalExpense.toLocaleString('en-IN')} / ₹{(user?.budget || 10000).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="budget-bar">
              <div className="fill" style={{ width: `${Math.min(stats.budgetUsed, 100)}%` }}></div>
            </div>
            <div className="budget-status">
              <span>
                {stats.remaining < 0
                  ? `⚠️ Budget exceeded by ₹${Math.abs(stats.remaining).toLocaleString('en-IN')}`
                  : '✅ You\'re on track with your budget'}
              </span>
              <span>Remaining: ₹{Math.max(stats.remaining, 0).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="card">
              <div className="card-header">
                <h3>📈 Weekly Spending Trend</h3>
              </div>
              <div style={{ height: '250px' }}>
                <WeeklyChart transactions={transactions} />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>🎯 Spending by Category</h3>
              </div>
              <div style={{ height: '250px' }}>
                <CategoryChart transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3>📋 Recent Transactions</h3>
              <Link to="/transactions" className="action-link">View All →</Link>
            </div>
            <div>
              {stats.recentTransactions.length === 0 ? (
                <div style={{ padding: '10px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px' }}>
                  No transactions yet
                </div>
              ) : (
                stats.recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="transaction-item"
                    style={{ borderLeftColor: tx.type === 'income' ? 'var(--success)' : 'var(--danger)' }}
                  >
                    <div className="info">
                      <span>{tx.description}</span>
                      <span className="category">{tx.category}</span>
                      <span style={{ fontSize: '13px', color: 'var(--gray-400)' }}>{tx.date}</span>
                    </div>
                    <div className={`amount ${tx.type === 'income' ? 'income' : 'expense'}`}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;