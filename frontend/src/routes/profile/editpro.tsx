import './profile.css';
import React from 'react';



export default function EditProfile() {
    const courses: string[] = ['Course 1', 'Course 2', 'Course 3', 'Course 4'];

    return (
        <div className="profilecard">
            <h2>Your Name</h2>

            <h3>Courses</h3>
            <ul className="courselist">
                {courses.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ul>
            <h3 className = "addtolist"> + Add?</h3>
        </div>
    );
}