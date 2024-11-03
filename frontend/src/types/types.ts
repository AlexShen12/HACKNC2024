

export type CourseData = {
    courseNumber: string,
    courseName: string
}

export type ProfileData = {
    name: string,
    courses: CourseData[],
    email: string
}

export type ProfileCourseData = {
    allCourses: CourseData[],
    profileData: ProfileData
}

export type Username = {
    name: string
    username: string
}

export type CourseStudents = {
    courseNumber: string,
    students: Username[]
}