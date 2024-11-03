# builtin 

# external
from supabase import create_client, Client

import User_Login

# internal

class SupabaseClient():
    supabase_client: Client

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(project_url, api_key)

    def signup(self, email: str, password: str):
        response = self.supabase_client.auth.sign_up({
            "email": email,
            "password": password
        })

        return response

    def login(self, email: str, password: str):
        response = self.supabase_client.auth.sign_in_with_password({
            "email": email, 
            "password": password
        })

        return response
    
    def logout(self):
        response = self.supabase_client.auth.sign_out()
        return response
    
    def is_authenticated(self):
        response = self.supabase_client.auth.get_session()
        return response
