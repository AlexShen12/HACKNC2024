import { CourseData } from '../types/types';


export default function ClassLink({course} : {course: CourseData}) {
    
    return (
        <div>
            <a href={"/courses/" + course.courseNumber}>{course.courseNumber} - {course.courseName}</a>
        </div>
    );
} 