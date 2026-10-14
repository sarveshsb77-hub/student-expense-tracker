 import React from 'react';

const Card = ({ children, className = '', title, headerAction }) => {
  return (
    <div className={`card ${className}`}>
      {(title || headerAction) && (
        <div className="card-header">
          {title && <h3>{title}</h3>}
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;