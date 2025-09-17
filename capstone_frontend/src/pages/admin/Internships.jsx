import React, { useEffect, useState } from "react";

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your API endpoint
        fetch("/api/internships")
            .then((res) => res.json())
            .then((data) => {
                setInternships(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div>
            <h2>Internship Details</h2>
            {loading ? (
                <p>Loading internships...</p>
            ) : internships.length === 0 ? (
                <p>No internships found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Duration</th>
                            <th>Applicants</th>
                        </tr>
                    </thead>
                    <tbody>
                        {internships.map((internship) => (
                            <tr key={internship.id}>
                                <td>{internship.title}</td>
                                <td>{internship.company}</td>
                                <td>{internship.location}</td>
                                <td>{internship.duration}</td>
                                <td>{internship.applicantsCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Internships;