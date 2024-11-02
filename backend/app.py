# builtin

# external
from fastapi import FastAPI

# internal


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello" : "World"}