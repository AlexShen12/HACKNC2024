# builtin 

# external
from supabase import create_client, Client


# internal

class SupabaseClient():
    supabase_client: Client

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(project_url, api_key)

    def signup(self, username: str, password: str, name:str):
        response = self.supabase_client.auth.sign_up({
            "name": name,
            "username": username,
            "password": password
        })

        return response

    def login(self, username: str, password: str):
        response = self.supabase_client.auth.sign_in_with_password({
            "username": username, 
            "password": password
        })

        return response
    
    def logout(self):
        response = self.supabase_client.auth.sign_out()
        return response
    
    def is_authenticated(self):
        response = self.supabase_client.auth.get_session()
        return response
