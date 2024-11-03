# builtin
from contextlib import asynccontextmanager

# external
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

# internal
from src.globals import Environment
from src.API import account_router
from src.database import SupabaseClient

def initialize_supabase_client(app: FastAPI):
    environment: Environment = app.state.environment
    supabase_client: SupabaseClient = SupabaseClient(environment.SUPABASE_URL, environment.API_KEY)
    app.state.supabase_client = supabase_client


@asynccontextmanager
async def lifespan(app: FastAPI):
    environment: Environment = Environment()
    app.state.environment = environment
    initialize_supabase_client(app)
    yield

app: FastAPI = FastAPI(lifespan=lifespan)

@app.get("/")
def login():
    return FileResponse("frontend/src/components/routes/account/login.tsx")


app.include_router(router=account_router)