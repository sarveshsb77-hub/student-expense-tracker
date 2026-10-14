 import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

Chart.register(...registerables);

const CategoryChart = ({ transactions }) => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#e8edf5' : '#0f172a';

    const map = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    const labels = Object.keys(map);
    const data = Object.values(map);
    const colors = ['#4f8cff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels.length ? labels : ['No Data'],
        datasets: [{
          data: labels.length ? data : [1],
          backgroundColor: labels.length ? colors.slice(0, labels.length) : ['#e2e8f0'],
          borderColor: isDark ? '#132043' : '#ffffff',
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor,
              font: { size: 10 },
              boxWidth: 12,
              padding: 12,
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct = total > 0 ? Math.round((ctx.parsed / total) * 100) : 0;
                return ctx.label + ': ₹' + ctx.parsed.toLocaleString('en-IN') + ' (' + pct + '%)';
              },
            },
          },
        },
        cutout: '65%',
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

export default CategoryChart;