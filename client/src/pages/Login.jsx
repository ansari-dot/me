import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotStep, setForgotStep] = useState(0); // 0: login, 1: email, 2: otp, 3: new password
  const [forgot, setForgot] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
  const [forgotMsg, setForgotMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/user/login`, form, { withCredentials: true });
      if (res.data && res.data.success && res.data.user) {
        localStorage.setItem('token', res.data.token || 'dummy');
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Forgot password flow
  const handleForgotChange = (e) => {
    setForgot({ ...forgot, [e.target.name]: e.target.value });
  };

  const handleForgotEmail = async (e) => {
    e.preventDefault();
    setForgotMsg('');
    setError('');
    if (!forgot.email) {
      setError('Email is required.');
      return;
    }
    setLoading(true);
    try {
      // Assume endpoint: /api/user/request-otp (reuse OTP logic)
      await axios.post(`${API_BASE}/request-otp`, { email: forgot.email });
      setForgotStep(2);
      setForgotMsg('OTP sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotOTP = (e) => {
    e.preventDefault();
    setForgotMsg('');
    setError('');
    if (!forgot.otp) {
      setError('OTP is required.');
      return;
    }
    setForgotStep(3);
  };

  const handleForgotReset = async (e) => {
    e.preventDefault();
    setForgotMsg('');
    setError('');
    if (!forgot.newPassword || !forgot.confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }
    if (forgot.newPassword !== forgot.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // Assume endpoint: /api/user/reset-password
      await axios.post(`${API_BASE}/user/reset-password`, {
        email: forgot.email,
        otp: forgot.otp,
        newPassword: forgot.newPassword
      });
      setForgotMsg('Password reset successful! You can now log in.');
      setForgotStep(0);
      setForgot({ email: '', otp: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="text-center mb-3" style={{ color: '#0C3C78', fontWeight: 800 }}>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {forgotMsg && <div className="alert alert-success">{forgotMsg}</div>}
        {forgotStep === 0 && (
          <>
            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
              <input type="email" className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input type="password" className="form-control" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
              <button type="submit" className="btn btn-primary w-100" style={{ background: '#0C3C78', borderColor: '#0C3C78', color: '#fff' }} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-primary" style={{ cursor: 'pointer', fontSize: 15 }} onClick={() => setForgotStep(1)}>Forgot Password?</span>
            </div>
            <div className="text-center mt-3">
              Don't have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</span>
            </div>
          </>
        )}
        {forgotStep === 1 && (
          <form onSubmit={handleForgotEmail} className="d-flex flex-column gap-3">
            <input type="email" className="form-control" name="email" placeholder="Enter your email" value={forgot.email} onChange={handleForgotChange} required />
            <button type="submit" className="btn btn-primary w-100" style={{ background: '#0C3C78', borderColor: '#0C3C78', color: '#fff' }} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            <div className="text-center mt-2">
              <span className="text-secondary" style={{ cursor: 'pointer', fontSize: 15 }} onClick={() => setForgotStep(0)}>Back to Login</span>
            </div>
          </form>
        )}
        {forgotStep === 2 && (
          <form onSubmit={handleForgotOTP} className="d-flex flex-column gap-3">
            <input type="text" className="form-control" name="otp" placeholder="Enter OTP" value={forgot.otp} onChange={handleForgotChange} required />
            <button type="submit" className="btn btn-primary w-100" style={{ background: '#0C3C78', borderColor: '#0C3C78', color: '#fff' }} disabled={loading}>
              Next
            </button>
            <div className="text-center mt-2">
              <span className="text-secondary" style={{ cursor: 'pointer', fontSize: 15 }} onClick={() => setForgotStep(1)}>Back</span>
            </div>
          </form>
        )}
        {forgotStep === 3 && (
          <form onSubmit={handleForgotReset} className="d-flex flex-column gap-3">
            <input type="password" className="form-control" name="newPassword" placeholder="New Password" value={forgot.newPassword} onChange={handleForgotChange} required />
            <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm New Password" value={forgot.confirmPassword} onChange={handleForgotChange} required />
            <button type="submit" className="btn btn-primary w-100" style={{ background: '#0C3C78', borderColor: '#0C3C78', color: '#fff' }} disabled={loading}>
              Reset Password
            </button>
            <div className="text-center mt-2">
              <span className="text-secondary" style={{ cursor: 'pointer', fontSize: 15 }} onClick={() => setForgotStep(2)}>Back</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login; 