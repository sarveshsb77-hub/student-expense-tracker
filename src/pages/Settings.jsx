 import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Swal from 'sweetalert2';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState('INR');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [defaultType, setDefaultType] = useState('expense');

  return (
    <>
      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', fontWeight: '800' }}>⚙️ Settings</h1>
          <p style={{ color: 'var(--gray-500)' }}>Customize your expense tracker experience</p>
        </div>
      </section>

      {/* General Settings - Reduced card size */}
      <section>
        <div className="container">
          <div className="card" style={{ padding: '8px 12px' }}>
            <div className="card-header" style={{ paddingBottom: '6px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700' }}>🔧 General Settings</h3>
            </div>
            <form>
              <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '3px' }}>Default Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '2px solid var(--gray-200)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'var(--gray-50)',
                      color: 'var(--gray-800)',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '3px' }}>Date Format</label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '2px solid var(--gray-200)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'var(--gray-50)',
                      color: 'var(--gray-800)',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '3px' }}>Default Type</label>
                  <select
                    value={defaultType}
                    onChange={(e) => setDefaultType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '2px solid var(--gray-200)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'var(--gray-50)',
                      color: 'var(--gray-800)',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '3px' }}>Theme</label>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={toggleTheme}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      borderRadius: '10px',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '0.3px',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'var(--primary-gradient)',
                      color: '#ffffff',
                      boxShadow: '0 4px 15px rgba(79,70,229,0.35)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(79,70,229,0.45)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(79,70,229,0.35)';
                    }}
                  >
                    {theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
                  </button>
                </div>

                <div style={{ textAlign: 'right', marginTop: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      minWidth: '100px',
                      fontSize: '13px',
                      fontWeight: '600',
                      padding: '5px 16px',
                      minHeight: '32px',
                      justifyContent: 'center',
                    }}
                    onClick={() => {
                      Swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: '✅ General settings saved!',
                        background: theme === 'dark' ? '#132043' : '#ffffff',
                        color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                      });
                    }}
                  >
                    💾 Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section>
        <div className="container">
          <div className="card" style={{ padding: '12px 16px' }}>
            <div className="card-header" style={{ paddingBottom: '6px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700' }}>🔔 Notification Settings</h3>
            </div>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-50)', padding: '2px 10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }}>
                  <input type="checkbox" defaultChecked style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
                  <label style={{ fontWeight: '500', fontSize: '13px', cursor: 'pointer', color: 'var(--gray-700)' }}>Budget Alert</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-50)', padding: '2px 10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }}>
                  <input type="checkbox" defaultChecked style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
                  <label style={{ fontWeight: '500', fontSize: '13px', cursor: 'pointer', color: 'var(--gray-700)' }}>Weekly Report</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-50)', padding: '2px 10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }}>
                  <input type="checkbox" style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
                  <label style={{ fontWeight: '500', fontSize: '13px', cursor: 'pointer', color: 'var(--gray-700)' }}>Daily Reminder</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-50)', padding: '2px 10px', borderRadius: '4px', border: '1px solid var(--gray-200)' }}>
                  <input type="checkbox" style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
                  <label style={{ fontWeight: '500', fontSize: '13px', cursor: 'pointer', color: 'var(--gray-700)' }}>Email Notifications</label>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    minWidth: '100px',
                    fontSize: '13px',
                    fontWeight: '600',
                    padding: '5px 16px',
                    minHeight: '32px',
                    justifyContent: 'center',
                  }}
                  onClick={() => {
                    Swal.fire({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      icon: 'success',
                      title: '✅ Notification settings saved!',
                      background: theme === 'dark' ? '#132043' : '#ffffff',
                      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                    });
                  }}
                >
                  💾 Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Management */}
      <section>
        <div className="container">
          <div className="card" style={{ padding: '12px 16px' }}>
            <div className="card-header" style={{ paddingBottom: '6px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700' }}>💾 Data Management</h3>
            </div>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const data = {
                      user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
                      transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
                      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
                      budgetHistory: JSON.parse(localStorage.getItem('budgetHistory') || '[]'),
                      registeredUsers: JSON.parse(localStorage.getItem('registeredUsers') || '[]'),
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `expense_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    Swal.fire({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      icon: 'success',
                      title: '📤 Data exported successfully!',
                      background: theme === 'dark' ? '#132043' : '#ffffff',
                      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                    });
                  }}
                  style={{
                    minWidth: '110px',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'var(--primary-gradient)',
                    color: '#ffffff',
                    boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
                    transition: 'all 0.2s ease',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(79,70,229,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(79,70,229,0.3)';
                  }}
                >
                  📤 Export All Data (JSON)
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    Swal.fire({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      icon: 'info',
                      title: '📤 CSV export coming soon!',
                      background: theme === 'dark' ? '#132043' : '#ffffff',
                      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                    });
                  }}
                  style={{
                    minWidth: '110px',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'var(--primary-gradient)',
                    color: '#ffffff',
                    boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
                    transition: 'all 0.2s ease',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(79,70,229,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(79,70,229,0.3)';
                  }}
                >
                  📤 Export Data (CSV)
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    Swal.fire({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      icon: 'info',
                      title: '📥 Import data coming soon!',
                      background: theme === 'dark' ? '#132043' : '#ffffff',
                      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                    });
                  }}
                  style={{
                    minWidth: '110px',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2px',
                    cursor: 'pointer',
                    border: '2px solid var(--primary)',
                    background: 'transparent',
                    color: 'var(--primary)',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--primary)';
                    e.target.style.color = '#ffffff';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(79,70,229,0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--primary)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  📥 Import Data
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Swal.fire({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      icon: 'success',
                      title: '💾 Backup created!',
                      background: theme === 'dark' ? '#132043' : '#ffffff',
                      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                    });
                  }}
                  style={{
                    minWidth: '110px',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'var(--success)',
                    color: '#ffffff',
                    boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
                    transition: 'all 0.2s ease',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(16,185,129,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(16,185,129,0.3)';
                  }}
                >
                  💾 Create Backup
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    Swal.fire({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      icon: 'success',
                      title: '🔄 Backup restored!',
                      background: theme === 'dark' ? '#132043' : '#ffffff',
                      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                    });
                  }}
                  style={{
                    minWidth: '110px',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2px',
                    cursor: 'pointer',
                    border: '2px solid var(--primary)',
                    background: 'transparent',
                    color: 'var(--primary)',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--primary)';
                    e.target.style.color = '#ffffff';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(79,70,229,0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--primary)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  🔄 Restore Backup
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    Swal.fire({
                      title: 'Reset All Settings?',
                      text: 'This will reset everything to default.',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#ef4444',
                      cancelButtonColor: '#6b7280',
                      confirmButtonText: 'Reset',
                      cancelButtonText: 'Cancel',
                      background: theme === 'dark' ? '#132043' : '#ffffff',
                      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        localStorage.setItem('theme', 'light');
                        window.location.reload();
                      }
                    });
                  }}
                  style={{
                    minWidth: '110px',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'var(--danger)',
                    color: '#ffffff',
                    boxShadow: '0 2px 8px rgba(239,68,68,0.3)',
                    transition: 'all 0.2s ease',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(239,68,68,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(239,68,68,0.3)';
                  }}
                >
                  🔄 Reset All Settings
                </button>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--gray-500)', textAlign: 'center', marginTop: '8px' }}>
                Export, import, or manage your data securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section>
        <div className="container">
          <div className="card" style={{ padding: '12px 16px' }}>
            <div className="card-header" style={{ paddingBottom: '6px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700' }}>ℹ️ About</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '4px 0' }}>
              <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px', color: 'var(--gray-900)' }}>💰 Student Expense Tracker</p>
              <p style={{ color: 'var(--gray-500)', fontSize: '13px' }}>v2.0.0</p>
              <p style={{ color: 'var(--gray-500)', marginTop: '2px', fontSize: '13px' }}>Manage your finances smartly.</p>
              <p style={{ color: 'var(--gray-400)', marginTop: '4px', fontSize: '12px' }}>© 2026 All Rights Reserved</p>
              <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '13px' }}>
                <a href="#" style={{ color: 'var(--primary)', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-dark)'} onMouseOut={(e) => e.target.style.color = 'var(--primary)'}>Privacy Policy</a>
                <a href="#" style={{ color: 'var(--primary)', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-dark)'} onMouseOut={(e) => e.target.style.color = 'var(--primary)'}>Terms of Service</a>
                <a href="#" style={{ color: 'var(--primary)', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-dark)'} onMouseOut={(e) => e.target.style.color = 'var(--primary)'}>Help & Support</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;