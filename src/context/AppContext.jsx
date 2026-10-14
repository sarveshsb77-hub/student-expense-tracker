 import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [budgetHistory, setBudgetHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
      
      const savedCategories = localStorage.getItem('categories');
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
      
      const savedBudgets = localStorage.getItem('categoryBudgets');
      if (savedBudgets) {
        setCategoryBudgets(JSON.parse(savedBudgets));
      }
      
      const savedHistory = localStorage.getItem('budgetHistory');
      if (savedHistory) {
        setBudgetHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
    setLoading(false);
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (!loading) {
      try {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('categoryBudgets', JSON.stringify(categoryBudgets));
        localStorage.setItem('budgetHistory', JSON.stringify(budgetHistory));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }, [user, transactions, categories, categoryBudgets, budgetHistory, loading]);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Date.now() + Math.random() };
    setTransactions(prev => [...prev, newTx]);
    return newTx;
  };

  const updateTransaction = (id, data) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, ...data } : tx));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const addCategory = (cat) => {
    if (!categories.includes(cat)) {
      setCategories(prev => [...prev, cat]);
      return true;
    }
    return false;
  };

  const removeCategory = (cat) => {
    setCategories(prev => prev.filter(c => c !== cat));
  };

  const addBudgetHistory = (entry) => {
    setBudgetHistory(prev => {
      const idx = prev.findIndex(b => b.month === entry.month);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...entry, id: prev[idx].id };
        return updated;
      }
      return [...prev, { ...entry, id: Date.now() + Math.random() }];
    });
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser: loginUser,
      logoutUser,
      transactions,
      setTransactions,
      categories,
      setCategories,
      categoryBudgets,
      setCategoryBudgets,
      budgetHistory,
      setBudgetHistory,
      loading,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addCategory,
      removeCategory,
      addBudgetHistory,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};