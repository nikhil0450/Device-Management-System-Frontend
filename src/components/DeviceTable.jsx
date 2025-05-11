import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PingModal from './PingModal';
import { getToken } from '../utils/auth';

function DeviceTable() {
  const [devices, setDevices] = useState([]);
  const [selectedPingOutput, setSelectedPingOutput] = useState('');
  const [showModal, setShowModal] = useState(false);

const fetchDevices = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/devices', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    console.log("Device fetch response:", res.data);
    setDevices(Array.isArray(res.data.devices) ? res.data.devices : []);
  } catch (error) {
    console.error("Failed to fetch devices:", error);
    setDevices([]); // fallback to empty array on error
  }
};


  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/devices/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    fetchDevices();
  };

  const handlePing = async id => {
    const res = await axios.post(`http://localhost:5000/api/devices/${id}/ping`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    setSelectedPingOutput(res.data.ping_output || 'No output');
    setShowModal(true);
    fetchDevices();
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <>
      <h4>Device List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Hostname</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device._id}>
              <td>{device.ip_address}</td>
              <td>{device.hostname || '-'}</td>
              <td>{device.serial || '-'}</td>
              <td>{device.ping_status}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handlePing(device._id)}>Ping</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(device._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PingModal show={showModal} onHide={() => setShowModal(false)} output={selectedPingOutput} />
    </>
  );
}

export default DeviceTable;