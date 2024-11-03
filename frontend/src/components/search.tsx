import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import ClassDisplay from './classDisplay';
import { CourseData } from '../types/types';

const MAX_NUMBER_RESULTS = 10;

function truncateArray(arr: CourseData[], max: number): CourseData[] {
    if(arr.length <= max){
        return arr;
    } else {
        return arr.slice(0, max);
    }
}

export default function Search({courses, initialCourses} : {courses: CourseData[], initialCourses?: CourseData[]}) {
    const allCourses: CourseData[] = courses;
    const emptyCourses: CourseData[] = [];
    const initial: CourseData[] = initialCourses ? initialCourses : [];

    const [classes, setClasses] = useState(emptyCourses);
    const [selectedClasses, setSelectedClasses] = useState(initial);

    const inputRef = useRef(null);
    useOutsideAlerter(inputRef, () => handleFocus("BLUR", null));


    function addClass(course: CourseData): void {
        setSelectedClasses(s => [...s, course]);
    }

    function removeClass(course: CourseData): void {
        const filteredCourses: CourseData[] = selectedClasses.filter(c => c.courseNumber !== course.courseNumber);
        setSelectedClasses(s => truncateArray(filteredCourses, MAX_NUMBER_RESULTS));
    }

    const handleSearch = useDebouncedCallback((search: string) => {
        if(search.length > 0){
            const filteredCourses: CourseData[] = allCourses.filter(course => course.courseNumber.includes(search) || course.courseName.includes(search));
            setClasses(s => truncateArray(filteredCourses, MAX_NUMBER_RESULTS));
        } else {
            setClasses(s => truncateArray(allCourses, MAX_NUMBER_RESULTS));
        }
    }, 250);

    function handleFocus(state: "FOCUS" | "BLUR", search: string | null): void {
        if(state === "FOCUS"){
            if(search){
                handleSearch(search);
            } else {
                setClasses(s => truncateArray(allCourses, MAX_NUMBER_RESULTS));
            }
        } else {
            setClasses(s => emptyCourses);
        }
    }

    return (
        <div ref={inputRef}>
            <text>
                {selectedClasses.length > 0 ? selectedClasses.map(c => c.courseNumber).join(", ") : "No Classes Selected"}
            </text>

            <input
                id="class-search"
                placeholder={"Search for a class..."}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={(e) => handleFocus("FOCUS", e.target.value)}
            />
            <input 
                type="hidden"
                name='classes'
                value={selectedClasses.map(course => course.courseNumber).join('/')}
            />

            <div>
                {classes.map(course => (
                    <ClassDisplay 
                        key={course.courseNumber}
                        course={course}
                        add={addClass}
                        remove={removeClass}
                        initial={selectedClasses.some(c => c.courseNumber === course.courseNumber)}
                    />
                ))}
            </div>
        </div>
    );
}

function useOutsideAlerter(ref: MutableRefObject<any>, callback: () => void){
    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if(ref.current && !ref.current.contains(event.target)){
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}