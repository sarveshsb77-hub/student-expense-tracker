 import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Swal from 'sweetalert2';

const AddTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { transactions, addTransaction, updateTransaction, categories, addCategory } = useApp();

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const isEditing = id !== undefined;

  useEffect(() => {
    if (isEditing) {
      const tx = transactions.find(t => t.id === parseInt(id));
      if (tx) {
        setFormData({
          description: tx.description,
          amount: tx.amount,
          type: tx.type,
          category: tx.category,
          date: tx.date,
          notes: tx.notes || '',
        });
      }
    }
  }, [id, transactions, isEditing]);

  const categoryOptions = categories.length > 0 ? categories : ['Food', 'Travel', 'Education', 'Shopping', 'Rent', 'Entertainment', 'Healthcare', 'Other'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAddCategory = () => {
    Swal.fire({
      title: 'Add New Category',
      input: 'text',
      inputPlaceholder: 'Enter category name...',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value || !value.trim()) return 'Please enter a category name';
        if (categories.includes(value.trim())) return 'Category already exists';
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newCat = result.value.trim();
        addCategory(newCat);
        setFormData(prev => ({ ...prev, category: newCat }));
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: `✅ Category "${newCat}" added!`,
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount, type, category, date, notes } = formData;

    if (!description || !amount || parseFloat(amount) <= 0) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Please fill in description and valid amount',
      });
      return;
    }

    const txData = { description, amount: parseFloat(amount), type, category, date, notes };

    if (isEditing) {
      updateTransaction(parseInt(id), txData);
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: '✅ Transaction updated successfully!' });
    } else {
      addTransaction(txData);
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: `✅ ${type === 'income' ? 'Income' : 'Expense'} added successfully!` });
    }

    setTimeout(() => navigate('/transactions'), 500);
  };

  return (
    <>
      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800' }}>{isEditing ? '✏️ Edit Transaction' : '➕ Add Transaction'}</h1>
            <Link to="/transactions" className="btn btn-outline">← Back to Transactions</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card" style={{ maxWidth: '640px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <input type="text" id="description" value={formData.description} onChange={handleChange} placeholder="e.g., Lunch at campus" required />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (₹) *</label>
                <input type="number" id="amount" value={formData.amount} onChange={handleChange} placeholder="Enter amount" min="0.01" step="0.01" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Transaction Type *</label>
                  <select id="type" value={formData.type} onChange={handleChange} required>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select id="category" value={formData.category} onChange={handleChange} required style={{ flex: 1 }}>
                      {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleAddCategory} style={{ padding: '2px 12px', fontSize: '11px', minHeight: '28px', whiteSpace: 'nowrap' }}>+ Add</button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value={formData.date} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes (Optional)</label>
                <textarea id="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Add any additional notes..."></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button type="submit" className="btn btn-primary" style={{ minWidth: '140px' }}>{isEditing ? '💾 Update Transaction' : '💾 Save Transaction'}</button>
                <button type="reset" className="btn btn-outline" style={{ minWidth: '120px' }}>🔄 Clear Form</button>
                <Link to="/transactions" className="btn btn-outline" style={{ minWidth: '120px' }}>❌ Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTransaction;