 import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import Swal from 'sweetalert2';   // ← Import SweetAlert2

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  // Scroll to section
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection('home');
  };

  // Intersection Observer to detect which section is in view
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'features', 'stats'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || 'home';
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' }
    );

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.id = 'home';
      observer.observe(hero);
    }
    const features = document.getElementById('features');
    if (features) observer.observe(features);
    const stats = document.getElementById('stats');
    if (stats) observer.observe(stats);

    return () => observer.disconnect();
  }, [location.pathname]);

  // Logout with SweetAlert2
  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      background: theme === 'dark' ? '#132043' : '#ffffff',
      color: theme === 'dark' ? '#e8edf5' : '#0f172a',
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        localStorage.removeItem('currentUser');
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: '👋 Logged out successfully!',
          background: theme === 'dark' ? '#132043' : '#ffffff',
          color: theme === 'dark' ? '#e8edf5' : '#0f172a',
        });
        setTimeout(() => navigate('/login'), 500);
      }
    });
  };

  const isLoggedIn = user !== null;

  // Home page links (only shown when on home page and not logged in)
  const homeLinks = [
    { label: 'Home', action: scrollToTop, id: 'home' },
    { label: 'Features', action: (e) => scrollToSection(e, 'features'), id: 'features' },
    { label: 'Statistics', action: (e) => scrollToSection(e, 'stats'), id: 'stats' },
    { label: 'Login', action: () => navigate('/login'), id: 'login' },
    { 
      label: 'Get Started', 
      action: () => navigate('/register'), 
      id: 'register',
      isButton: true 
    },
  ];

  // Logged-in page links in the specified order: Dashboard, Transactions, Reports, Budget, Profile, Settings
  const loggedInLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/transactions', label: 'Transactions' },
    { to: '/reports', label: 'Reports' },
    { to: '/budget', label: 'Budget' },
    { to: '/profile', label: 'Profile' },
    { to: '/settings', label: 'Settings' },
  ];

  // Determine which links to show
  let navItems;
  if (isLoggedIn) {
    navItems = loggedInLinks.map(link => ({
      ...link,
      isActive: location.pathname === link.to,
      action: () => navigate(link.to),
    }));
  } else if (location.pathname === '/') {
    navItems = homeLinks.map(link => ({
      ...link,
      isActive: link.id === activeSection,
    }));
  } else {
    navItems = [
      { label: 'Home', action: () => navigate('/'), isActive: location.pathname === '/' },
      { label: 'Login', action: () => navigate('/login'), isActive: location.pathname === '/login' },
      { label: 'Register', action: () => navigate('/register'), isActive: location.pathname === '/register' },
    ];
  }

  return (
    <header>
      <div className="container">
        <div className="logo">
          <span className="logo-icon">💰</span>
          <span>ExpenseTracker</span>
        </div>
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                {item.to ? (
                  <Link to={item.to} className={item.isActive ? 'active' : ''}>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => { item.action(e); }}
                    className={
                      (item.isActive ? 'active ' : '') +
                      (item.isButton ? 'btn btn-primary btn-sm' : '')
                    }
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            {isLoggedIn && (
              <li>
                <a href="#" onClick={handleLogout} style={{ color: '#dc2626' }}>
                  Logout
                </a>
              </li>
            )}
            <li>
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;