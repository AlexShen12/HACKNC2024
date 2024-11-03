# builtin 

# external
from supabase import create_client, Client

import User_Login

# internal

class SupabaseClient():
    supabase_client: Client

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(project_url, api_key)
    
    def sign_in(self, profile: UserLogin):
        response = self.supabase_client.auth.sign_in_with_password(
        {"username": self.supabase_client.username, "password": profile.password})