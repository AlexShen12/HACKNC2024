import { useLoaderData } from 'react-router-dom';
import { CourseStudents, Username } from '../../types/types';


export async function coursePageLoader({params} : {params: {course_num: string}}): Promise<CourseStudents> {
    const sampleData: CourseStudents = {
        courseNumber: "101",
        students: [
            {
                name: "Student 1",
                username: "student1"
            },
            {
                name: "Student 2",
                username: "student2"
            },
            {
                name: "Student 3",
                username: "student3"
            }
        ]
    };

    return sampleData;
}


export default function CoursePage(){

    const data: CourseStudents = useLoaderData() as CourseStudents;

    const className: string = data.courseNumber;

    const students: Username[] = data.students;

    return (
        <div>
            <h1>Students in {className}</h1>
            <ul>
                {
                    students.map((student: Username) => (
                        <li key={student.username}>
                            <a href={`../../profile/${student.username}`}>{student.name}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}