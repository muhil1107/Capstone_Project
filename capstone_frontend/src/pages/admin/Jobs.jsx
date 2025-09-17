import React from 'react';

const jobs = [
    {
        id: 1,
        title: 'Software Engineer',
        department: 'Engineering',
        location: 'Remote',
        status: 'Open',
    },
    {
        id: 2,
        title: 'Product Manager',
        department: 'Product',
        location: 'New York',
        status: 'Closed',
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'San Francisco',
        status: 'Open',
    },
];

const Jobs = () => {
    return (
        <div>
            <h2>Job Listings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>{job.department}</td>
                            <td>{job.location}</td>
                            <td>{job.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Jobs;