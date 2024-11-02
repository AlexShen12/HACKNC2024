# builtin

# external
from fastapi import FastAPI
from pydantic import BaseModel

class User_Login(BaseModel):
    name: str 
    username: str #Email
    password: str 

class profile(BaseModel):
    courses: str 
    



# internal


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello" : "World"}