 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
    monthlyBudget: 10000,
  });

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'number' ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, studentId, email, password, confirmPassword, monthlyBudget } = formData;

    if (!fullName || !studentId || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Passwords do not match',
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Password must be at least 8 characters',
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (users.some((u) => u.email === email)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Email already registered. Please login.',
      });
      return;
    }

    const newUser = {
      name: fullName,
      studentId,
      email,
      password,
      budget: monthlyBudget,
      profilePicture: null,
      registeredAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Set user and navigate to dashboard
    setUser({
      name: newUser.name,
      email: newUser.email,
      studentId: newUser.studentId,
      budget: newUser.budget,
      profilePicture: null,
    });

    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      title: `Welcome ${fullName}! 🎊`,
    });

    // Navigate to dashboard after a short delay
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Create Account</h2>
            <p style={{ color: '#6b7280' }}>Start tracking your expenses today</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="STU001"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 8 characters"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="monthlyBudget">Monthly Budget (₹)</label>
              <input
                type="number"
                id="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={handleChange}
                placeholder="10000"
                required
              />
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '8px' }}>
              <input type="checkbox" required style={{ width: 'auto', marginTop: '4px' }} />
              <label style={{ fontWeight: '400', fontSize: '14px' }}>
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              ✨ Create Account
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;