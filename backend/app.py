# builtin

# external
from fastapi import FastAPI
from pydantic import BaseModel

class User_Login(BaseModel):
    name: str 
    username: str #Email
    password: str 
    courses: str 
    



# internal


app = FastAPI()
