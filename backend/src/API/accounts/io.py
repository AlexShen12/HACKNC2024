# builtin

# external
from pydantic import BaseModel

# internal

class AccountInput(BaseModel):
    email: str
    password: str