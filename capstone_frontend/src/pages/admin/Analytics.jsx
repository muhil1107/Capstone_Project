import React, { useEffect, useState } from 'react';

const Analytics = () => {
    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        revenue: 0,
    });

    useEffect(() => {
        // Replace with actual API calls
        const fetchAnalytics = async () => {
            // Dummy data for demonstration
            setStats({
                users: 120,
                orders: 45,
                revenue: 3500,
            });
        };
        fetchAnalytics();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Admin Analytics Dashboard</h2>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', minWidth: '150px' }}>
                    <h3>Users</h3>
                    <p>{stats.users}</p>
                </div>
                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', minWidth: '150px' }}>
                    <h3>Orders</h3>
                    <p>{stats.orders}</p>
                </div>
                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', minWidth: '150px' }}>
                    <h3>Revenue</h3>
                    <p>${stats.revenue}</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;