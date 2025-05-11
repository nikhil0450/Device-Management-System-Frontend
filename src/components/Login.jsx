import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100">Login</button>
        <div className="mt-2 text-center">
          <a href="/register">Don't have an account?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;