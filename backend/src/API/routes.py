from fastapi import FastAPI,APIRouter
import supabase
from backend.app import User_Login

app = FastAPI()

app.post("/login")
def login():
    response = supabase.auth.sign_in_with_password(
    {"email": "email@example.com", "password": "example-password"}
)

app.post("/createaccount")
def create_account(profile:User_Login):
    response = supabase.table("students").insert({"name":profile.name, "email": profile.email, "courses": profile.courses}).execute()






