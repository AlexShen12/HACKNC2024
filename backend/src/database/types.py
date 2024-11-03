# builtin 

# external
from pydantic import BaseModel

# internal


class UpdateProfileInput(BaseModel):
    name: str
    username: str
    password: str
    addedCourses: list[int]
    removedCourses: list[int]
