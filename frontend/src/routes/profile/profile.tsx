import { Link, useLoaderData } from 'react-router-dom';

type ProfileData = {
    name: string,
    courses: string[],
    email: string
}

// TODO: get profile data from api call
async function getProfileData(id: number): Promise<ProfileData>{
    const data: ProfileData = {
        name: "test",
        courses: ["test course 1", "test course 2"],
        email: "test@unc.edu"
    }
    return await data;
}

export async function profileLoader({ params } : { params: { id: number }}){
    const profileData: ProfileData = await getProfileData(params.id);

    return profileData;
}

export default function Profile(){

    const data: ProfileData = useLoaderData() as ProfileData;

    const name: string = data.name;
    const courses: string[] = data.courses;
    const email: string = data.email;

    return(
        <div>
            <p>Name: {name}</p>
            <div>
                <label>Courses: </label>
                <ul>
                {courses.map((course: string) => (<li key={course}>{course}</li>))}
                </ul>
            </div>
            <p>Contact Info:</p>
            <p>Email: {email}</p>
            <div>
                <Link to={"./edit"}>
                    <p>Edit Information</p>
                </Link>
            </div>
        </div>
    );

}