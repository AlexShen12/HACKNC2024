# builtin

# external 
from fastapi import APIRouter, Request
from supabase import create_client, Client
from pydantic import BaseModel
# internal
from src.database import SupabaseClient


class User_Login(BaseModel):
    name: str 
    username: str #Email
    password: str 
    courses: str

router = APIRouter()

@router.get("/test")
def test():
    return {"message": "Test endpoint working!"}

@router.post("/login")
def login(profile: User_Login, request: Request ):
    supabase: SupabaseClient = request.app.state.supabase_client
    supabase.login(profile.username,profile.password)


@router.post("/account")
def create_account(profile: User_Login, request: Request):
    supabase: SupabaseClient = request.app.state.supabase_client
    supabase.signup(profile.username, profile.password, profile.name)

    print("created account")
    response = supabase.table("students").insert({"name":profile.name, "username": profile.username, "courses": profile.courses}).execute()
    return response

@router.post("/courses")
def course_search(courses: str, request: Request):
    supabase: SupabaseClient = request.app.state.supabase_client

    userids = supabase.table("students").select("user_id").is_("courses", courses).execute()
    profile_info= []
    for id in userids.data:
        user = id["user_id"]
        response = supabase.table("students").select("name","username", "courses").eq("user_id",user).execute()
        if response.data:
            profile_info.extend(response.data)
    return profile_info

@router.get("/profile")
def profile(request: Request):
    supabase: SupabaseClient = request.app.state.supabase_client
    logged_in = supabase.auth.get_user()



