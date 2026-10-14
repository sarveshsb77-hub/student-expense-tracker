 import React from 'react';

const Select = ({ label, id, value, onChange, options = [], placeholder = 'Select an option', required = false, className = '', ...props }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} value={value} onChange={onChange} required={required} className={className} {...props}>
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;