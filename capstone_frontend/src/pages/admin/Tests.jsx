import React, { useEffect, useState } from "react";

const Tests = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your API endpoint
        fetch("/api/tests")
            .then((res) => res.json())
            .then((data) => {
                setTests(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Test Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Test ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Total Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test) => (
                        <tr key={test.id}>
                            <td>{test.id}</td>
                            <td>{test.title}</td>
                            <td>{test.date}</td>
                            <td>{test.totalMarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tests;