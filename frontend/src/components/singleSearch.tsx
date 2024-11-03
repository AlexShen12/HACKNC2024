import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CourseData } from '../types/types';
import { useDebouncedCallback } from 'use-debounce';
import ClassLink from './classLink';


const MAX_NUMBER_RESULTS = 10;

function truncateArray(arr: CourseData[]): CourseData[] {
    if (arr.length <= MAX_NUMBER_RESULTS) {
        return arr;
    } else {
        return arr.slice(0, MAX_NUMBER_RESULTS);
    }
}

export default function SingleSearch({ courses }: { courses: CourseData[] }) {
    const allCourses: CourseData[] = courses;
    const [courseList, setCourseList] = useState<CourseData[]>([]);
    const inputRef = useRef(null);
    useOutsideAlerter(inputRef, () => handleFocus("BLUR", null));

    const handleSearch = useDebouncedCallback((search: string) => {
        if (search.length > 0) {
            const filteredCourses: CourseData[] = courses.filter(course => course.courseNumber.includes(search) || course.courseName.includes(search));
            setCourseList(s => truncateArray(filteredCourses));
        } else {
            setCourseList(s => truncateArray(courses));
        }
    }, 250);

    const handleFocus = (state: "FOCUS" | "BLUR", search: string | null) => {
        if (state === "FOCUS") {
            if (search) {
                handleSearch(search);
            } else {
                setCourseList(s => truncateArray(courses));
            }
        } else {
            setCourseList(s => []);
        }
    }

    return (
        <div ref={inputRef}>
            <form>
                <input
                    id='single-class-search'
                    onChange={e => handleSearch(e.target.value)}
                    onFocus={e => handleFocus("FOCUS", e.target.value)}
                    placeholder="Search for a class..."
                />
                {courseList.map((course) => (
                    <ClassLink key={course.courseNumber} course={course} />
                ))}
            </form>
        </div>
    );

}

function useOutsideAlerter(ref: MutableRefObject<any>, callback: () => void) {
    function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}