from fastapi import FastAPI,APIRouter
from supabase import create_client, Client
from pydantic import BaseModel
# from app import User_Login
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')

class User_Login(BaseModel):
    name: str 
    username: str #Email
    password: str 
    courses: str 

supabase = create_client(url, key)

router = APIRouter()

@router.get("/test")
def test():
    return {"message": "Test endpoint working!"}

@router.post("/login")
def login(profile:User_Login):
    response = supabase.auth.sign_in_with_password(
    {"username": profile.username, "password": profile.password}
)

@router.post("/createaccount")
def create_account(profile:User_Login):
    print("created account")
    response = supabase.table("students").insert({"name":profile.name, "username": profile.username, "courses": profile.courses}).execute()
    return response

@router.post("/coursesearch")
def course_search(courses:str):
    userids = supabase.table("students").select("user_id").is_("courses", courses).execute()
    profile_info= []
    for id in userids.data:
        user = id["user_id"]
        response = supabase.table("students").select("name","username", "courses").eq("user_id",user).execute()
        if response.data:
            profile_info.extend(response.data)
    return profile_info



