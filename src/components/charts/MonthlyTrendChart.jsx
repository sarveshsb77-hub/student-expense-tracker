 import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

Chart.register(...registerables);

const MonthlyTrendChart = ({ transactions }) => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#e8edf5' : '#0f172a';
    const gridColor = isDark ? '#1a3a6a' : '#e2e8f0';

    const months = [];
    const values = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = date.toISOString().slice(0, 7);
      months.push(date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }));
      const total = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(key))
        .reduce((s, t) => s + t.amount, 0);
      values.push(total);
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Spending (₹)',
          data: values,
          backgroundColor: isDark ? 'rgba(79,140,255,0.6)' : 'rgba(79,140,255,0.7)',
          borderColor: '#4f8cff',
          borderWidth: 2,
          borderRadius: 6,
          maxBarThickness: 40,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11 } } },
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
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

export default MonthlyTrendChart;