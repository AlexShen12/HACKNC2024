# builtin

# external
from pydantic import BaseModel

# internal


class ProfileInput(BaseModel):
    name: str
    username: str
    addCourses: list[int]
    removeCourses: list[int]