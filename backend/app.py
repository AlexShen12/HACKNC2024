# builtin
from contextlib import asynccontextmanager

# external
from fastapi import FastAPI
from pydantic import BaseModel

# internal
from src.globals import Environment
from src.API.routes import router

app = FastAPI()


class User_Login(BaseModel):
    name: str 
    username: str #Email
    password: str 
    courses: str 

@asynccontextmanager
async def lifespan(app: FastAPI):
    environment: Environment = Environment()
    app.state.environment = environment
    yield

app: FastAPI = FastAPI(lifespan=lifespan)

app.include_router(router)