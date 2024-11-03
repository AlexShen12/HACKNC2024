# builtin 

# external
from supabase import create_client, Client


# internal
from .types import UpdateProfileInput


class SupabaseClient():
    supabase_client: Client

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(project_url, api_key)

    def signup(self, email: str, password: str):
        response = self.supabase_client.auth.sign_up({
            "email": email,
            "password": password
        })

            return response
        
        except Exception as e:
            return {"error": str(e)}

    def login(self, email: str, password: str):
        response = self.supabase_client.auth.sign_in_with_password({
            "email": email, 
            "password": password
        })

            return response
        
        except Exception as e:
            return {"error": str(e)}
    
    def logout(self):
        try:
            response = self.supabase_client.auth.sign_out()
            return response
        
        except Exception as e:
            return {"error": str(e)}
        
    
    def is_authenticated(self):
        try:
            response = self.supabase_client.auth.get_session()
            return response
        except Exception as e:
            return {"error": str(e)}
        

    def fetch_all_courses(self) -> list[dict]:
        try:
            response = self.supabase_client.table("courses").select("number, name").execute()

            return response.data
        
        except Exception as e:
            return {"error": str(e)}
        
    def fetch_student_profile(self, username: str) -> list[dict]:
        try:
            response = (
                self.supabase_client.table("students")
                .select("*")
                .eq("username", username)
                .execute()
            )

            data = response.data

            assert(len(data) == 1)

            response = (
                self.supabase_client.table("courses")
                .select("id, number, name, student_courses(course_id, student_id)")
                .eq("student_id", username)
                .execute()
            )

            courses: list[dict] = []

            for course in response.data:
                courseData = {
                    "number": course.get("number"),
                    "name": course.get("name"),
                }
                courses.append(courseData)

            profile: dict = {
                "name": data[0]["name"],
                "username": data[0]["username"],
                "courses": courses
            }

            return profile
        
        except Exception as e:
            return {"error": str(e)}
    

    def update_student_profile(self, input: UpdateProfileInput):
        try:
            user: str = self.supabase_client.auth.get_user().user.id

            response = (
                self.supabase_client.table("students")
                .update({
                    "name": input.name,
                    "username": input.username,
                })
                .eq("user_id", user)
                .execute()
            )

            removedCourses = input.removedCourses

            response = (
                self.supabase_client.table("student_courses")
                .delete()
                .eq("student_id", user)
                .in_("course_id", removedCourses)
                .execute()
            )

            for course in input.addedCourses:
                response = (
                    self.supabase_client.table("student_courses")
                    .insert({
                        "student_id": user,
                        "course_id": course
                    })
                    .execute()
                )

            return response
        
        except Exception as e:
            return {"error": str(e)}