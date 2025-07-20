import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    birthDate: '',
    gender: '',
    shehrityId: '',
    password: '',
    role: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateFields = (fields) => {
    for (const key of fields) {
      if (!form[key] || form[key].trim() === '') {
        setError('All fields are required.');
        return false;
      }
    }
    return true;
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.email) {
      setError('Email is required.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/request-otp`, { email: form.email });
      setSuccess(res.data.message || 'OTP sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validate all required fields
    if (!validateFields(['fullname', 'email', 'birthDate', 'gender', 'shehrityId', 'password', 'role', 'otp'])) {
      return;
    }
    if (form.gender !== 'male' && form.gender !== 'female') {
      setError('Gender must be either Male or Female.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        fullname: form.fullname,
        email: form.email,
        birthDate: form.birthDate,
        gender: form.gender,
        shehrityId: form.shehrityId,
        password: form.password,
        role: form.role,
        otp: form.otp
      };
      await axios.post(`${API_BASE}/user/register`, payload);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 480, width: '100%' }}>
        <h2 className="text-center mb-3" style={{ color: '#0C3C78', fontWeight: 800 }}>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={step === 1 ? handleRequestOTP : handleRegister} className="d-flex flex-column gap-3">
          <input type="text" className="form-control" name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required disabled={step === 2} />
          <input type="email" className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} required disabled={step === 2} />
          <input type="date" className="form-control" name="birthDate" placeholder="Date of Birth" value={form.birthDate} onChange={handleChange} required disabled={step === 2} />
          <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required disabled={step === 2}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="text" className="form-control" name="shehrityId" placeholder="Shehrity Security ID" value={form.shehrityId} onChange={handleChange} required disabled={step === 2} />
          <input type="password" className="form-control" name="password" placeholder="Password" value={form.password} onChange={handleChange} required disabled={step === 2} />
          <select className="form-select" name="role" value={form.role} onChange={handleChange} required disabled={step === 2}>
            <option value="">Role Applying For</option>
            <option value="unarmed">Unarmed Security Guard</option>
            <option value="armed">Armed Security Guard</option>
          </select>
          {step === 2 && (
            <input type="text" className="form-control" name="otp" placeholder="Enter OTP" value={form.otp} onChange={handleChange} required />
          )}
          <button type="submit" className="btn btn-primary w-100" style={{ background: '#0C3C78', borderColor: '#0C3C78', color: '#fff' }} disabled={loading}>
            {loading ? 'Please wait...' : step === 1 ? 'Send OTP' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-3">
          Already have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default Register; 