 import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

Chart.register(...registerables);

const IncomeExpenseChart = ({ transactions }) => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#e8edf5' : '#0f172a';
    const gridColor = isDark ? '#1a3a6a' : '#e2e8f0';

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          label: 'Amount (₹)',
          data: [totalIncome, totalExpense],
          backgroundColor: ['#10b981', '#ef4444'],
          borderColor: ['#059669', '#dc2626'],
          borderWidth: 2,
          borderRadius: 6,
          maxBarThickness: 60,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor, font: { size: 12, weight: '600' } } },
          y: { grid: { color: gridColor }, ticks: { color: textColor }, beginAtZero: true },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions, theme]);

  return <canvas ref={chartRef} style={{ height: '250px', width: '100%' }} />;
};

export default IncomeExpenseChart;