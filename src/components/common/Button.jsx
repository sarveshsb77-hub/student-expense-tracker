 import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, type = 'button', ...props }) => {
  const base = 'btn';
  const variantMap = { primary: 'btn-primary', outline: 'btn-outline', success: 'btn-success', danger: 'btn-danger' };
  const sizeMap = { sm: 'btn-sm', md: '', lg: 'btn-lg' };
  const classes = [base, variantMap[variant] || '', sizeMap[size] || '', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;