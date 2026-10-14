 import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user, transactions } = useApp();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    studentId: user?.studentId || '',
    email: user?.email || '',
    phone: '',
    dob: '',
    course: '',
    semester: '',
    college: '',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);

  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const index = users.findIndex((u) => u.email === user?.email);
    if (index !== -1) {
      users[index].name = formData.fullName;
      users[index].studentId = formData.studentId;
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      title: '✅ Profile updated successfully!',
      background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { current, new: newPass, confirm } = passwordData;

    if (!current || !newPass || !confirm) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Please fill in all password fields',
        background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
      });
      return;
    }

    if (newPass !== confirm) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'New passwords do not match',
        background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
      });
      return;
    }

    if (newPass.length < 8) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Password must be at least 8 characters',
        background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const index = users.findIndex((u) => u.email === user?.email);
    if (index !== -1) {
      if (users[index].password !== current) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: 'Current password is incorrect',
          background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
          color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
        });
        return;
      }
      users[index].password = newPass;
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: '✅ Password changed successfully!',
        background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
      });
      setPasswordData({ current: '', new: '', confirm: '' });
    }
  };

  const handleAvatarUpload = (e) => {
    if (e) e.stopPropagation();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: '❌ Image size must be less than 10MB',
          background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
          color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setProfilePicture(imageData);
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const index = users.findIndex((u) => u.email === user?.email);
        if (index !== -1) {
          users[index].profilePicture = imageData;
          localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: '✅ Profile picture updated successfully!',
          background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
          color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
        });
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  };

  const handleDeletePicture = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Delete Profile Picture?',
      text: 'Are you sure you want to delete your profile picture?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
    }).then((result) => {
      if (result.isConfirmed) {
        setProfilePicture(null);
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const index = users.findIndex((u) => u.email === user?.email);
        if (index !== -1) {
          users[index].profilePicture = null;
          localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: '🗑️ Profile picture deleted successfully!',
          background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#132043' : '#ffffff',
          color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8edf5' : '#0f172a',
        });
      }
    });
  };

  const getInitials = () => {
    if (!user?.name) return 'ST';
    return user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .profile-pic-form-container { flex-direction: column !important; align-items: center !important; }
          .profile-pic-wrapper { width: 100% !important; margin-bottom: 16px !important; }
          .profile-pic-wrapper img, .profile-pic-wrapper div { width: 120px !important; height: 140px !important; }
          .profile-form-fields { width: 100% !important; }
          .profile-form-fields .grid-2 { grid-template-columns: 1fr !important; }
          .profile-header { flex-direction: column !important; text-align: center !important; }
          .profile-header .profile-avatar { margin-bottom: 12px !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-row { grid-template-columns: 1fr !important; }
          .profile-form-buttons { flex-direction: column !important; align-items: stretch !important; }
          .profile-form-buttons button { width: 100% !important; }
        }
      `}</style>

      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', fontWeight: '800' }}>👤 Student Profile</h1>
        </div>
      </section>

      {/* Profile Header */}
      <section>
        <div className="container">
          <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', flexWrap: 'wrap' }}>
            <div 
              className="profile-avatar" 
              onClick={handleAvatarUpload} 
              style={{ 
                cursor: 'pointer', 
                position: 'relative',
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                flexShrink: 0,
                overflow: 'hidden',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: '700',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(79,70,229,0.3)',
              }}
            >
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                getInitials()
              )}
              <div className="upload-overlay" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                fontSize: '10px',
                padding: '4px 0',
                textAlign: 'center',
                borderRadius: '0 0 50% 50%',
                opacity: 0,
                transition: 'opacity 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0'}>
                📷
              </div>
            </div>
            <div className="profile-info">
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-color)', margin: 0 }}>{user?.name || 'Student'}</h2>
              <p style={{ color: 'var(--text-secondary)', margin: '2px 0', fontSize: '13px' }}>📧 {user?.email || ''}</p>
              <p style={{ color: 'var(--text-secondary)', margin: '2px 0', fontSize: '13px' }}>🎓 Student ID: {user?.studentId || ''}</p>
              <div style={{ marginTop: '6px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 12px', borderRadius: '40px', fontSize: '11px' }}>Active</span>
                <span style={{ background: 'var(--success)', color: 'white', padding: '2px 12px', borderRadius: '40px', fontSize: '11px' }}>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information Card - Reduced padding */}
      <section>
        <div className="container">
          <div className="card" style={{ padding: '10px 14px' }}>
            <div className="card-header" style={{ paddingBottom: '6px', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-color)' }}>✏️ Personal Information</h3>
            </div>
            <form onSubmit={handleProfileUpdate}>
              <div className="profile-pic-form-container" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                
                {/* Left: Rectangular Profile Picture (size unchanged) */}
                <div className="profile-pic-wrapper" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '4px',
                  flexShrink: 0,
                  width: '135px',
                }}>
                  <div 
                    onClick={handleAvatarUpload}
                    style={{
                      width: '135px',
                      height: '175px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: 'var(--primary-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '42px',
                      fontWeight: '700',
                      color: '#ffffff',
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(79,70,229,0.15)',
                      position: 'relative',
                      border: '2px solid var(--border-color)',
                    }}
                  >
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      getInitials()
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      fontSize: '10px',
                      padding: '3px 0',
                      textAlign: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0'}>
                      📷 Change
                    </div>
                  </div>
                  {profilePicture && (
                    <button
                      type="button"
                      onClick={handleDeletePicture}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '500',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      🗑️ Delete
                    </button>
                  )}
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Click to upload
                  </span>
                </div>

                {/* Right: Form Fields (input sizes unchanged) */}
                <div className="profile-form-fields" style={{ flex: 1, minWidth: 0 }}>
                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          border: '2px solid var(--gray-200)',
                          borderRadius: '4px',
                          fontSize: '14px',
                          background: 'var(--gray-50)',
                          color: 'var(--gray-800)',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Student ID</label>
                      <input
                        type="text"
                        id="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          border: '2px solid var(--gray-200)',
                          borderRadius: '4px',
                          fontSize: '14px',
                          background: 'var(--gray-50)',
                          color: 'var(--gray-800)',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        border: '2px solid var(--gray-200)',
                        borderRadius: '4px',
                        fontSize: '14px',
                        background: 'var(--gray-100)',
                        color: 'var(--gray-500)',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'not-allowed',
                      }}
                    />
                  </div>

                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          border: '2px solid var(--gray-200)',
                          borderRadius: '4px',
                          fontSize: '14px',
                          background: 'var(--gray-50)',
                          color: 'var(--gray-800)',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          border: '2px solid var(--gray-200)',
                          borderRadius: '4px',
                          fontSize: '14px',
                          background: 'var(--gray-50)',
                          color: 'var(--gray-800)',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Course</label>
                      <input
                        type="text"
                        id="course"
                        value={formData.course}
                        onChange={handleChange}
                        placeholder="e.g., B.Tech"
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          border: '2px solid var(--gray-200)',
                          borderRadius: '4px',
                          fontSize: '14px',
                          background: 'var(--gray-50)',
                          color: 'var(--gray-800)',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Semester</label>
                      <select
                        id="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          border: '2px solid var(--gray-200)',
                          borderRadius: '4px',
                          fontSize: '14px',
                          background: 'var(--gray-50)',
                          color: 'var(--gray-800)',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <option value="">Select</option>
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                        <option value="5">5th</option>
                        <option value="6">6th</option>
                        <option value="7">7th</option>
                        <option value="8">8th</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>College</label>
                    <input
                      type="text"
                      id="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="Enter your college name"
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        border: '2px solid var(--gray-200)',
                        borderRadius: '4px',
                        fontSize: '14px',
                        background: 'var(--gray-50)',
                        color: 'var(--gray-800)',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>

                  <div className="profile-form-buttons" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        minWidth: '70px',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'var(--primary-gradient)',
                        color: '#ffffff',
                        boxShadow: '0 2px 10px rgba(79,70,229,0.3)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 15px rgba(79,70,229,0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 10px rgba(79,70,229,0.3)';
                      }}
                    >
                      💾 Update
                    </button>
                    <button
                      type="reset"
                      className="btn btn-outline"
                      style={{
                        minWidth: '70px',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        border: '2px solid var(--primary)',
                        background: 'transparent',
                        color: 'var(--primary)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'var(--primary)';
                        e.target.style.color = '#ffffff';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--primary)';
                      }}
                      onClick={() => {
                        setFormData({
                          fullName: user?.name || '',
                          studentId: user?.studentId || '',
                          email: user?.email || '',
                          phone: '',
                          dob: '',
                          course: '',
                          semester: '',
                          college: '',
                        });
                      }}
                    >
                      🔄 Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Account Statistics */}
      <section>
        <div className="container">
          <div className="card" style={{ padding: '12px 16px' }}>
            <div className="card-header" style={{ paddingBottom: '6px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-color)' }}>📊 Account Statistics</h3>
            </div>
            <div className="stats-row">
              <div className="stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>📅 Member Since</div>
                <div className="stat-value" style={{ fontSize: '15px', color: 'var(--text-color)' }}>January 2026</div>
              </div>
              <div className="stat-card" style={{ borderLeft: '4px solid var(--info)' }}>
                <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>📋 Total Transactions</div>
                <div className="stat-value" style={{ color: 'var(--text-color)' }}>{transactions.length}</div>
              </div>
              <div className="stat-card income">
                <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>💰 Total Income</div>
                <div className="stat-value positive" style={{ color: 'var(--success)' }}>₹{totalIncome.toLocaleString('en-IN')}</div>
              </div>
              <div className="stat-card expense">
                <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>💸 Total Expenses</div>
                <div className="stat-value negative" style={{ color: 'var(--danger)' }}>₹{totalExpense.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Change Password */}
      <section>
        <div className="container">
          <div className="card" style={{ padding: '12px 16px' }}>
            <div className="card-header" style={{ paddingBottom: '6px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-color)' }}>🔑 Change Password</h3>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div style={{ maxWidth: '380px', margin: '0 auto' }}>
                <div className="form-group" style={{ marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Current Password</label>
                  <input
                    type="password"
                    id="current"
                    value={passwordData.current}
                    onChange={handlePasswordChange}
                    required
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      border: '2px solid var(--gray-200)',
                      borderRadius: '4px',
                      fontSize: '14px',
                      background: 'var(--gray-50)',
                      color: 'var(--gray-800)',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>New Password</label>
                    <input
                      type="password"
                      id="new"
                      value={passwordData.new}
                      onChange={handlePasswordChange}
                      required
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        border: '2px solid var(--gray-200)',
                        borderRadius: '4px',
                        fontSize: '14px',
                        background: 'var(--gray-50)',
                        color: 'var(--gray-800)',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-700)', display: 'block', marginBottom: '2px' }}>Confirm</label>
                    <input
                      type="password"
                      id="confirm"
                      value={passwordData.confirm}
                      onChange={handlePasswordChange}
                      required
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        border: '2px solid var(--gray-200)',
                        borderRadius: '4px',
                        fontSize: '14px',
                        background: 'var(--gray-50)',
                        color: 'var(--gray-800)',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      minWidth: '140px',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 16px',
                      borderRadius: '6px',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'var(--primary-gradient)',
                      color: '#ffffff',
                      boxShadow: '0 2px 10px rgba(79,70,229,0.3)',
                      transition: 'all 0.3s ease',
                      justifyContent: 'center',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(79,70,229,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 10px rgba(79,70,229,0.3)';
                    }}
                  >
                    🔒 Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;