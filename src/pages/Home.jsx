import React from 'react';
import DeviceTable from '../components/DeviceTable';
import DeviceForm from '../components/DeviceForm';
import Dashboard from '../components/Dashboard';
import { logout } from '../utils/auth';

function Home() {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Device Management</h2>
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
      </div>
      <Dashboard />
      <DeviceForm />
      <DeviceTable />
    </div>
  );
}

export default Home;