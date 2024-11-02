# builtin

# external
from fastapi import FastAPI
from pydantic import BaseModel

class User_Login(BaseModel):
    name:str 
    password: str 

# internal


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello" : "World"}