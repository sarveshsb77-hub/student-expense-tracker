 import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { user } = useApp();

  const features = [
    { icon: '👨‍🎓', title: 'Student Profile', description: 'Create your student profile, set preferences, and track your financial journey.' },
    { icon: '💰', title: 'Income & Expenses', description: 'Record all your income sources and daily expenses in one place.' },
    { icon: '🏷️', title: 'Smart Categories', description: 'Organize transactions with categories like Food, Travel, Education, and more.' },
    { icon: '📊', title: 'Visual Reports', description: 'View beautiful charts and graphs to understand your spending patterns.' },
    { icon: '🎯', title: 'Budget Management', description: 'Set monthly budgets and get real-time alerts when you\'re close to limits.' },
    { icon: '🔍', title: 'Advanced Filters', description: 'Filter transactions by date, category, or type to find exactly what you need.' },
  ];

  const stats = [
    { number: '10K+', label: 'Active Students' },
    { number: '50K+', label: 'Transactions Tracked' },
    { number: '₹5M+', label: 'Money Managed' },
    { number: '95%', label: 'Satisfaction Rate' },
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Take Control of Your <span className="text-gradient">Student Finances</span>
            </h1>
            <p>
              Track your daily expenses, set monthly budgets, and gain insights into your spending habits.
              Perfect for students who want to manage their money smarter.
            </p>
            <div className="hero-buttons">
              <Link to={user ? '/dashboard' : '/register'} className="btn btn-primary">
                🚀 {user ? 'Go to Dashboard' : 'Start Tracking Free'}
              </Link>
              <a href="#features" className="btn btn-outline">
                ▶ See Features
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card-3d">
              <div className="card-header">
                <h3>📊 Smart Money Management</h3>
                <span className="badge">Live Demo</span>
              </div>
              <div className="stat-row">
                <span className="label">Budget Used</span>
                <span className="value">4%</span>
              </div>
              <div className="progress-bar">
                <div className="fill" style={{ width: '4%' }}></div>
              </div>
              <div className="stat-row">
                <span className="label">💸 ₹400 spent</span>
                <span className="value">💰 ₹9,600 remaining</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <h2 className="section-title">
            Everything You Need to <span className="text-gradient">Track Expenses</span>
          </h2>
          <p className="section-subtitle">
            Complete financial management solution designed specifically for students
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section" id="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="number">{stat.number}</span>
                <span className="label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="section-subtitle">Get started in three simple steps</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">1️⃣</div>
              <h3>Create Account</h3>
              <p>Sign up with your email and set your monthly budget.</p>
            </div>
            <div className="feature-card">
              <div className="icon">2️⃣</div>
              <h3>Add Transactions</h3>
              <p>Record your income and expenses with categories.</p>
            </div>
            <div className="feature-card">
              <div className="icon">3️⃣</div>
              <h3>Track & Analyze</h3>
              <p>View dashboards, reports, and monitor your spending.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;