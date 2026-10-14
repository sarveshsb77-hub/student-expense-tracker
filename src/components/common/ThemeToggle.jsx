 import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Swal from 'sweetalert2';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      title: `Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`,
      background: theme === 'dark' ? '#132043' : '#ffffff',
      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
    });
  };

  return (
    <button className="theme-toggle" onClick={handleClick}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;