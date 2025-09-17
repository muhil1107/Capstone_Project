import React, { useEffect, useState } from "react";

const Employers = () => {
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your API endpoint
        fetch("/api/employers")
            .then((res) => res.json())
            .then((data) => {
                setEmployers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading employers...</div>;

    return (
        <div>
            <h2>Employers List</h2>
            {employers.length === 0 ? (
                <div>No employers found.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employers.map((employer) => (
                            <tr key={employer.id}>
                                <td>{employer.name}</td>
                                <td>{employer.email}</td>
                                <td>{employer.company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Employers;