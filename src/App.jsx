import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeviceTable from './components/DeviceTable';
import DeviceForm from './components/DeviceForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Device Management</h2>
      <Dashboard />
      <DeviceForm />
      <DeviceTable />
    </div>
  );
}

export default App;
