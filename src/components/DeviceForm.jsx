import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

function DeviceForm() {
  const [form, setForm] = useState({ ip_address: '', hostname: '', serial: '' });
  const [fetchIp, setFetchIp] = useState('');
  const [fetchMsg, setFetchMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async e => {
  e.preventDefault();
  if (!form.ip_address.trim()) {
    alert('IP address is required');
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/devices', form, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    alert('Device added!');
    setForm({ ip_address: '', hostname: '', serial: '' });
  } catch (err) {
    console.error('Add device failed:', err.response?.data || err.message);
    alert('Failed to add device: ' + (err.response?.data?.error || 'Unknown error'));
  }
};


  const handleFetch = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/devices/fetch', { ip_address: fetchIp }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setFetchMsg(`Fetched and saved data for ${res.data.ip_address}`);
    } catch {
      setFetchMsg('Failed to fetch data');
    }
  };

  return (
    <>
      <h4>Add Device</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row mb-2">
          <div className="col">
            <input className="form-control" name="ip_address" placeholder="IP Address" value={form.ip_address} onChange={handleChange} required />
          </div>
          <div className="col">
            <input className="form-control" name="hostname" placeholder="Hostname" value={form.hostname} onChange={handleChange} />
          </div>
          <div className="col">
            <input className="form-control" name="serial" placeholder="Serial" value={form.serial} onChange={handleChange} />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>

      <h4>Fetch Device Data</h4>
      <div className="row mb-4">
        <div className="col">
          <input className="form-control" placeholder="IP to fetch" value={fetchIp} onChange={e => setFetchIp(e.target.value)} />
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={handleFetch}>Fetch</button>
        </div>
      </div>
      {fetchMsg && <div className="alert alert-info">{fetchMsg}</div>}
    </>
  );
}

export default DeviceForm;