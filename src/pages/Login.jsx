 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Please fill in all fields',
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find((u) => u.email === email);

    if (!user) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Account not found. Please register first.',
      });
      return;
    }

    if (user.password !== password) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Incorrect password. Please try again.',
      });
      return;
    }

    setUser({
      name: user.name,
      email: user.email,
      studentId: user.studentId || 'STU001',
      budget: user.budget || 10000,
      profilePicture: user.profilePicture || null,
    });

    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      title: `Welcome back, ${user.name}! 🎉`,
    });

    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '440px', margin: '0 auto', padding: '40px' }}>
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👋</div>
            <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Welcome Back!</h2>
            <p style={{ color: '#6b7280' }}>Login to track your expenses</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '400', fontSize: '14px' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ fontSize: '14px' }}>Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              🔑 Login
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
            Don't have an account? <Link to="/register">Register now</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;