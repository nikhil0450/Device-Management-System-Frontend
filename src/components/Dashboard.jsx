import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, success: 0, failed: 0 });

  const fetchStats = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard-stats`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4">
      <h4>Dashboard</h4>
      <div className="row">
        <div className="col"><div className="alert alert-primary">Total Devices: {stats.total}</div></div>
        <div className="col"><div className="alert alert-success">Success Pings: {stats.success}</div></div>
        <div className="col"><div className="alert alert-danger">Failed Pings: {stats.failed}</div></div>
      </div>
    </div>
  );
}

export default Dashboard;