 import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import MonthlyTrendChart from '../components/charts/MonthlyTrendChart';
import CategoryChart from '../components/charts/CategoryChart';
import IncomeExpenseChart from '../components/charts/IncomeExpenseChart';
import Swal from 'sweetalert2';

const Reports = () => {
  const { transactions } = useApp();
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Apply filters whenever transactions, startDate, or endDate change
  useEffect(() => {
    applyFilters();
  }, [transactions, startDate, endDate]);

  const applyFilters = () => {
    let result = [...transactions];
    if (startDate) {
      result = result.filter(t => t.date >= startDate);
    }
    if (endDate) {
      result = result.filter(t => t.date <= endDate);
    }
    setFiltered(result);
  };

  const handleGenerateReport = () => {
    applyFilters();
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      title: `📊 Report generated with ${filtered.length} transactions`,
    });
  };

  const downloadPDF = () => {
    try {
      const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
      const netSavings = totalIncome - totalExpense;

      // Build HTML content for the report
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Expense Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1f2937; }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #4f8cff; margin-bottom: 30px; }
            .header h1 { color: #4f8cff; font-size: 28px; margin: 0; }
            .header p { color: #6b7280; margin: 5px 0 0; }
            .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px; }
            .stat-box { background: #f9fafb; padding: 16px; border-radius: 8px; text-align: center; border-left: 4px solid #4f8cff; }
            .stat-box .label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; }
            .stat-box .value { font-size: 20px; font-weight: 700; margin-top: 4px; }
            .stat-box .value.positive { color: #10b981; }
            .stat-box .value.negative { color: #ef4444; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f3f4f6; text-align: left; padding: 10px 12px; font-size: 12px; text-transform: uppercase; color: #6b7280; }
            td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
            .footer { margin-top: 30px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            .badge { display: inline-block; padding: 2px 10px; border-radius: 40px; font-size: 11px; font-weight: 600; }
            .badge-income { background: #10b981; color: white; }
            .badge-expense { background: #ef4444; color: white; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>💰 Expense Report</h1>
            <p>Student Expense Tracker - ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            ${startDate || endDate ? `<p style="font-size:13px;">Period: ${startDate || 'Start'} to ${endDate || 'End'}</p>` : ''}
          </div>
          
          <div class="stats">
            <div class="stat-box" style="border-left-color: #10b981;">
              <div class="label">Total Income</div>
              <div class="value positive">₹${totalIncome.toLocaleString('en-IN')}</div>
            </div>
            <div class="stat-box" style="border-left-color: #ef4444;">
              <div class="label">Total Expenses</div>
              <div class="value negative">₹${totalExpense.toLocaleString('en-IN')}</div>
            </div>
            <div class="stat-box" style="border-left-color: ${netSavings >= 0 ? '#10b981' : '#ef4444'};">
              <div class="label">Net Savings</div>
              <div class="value ${netSavings >= 0 ? 'positive' : 'negative'}">₹${netSavings.toLocaleString('en-IN')}</div>
            </div>
            <div class="stat-box" style="border-left-color: #4f8cff;">
              <div class="label">Total Transactions</div>
              <div class="value">${filtered.length}</div>
            </div>
          </div>
          
          <h2 style="font-size:18px;margin:20px 0 10px;">📋 Transaction Details</h2>
          ${filtered.length > 0 ? `
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).map((t, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${t.description}</td>
                  <td>${t.category}</td>
                  <td><span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">${t.type.toUpperCase()}</span></td>
                  <td style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}; font-weight:600;">${t.type === 'income' ? '+' : '-'}₹${t.amount.toLocaleString('en-IN')}</td>
                  <td>${t.date}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          ` : `
          <p style="text-align:center;color:#6b7280;padding:40px 0;">No transactions found for the selected period.</p>
          `}
          
          <div class="footer">
            <p>Generated by Student Expense Tracker &bull; All rights reserved &bull; ${new Date().getFullYear()}</p>
          </div>
        </body>
        </html>
      `;

      // Create blob with HTML content
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Download only – no new tab
      const a = document.createElement('a');
      a.href = url;
      a.download = `Expense_Report_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: '📄 Report downloaded successfully!',
      });
    } catch (error) {
      console.error('Error generating report:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: '❌ Error generating report. Please try again.',
      });
    }
  };

  // Calculate summary stats
  const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netSavings = totalIncome - totalExpense;
  const avgDaily = filtered.filter(t => t.type === 'expense').length > 0 ? Math.round(totalExpense / 30) : 0;

  return (
    <>
      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800' }}>📊 Reports & Analytics</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-outline btn-sm" onClick={() => window.print()}>🖨️ Print</button>
              <button className="btn btn-primary btn-sm" onClick={downloadPDF}>📄 Download PDF</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>📅 Select Period</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '11px' }}>From</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '11px' }}>To</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <button className="btn btn-primary" style={{ fontSize: '12px', padding: '5px 15px' }} onClick={handleGenerateReport}>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="stats-row">
            <div className="stat-card income">
              <div className="stat-label">💰 Total Income</div>
              <div className="stat-value positive">₹{totalIncome.toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card expense">
              <div className="stat-label">💸 Total Expenses</div>
              <div className="stat-value negative">₹{totalExpense.toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card balance">
              <div className="stat-label">📈 Net Savings</div>
              <div className="stat-value" style={{ color: netSavings >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                ₹{netSavings.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="stat-card budget">
              <div className="stat-label">📊 Average Daily Spend</div>
              <div className="stat-value">₹{avgDaily.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card">
              <div className="card-header">
                <h3>📈 Monthly Spending Trend</h3>
              </div>
              <div style={{ height: '250px' }}>
                <MonthlyTrendChart transactions={filtered} />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>🎯 Category Breakdown</h3>
              </div>
              <div style={{ height: '250px' }}>
                <CategoryChart transactions={filtered} />
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
            <div className="card">
              <div className="card-header">
                <h3>📊 Income vs Expenses</h3>
              </div>
              <div style={{ height: '250px' }}>
                <IncomeExpenseChart transactions={filtered} />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>🏷️ Top Spending Categories</h3>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(
                      filtered.filter(t => t.type === 'expense').reduce((acc, t) => {
                        acc[t.category] = (acc[t.category] || 0) + t.amount;
                        return acc;
                      }, {})
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([cat, amt]) => (
                        <tr key={cat}>
                          <td>{cat}</td>
                          <td>₹{amt.toLocaleString('en-IN')}</td>
                          <td>{totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0}%</td>
                        </tr>
                      ))}
                    {Object.entries(
                      filtered.filter(t => t.type === 'expense').reduce((acc, t) => {
                        acc[t.category] = (acc[t.category] || 0) + t.amount;
                        return acc;
                      }, {})
                    ).length === 0 && (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                          No expense data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3>💡 Spending Insights</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary)' }}>
                🍽️ Your highest spending category is <strong>Food</strong> (32% of total expenses)
              </li>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--warning)' }}>
                📈 You spent <strong>15% more</strong> this month compared to last month
              </li>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--success)' }}>
                ✅ You're on track to meet your budget goal
              </li>
              <li style={{ padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--info)' }}>
                📅 Weekend spending is <strong>40% higher</strong> than weekdays
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reports;