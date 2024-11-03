
import { Link, useLoaderData } from 'react-router-dom';

type Courses = {
    courses: string[]
}

// TODO: get profile data from api call
async function getCourses(id: number): Promise<Courses>{
    const data: Courses = {
        courses: ["test course 1", "test course 2"]
    }
    return await data;
}

async function profileLoader({ params } : { params: { id: number }}){
    const Coursedata: Courses = await getCourses(params.id);

    return Coursedata;
}

export default function Courses(){

    const data: Courses = useLoaderData() as Courses;

    const courses: string[] = data.courses;

    return(
        <div>
            <div>
                <label>Courses: </label>
                <ul>
                {courses.map((course: string) => (<li key={course}>{course}</li>))}
                </ul>
                
            </div>
        </div>
    );

}
