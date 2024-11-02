# builtin 

# external
from supabase import create_client, Client

# internal

class SupabaseClient():
    supabase_client: Client

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(project_url, api_key)