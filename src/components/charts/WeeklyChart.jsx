 import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

Chart.register(...registerables);

const WeeklyChart = ({ transactions }) => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#e8edf5' : '#0f172a';
    const gridColor = isDark ? '#1a3a6a' : '#e2e8f0';

    const days = [];
    const values = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days.push(date.toLocaleDateString('en-IN', { weekday: 'short' }));
      const dayTotal = transactions
        .filter(t => t.date === dateStr && t.type === 'expense')
        .reduce((s, t) => s + t.amount, 0);
      values.push(dayTotal);
    }

    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Daily Spending (₹)',
          data: values,
          borderColor: '#4f8cff',
          backgroundColor: isDark ? 'rgba(79,140,255,0.15)' : 'rgba(79,140,255,0.1)',
          fill: true,
          tension: 0.4,
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

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [transactions, theme]);

  return <canvas ref={chartRef} style={{ height: '250px', width: '100%' }} />;
};

export default WeeklyChart;