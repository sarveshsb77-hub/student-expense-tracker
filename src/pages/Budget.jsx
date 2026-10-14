 import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Swal from 'sweetalert2';

const Budget = () => {
  const { user, transactions, addBudgetHistory, budgetHistory } = useApp();
  const [monthlyBudget, setMonthlyBudget] = useState(user?.budget || 10000);
  const [budgetMonth, setBudgetMonth] = useState(new Date().toISOString().slice(0, 7));

  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const remaining = monthlyBudget - totalExpense;
  const percentage = monthlyBudget > 0 ? Math.min((totalExpense / monthlyBudget) * 100, 100) : 0;

  const categorySpending = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
  });

  const handleSetBudget = (e) => {
    e.preventDefault();
    if (!monthlyBudget || monthlyBudget <= 0) {
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'error', title: 'Please enter a valid budget amount' });
      return;
    }

    addBudgetHistory({
      month: budgetMonth,
      budget: monthlyBudget,
      spent: totalExpense,
      remaining: monthlyBudget - totalExpense,
      status: remaining >= 0 ? 'On Track' : 'Exceeded',
      setDate: new Date().toISOString(),
    });

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const index = users.findIndex(u => u.email === user?.email);
    if (index !== -1) {
      users[index].budget = monthlyBudget;
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: `✅ Budget of ₹${monthlyBudget.toLocaleString('en-IN')} set for ${budgetMonth}` });
  };

  const history = [...budgetHistory].sort((a, b) => {
    if (a.month > b.month) return -1;
    if (a.month < b.month) return 1;
    return 0;
  });

  return (
    <>
      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', fontWeight: '800' }}>🎯 Budget Management</h1>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card" style={{ maxWidth: '520px' }}>
            <div className="card-header"><h3>📝 Set Monthly Budget</h3></div>
            <form onSubmit={handleSetBudget}>
              <div className="form-group">
                <label htmlFor="monthlyBudget">Monthly Budget (₹)</label>
                <input type="number" id="monthlyBudget" value={monthlyBudget} onChange={(e) => setMonthlyBudget(parseFloat(e.target.value) || 0)} placeholder="Enter your monthly budget" min="0" required />
              </div>
              <div className="form-group">
                <label htmlFor="budgetMonth">Month</label>
                <input type="month" id="budgetMonth" value={budgetMonth} onChange={(e) => setBudgetMonth(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">💾 Set Budget</button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card">
            <div className="card-header"><h3>📊 Current Budget Status</h3></div>
            <div className="stats-row">
              <div className="stat-card" style={{ borderLeft: '4px solid var(--primary)' }}><div className="stat-label">📅 Monthly Budget</div><div className="stat-value">₹{monthlyBudget.toLocaleString('en-IN')}</div></div>
              <div className="stat-card" style={{ borderLeft: '4px solid var(--danger)' }}><div className="stat-label">💸 Spent</div><div className="stat-value negative">₹{totalExpense.toLocaleString('en-IN')}</div></div>
              <div className="stat-card" style={{ borderLeft: '4px solid var(--success)' }}><div className="stat-label">💰 Remaining</div><div className={`stat-value ${remaining >= 0 ? 'positive' : 'negative'}`}>₹{Math.max(remaining, 0).toLocaleString('en-IN')}</div></div>
              <div className="stat-card" style={{ borderLeft: '4px solid var(--warning)' }}><div className="stat-label">📈 Budget Used</div><div className="stat-value">{Math.round(percentage)}%</div></div>
            </div>
            <div className="budget-progress" style={{ marginBottom: '0' }}>
              <div className="budget-header"><span className="label">Progress</span><span className="amount">₹{totalExpense.toLocaleString('en-IN')} / ₹{monthlyBudget.toLocaleString('en-IN')}</span></div>
              <div className="budget-bar"><div className="fill" style={{ width: `${percentage}%` }}></div></div>
              <div className="budget-status">
                <span>{remaining < 0 ? `⚠️ Budget exceeded by ₹${Math.abs(remaining).toLocaleString('en-IN')}` : '✅ You\'re on track with your budget!'}</span>
                <span>Remaining: ₹{Math.max(remaining, 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card">
            <div className="card-header"><h3>🏷️ Category Budgets</h3></div>
            <div className="table-responsive">
              <table>
                <thead><tr><th>Category</th><th>Budget</th><th>Spent</th><th>Remaining</th><th>Status</th></tr></thead>
                <tbody>
                  {['Food','Travel','Education','Shopping','Rent','Entertainment','Healthcare','Other'].map(cat => {
                    const spent = categorySpending[cat] || 0;
                    const budget = monthlyBudget * 0.15;
                    const rem = budget - spent;
                    let status = 'Not Set', color = '#6b7280';
                    if (budget > 0) {
                      const pct = (spent / budget) * 100;
                      if (pct > 100) { status = '❌ Exceeded'; color = '#ef4444'; }
                      else if (pct > 80) { status = '⚠️ Near Limit'; color = '#f59e0b'; }
                      else { status = '✅ On Track'; color = '#10b981'; }
                    }
                    return <tr key={cat}><td>{cat}</td><td>₹{budget.toLocaleString('en-IN')}</td><td>₹{spent.toLocaleString('en-IN')}</td><td>₹{Math.max(rem, 0).toLocaleString('en-IN')}</td><td><span style={{ background: color, color: 'white', padding: '1px 8px', borderRadius: '40px', fontSize: '10px' }}>{status}</span></td></tr>;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card">
            <div className="card-header"><h3>📅 Budget History</h3></div>
            <div className="table-responsive">
              <table>
                <thead><tr><th>Month</th><th>Budget</th><th>Spent</th><th>Remaining</th><th>Status</th></tr></thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No budget history available</td></tr>
                  ) : (
                    history.map(entry => (
                      <tr key={entry.id}>
                        <td>{new Date(entry.month + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</td>
                        <td>₹{entry.budget.toLocaleString('en-IN')}</td>
                        <td>₹{entry.spent.toLocaleString('en-IN')}</td>
                        <td>₹{Math.max(entry.remaining, 0).toLocaleString('en-IN')}</td>
                        <td><span style={{ background: entry.remaining >= 0 ? '#10b981' : '#ef4444', color: 'white', padding: '2px 12px', borderRadius: '40px', fontSize: '11px' }}>{entry.remaining >= 0 ? '✅ On Track' : '❌ Exceeded'}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card">
            <div className="card-header"><h3>💡 Budget Tips</h3></div>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>🎯 Try to keep your spending within 70% of your budget</li>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>📊 Review your budget weekly to stay on track</li>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>💰 Consider reducing spending in your highest category</li>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>📈 Save at least 20% of your income each month</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Budget;