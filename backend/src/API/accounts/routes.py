# builtin

# external
from fastapi import APIRouter, Request

# internal
from .io import LoginInput
from src.database import SupabaseClient


account_router: APIRouter = APIRouter(prefix="/accounts")

@account_router.post("/signup")
def signup(inputs: LoginInput, request: Request):
    supabase: SupabaseClient = request.app.state.supabase_client

    response = supabase.signup(inputs.email, inputs.password)

    return response

@account_router.post("/login")
def login(inputs: LoginInput, request: Request):
    supabase: SupabaseClient = request.app.state.supabase_client

    response = supabase.login(inputs.email, inputs.password)

    return response

    
    