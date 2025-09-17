import React from 'react';

const courses = [
    {
        id: 1,
        title: 'Introduction to React',
        instructor: 'Jane Doe',
        duration: '6 weeks',
        status: 'Active',
    },
    {
        id: 2,
        title: 'Advanced JavaScript',
        instructor: 'John Smith',
        duration: '8 weeks',
        status: 'Inactive',
    },
];

const Courses = () => {
    return (
        <div>
            <h2>Courses</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Instructor</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>{course.instructor}</td>
                            <td>{course.duration}</td>
                            <td>{course.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;