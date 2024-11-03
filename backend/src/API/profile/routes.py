# builtin

# external
from fastapi import APIRouter, Request

# internal
from src.database import SupabaseClient
from .io import ProfileInput
from src.database.types import UpdateProfileInput


profile_router: APIRouter = APIRouter(prefix="/profile")

@profile_router.get("/{username}")
def get_profile(username: str, request: Request):
    assert isinstance(username, str), "Username must be an integer!"

    supabase: SupabaseClient = request.app.state.supabase_client

    response = supabase.fetch_student_profile(username=username)

    return response

@profile_router.post("/edit/{id}")
def add_profile(id: int, inputs: ProfileInput, request: Request):
    assert isinstance(id, int), "ID must be an integer!"

    supabase: SupabaseClient = request.app.state.supabase_client

    updateInputs: UpdateProfileInput = UpdateProfileInput(
        name=inputs.name,
        username=inputs.username,
        addCourses=inputs.addCourses,
        removeCourses=inputs.removeCourses
    )

    response = supabase.update_student_profile(inputs=updateInputs)

    return response