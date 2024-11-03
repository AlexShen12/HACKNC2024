# builtin

# external
from pydantic import BaseModel

# internal

class LoginInput(BaseModel):
    email: str
    password: str

class SignupInput(BaseModel):
    email: str
    password: str