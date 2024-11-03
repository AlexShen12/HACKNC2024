import { useLoaderData } from 'react-router-dom';
import { CourseData } from '../../types/types';
import SingleSearch from '../../components/singleSearch';


export async function courseLoader(): Promise<CourseData[]> {
    const sampleData: CourseData[] = [
        {
            courseNumber: "101",
            courseName: "test course 1"
        }, 
        {
            courseNumber: "102",
            courseName: "test course 2"
        },
        {
            courseNumber: "103",
            courseName: "test course 3"
        }
    ];

    return sampleData;
}


export default function Courses(){

    const courses: CourseData[] = useLoaderData() as CourseData[];

    console.log(courses);

    return(
        <div>
            <label>Search For Classes: </label>
            <SingleSearch courses={courses}/>
        </div>
    )


}