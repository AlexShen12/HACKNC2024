# builtin

# external
from fastapi import APIRouter, Request

# internal
from .io import AccountInput
from src.database import SupabaseClient


account_router: APIRouter = APIRouter(prefix="/accounts")

@account_router.post("/signup")
def signup(inputs: AccountInput, request: Request):
    supabase: SupabaseClient = request.app.state.supabase_client

    response = supabase.signup(email=inputs.email, password=inputs.password)

    return response

@account_router.post("/login")
def login(inputs: AccountInput, request: Request):
    supabase: SupabaseClient = request.app.state.supabase_client

    response = supabase.login(email=inputs.email, password=inputs.password)

    return response

    
    