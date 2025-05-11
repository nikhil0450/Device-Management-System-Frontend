import { useState } from 'react';
import axios from 'axios';
import PingModal from './PingModal';
import { getToken } from '../utils/auth';

function DeviceTable({ devices, fetchDevices, page, pages, setPage }) {
  const [selectedPingOutput, setSelectedPingOutput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editForm, setEditForm] = useState({ hostname: '', serial: '' });

  const handleDelete = async id => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/devices/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    fetchDevices();
  };

  const handlePing = async id => {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/devices/${id}/ping`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    setSelectedPingOutput(res.data.ping_output || 'No output');
    setShowModal(true);
    fetchDevices();
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/devices/${editingDevice._id}`, editForm, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setEditingDevice(null);
      setEditForm({ hostname: '', serial: '' });
      fetchDevices();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

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
                <button className="btn btn-sm btn-warning me-2" onClick={() => {
                  setEditingDevice(device);
                  setEditForm({
                    hostname: device.hostname || '',
                    serial: device.serial || ''
                  });
                }}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(device._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-secondary" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn btn-secondary" onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page >= pages}>Next</button>
      </div>

      <PingModal show={showModal} onHide={() => setShowModal(false)} output={selectedPingOutput} />

      {editingDevice && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Device</h5>
                <button type="button" className="btn-close" onClick={() => setEditingDevice(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Hostname</label>
                  <input type="text" className="form-control" value={editForm.hostname} onChange={(e) => setEditForm({ ...editForm, hostname: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label>Serial</label>
                  <input type="text" className="form-control" value={editForm.serial} onChange={(e) => setEditForm({ ...editForm, serial: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingDevice(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeviceTable;
