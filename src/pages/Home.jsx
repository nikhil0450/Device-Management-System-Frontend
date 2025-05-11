import { useEffect, useState } from 'react';
import axios from 'axios';
import DeviceTable from '../components/DeviceTable';
import DeviceForm from '../components/DeviceForm';
import Dashboard from '../components/Dashboard';
import { logout } from '../utils/auth';
import { getToken } from '../utils/auth';

function Home() {
  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 3;

  const fetchDevices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/devices?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setDevices(Array.isArray(res.data.devices) ? res.data.devices : []);
      setPages(res.data.pages || 1);
    } catch (error) {
      console.error('Failed to fetch devices:', error);
      setDevices([]);
      setPages(1);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [page]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Device Management</h2>
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
      </div>
      <Dashboard />
      <DeviceForm onDeviceAdded={fetchDevices} />
      <DeviceTable
        devices={devices}
        fetchDevices={fetchDevices}
        page={page}
        pages={pages}
        setPage={setPage}
      />
    </div>
  );
}

export default Home;
