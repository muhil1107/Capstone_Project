import React from 'react';

const Reports = () => {
    // Example report data
    const reports = [
        { id: 1, title: 'Sales Report', date: '2024-06-01', status: 'Completed' },
        { id: 2, title: 'Inventory Report', date: '2024-06-02', status: 'Pending' },
        { id: 3, title: 'User Activity', date: '2024-06-03', status: 'Completed' },
    ];

    return (
        <div>
            <h2>Reports</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>{report.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;