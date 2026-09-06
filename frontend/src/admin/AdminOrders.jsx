import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadInputs, setDownloadInputs] = useState({});

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const updateStatus = async (id, status) => {
    if (status === 'Delivered' && !downloadInputs[id]?.trim()) {
      alert('Please enter a download URL before marking as Delivered.');
      return;
    }
    try {
      const body = { status };
      if (status === 'Delivered' && downloadInputs[id]?.trim()) {
        body.downloadUrl = downloadInputs[id].trim();
      }
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(orders.map(order => order._id === id ? data.order : order));
        if (status === 'Delivered') {
          setDownloadInputs((prev) => ({ ...prev, [id]: '' }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#10b981', margin: 0 }}>Manage Orders</h2>
        <button onClick={fetchOrders} className="btn" style={{ background: '#3f3f46' }}>Refresh</button>
      </div>
      {loading ? (
        <p style={{ color: '#a1a1aa', textAlign: 'center' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: '#a1a1aa', textAlign: 'center' }}>No orders found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={rowStyle}>
                <th style={thStyle}>ORDER ID</th>
                <th style={thStyle}>USER</th>
                <th style={thStyle}>TOTAL</th>
                <th style={thStyle}>DATE</th>
                <th style={thStyle}>STATUS</th>
                <th style={thStyle}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={rowStyle}>
                  <td style={tdStyle}>{order._id.substring(0, 8)}...</td>
                  <td style={tdStyle}>{order.user?.name || 'Deleted User'}</td>
                  <td style={tdStyle}>₹{(order.totalAmount ?? 0).toFixed(2)}</td>
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: order.status === 'Delivered' ? 'rgba(16,185,129,0.15)' : 'rgba(249,115,22,0.15)',
                      color: order.status === 'Delivered' ? '#10b981' : '#f97316',
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        style={{ background: '#09090b', color: '#fff', padding: '6px', border: '1px solid #27272a', borderRadius: '4px', outline: 'none' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      {order.status !== 'Delivered' && (
                        <input
                          type="text"
                          placeholder="Download URL (for Delivered)"
                          value={downloadInputs[order._id] || ''}
                          onChange={(e) => setDownloadInputs({ ...downloadInputs, [order._id]: e.target.value })}
                          style={{ background: '#09090b', color: '#fff', padding: '6px', border: '1px solid #27272a', borderRadius: '4px', outline: 'none', fontSize: '12px', width: '200px' }}
                        />
                      )}
                      {order.status === 'Delivered' && order.downloadUrl && (
                        <a href={order.downloadUrl} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: '#10b981', wordBreak: 'break-all' }}>
                          {order.downloadUrl.substring(0, 40)}...
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '30px', background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', color: '#fafafa' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const rowStyle = { borderBottom: '1px solid rgba(255,255,255,0.1)' };
const thStyle = { padding: '15px', textAlign: 'left', color: '#a1a1aa', fontSize: '0.9rem' };
const tdStyle = { padding: '15px', textAlign: 'left' };

export default AdminOrders;
