 export const loadData = () => {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const categoryBudgets = JSON.parse(localStorage.getItem('categoryBudgets') || '{}');
    const budgetHistory = JSON.parse(localStorage.getItem('budgetHistory') || '[]');
    return { user, transactions, categories, categoryBudgets, budgetHistory };
  } catch {
    return { user: null, transactions: [], categories: [], categoryBudgets: {}, budgetHistory: [] };
  }
};

export const saveData = (data) => {
  try {
    if (data.user !== undefined) localStorage.setItem('currentUser', JSON.stringify(data.user));
    if (data.transactions !== undefined) localStorage.setItem('transactions', JSON.stringify(data.transactions));
    if (data.categories !== undefined) localStorage.setItem('categories', JSON.stringify(data.categories));
    if (data.categoryBudgets !== undefined) localStorage.setItem('categoryBudgets', JSON.stringify(data.categoryBudgets));
    if (data.budgetHistory !== undefined) localStorage.setItem('budgetHistory', JSON.stringify(data.budgetHistory));
  } catch (e) { console.error('Save error', e); }
};

export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);