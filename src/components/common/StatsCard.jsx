 import React from 'react';

const StatsCard = ({ label, value, sub, type = 'default', className = '' }) => {
  const typeMap = { income: 'income', expense: 'expense', balance: 'balance', budget: 'budget' };
  return (
    <div className={`stat-card ${typeMap[type] || ''} ${className}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
};

export default StatsCard;