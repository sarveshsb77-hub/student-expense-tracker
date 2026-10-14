 import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="brand">
          <h3>💰 ExpenseTracker</h3>
          <p>Helping students manage their finances smartly.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/budget">Budget</Link></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">GitHub</a></li>
          </ul>
        </div>
        <div className="bottom">
          <p>&copy; 2026 Student Expense Tracker. All rights reserved. Made with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;