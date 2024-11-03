import { useLoaderData } from 'react-router-dom';
import Search from '../../components/search';
import { ProfileCourseData } from '../../types/types';

import './profile.css';

export async function editProfileLoader({params} : {params: {id: number}}): Promise<ProfileCourseData> {

    // TODO: Fetch all courses
    const testData: ProfileCourseData = {
        allCourses: [
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
        ],
        profileData: {
            name: "test",
            courses: [
                {
                    courseNumber: "101",
                    courseName: "test course 1"
                },
                {
                    courseNumber: "102",
                    courseName: "test course 2"
                }],
            email: "test@unc.edu"
        }
    }
    return testData;
}

export default function EditProfile() {

    const data: ProfileCourseData = useLoaderData() as ProfileCourseData;

    return (
        <div>
            <h1>Edit Profile</h1>
            <form>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input
                        id='name'
                        name='name'
                    />
                </div>
                <div>
                    <Search courses={data.allCourses} initialCourses={data.profileData.courses}/>
                </div>
                <button type='submit'> Login </button>
            </form>
        </div>
    );
}