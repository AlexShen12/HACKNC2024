# builtin
from contextlib import asynccontextmanager

# external
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

# internal
from src.globals import Environment
from src.API import account_router, profile_router
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

origins: list[str] = [
       "http://localhost:5173",  # Replace with your React frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def login():
    return FileResponse("frontend/src/components/routes/account/login.tsx")


app.include_router(router=account_router)
app.include_router(router=profile_router)