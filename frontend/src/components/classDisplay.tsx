import { useState } from 'react'
import { CourseData } from '../types/types';


export default function ClassDisplay({course, add, remove, initial} : {
    course: CourseData, 
    add: (course: CourseData) => void, 
    remove: (course: CourseData) => void, 
    initial: boolean
}) {

    const [checked, setChecked] = useState(initial);
    let override = initial;

    function handleCheck(){
        setChecked((check) => !check);
        override = !override;
        if(override){
            add(course);
        } else {
            remove(course);
        }
    }

    return(
        <div>
            <button type='button' onClick={handleCheck}>
                {checked ? <p>✓ {course.courseNumber}</p> : <p>+ {course.courseNumber}</p>}
            </button>
        </div>
    )
}