import { Link, useLoaderData } from 'react-router-dom';
import { CourseData, ProfileData } from '../../types/types';


// TODO: get profile data from api call
async function getProfileData(id: number): Promise<ProfileData> {
    const data: ProfileData = {
        name: "Alex",
        courses: [
            {
                courseNumber: "101",
                courseName: "test course 1"
            },
            {
                courseNumber: "102",
                courseName: "test course 2"
            }],
        email: "alex@unc.edu",
        isUser: true
    }
    return await data;
}

export async function profileLoader({ params }: { params: { id: number } }) {
    const profileData: ProfileData = await getProfileData(params.id);

    return profileData;
}

export default function Profile() {

    const data: ProfileData = useLoaderData() as ProfileData;

    const name: string = data.name;
    const courses: CourseData[] = data.courses;
    const email: string = data.email;

    return (
        <div>
            <div className='profilecard'>
                <p>Name: {name}</p>
                <label>Courses: </label>
                <ul className='courselist'>
                    {courses.map((course: CourseData) => (<li key={course.courseNumber}>{course.courseName}</li>))}
                </ul>
                <p>Contact Info:</p>
                <p>Email: {email}</p>

            </div>
            <p>Contact Info:</p>
            <p>Email: {email}</p>
            
            {data.isUser && (
                <div>
                    <Link to={"./edit"}>
                        <p>Edit Information</p>
                    </Link>
                </div>
            )}
        </div>
    );

}