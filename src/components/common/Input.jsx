 import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder = '', required = false, className = '', ...props }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={className}
        {...props}
      />
    </div>
  );
};

export default Input;