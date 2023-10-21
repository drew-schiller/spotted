import spotipy
from typing import Dict
from spotify.user import User
from decouple import config
CLIENT_ID = config("SPOTIPY_CLIENT_ID")
CLIENT_SECRET = config("SPOTIPY_CLIENT_SECRET")
REDIRECT_URI = config("SPOTIPY_REDIRECT_URI")
SCOPE = "user-library-read playlist-read-private"

class SpotifyManager(spotipy.CacheHandler):

    def __init__(self, auth_token=None):
        oauth = spotipy.oauth2.SpotifyOAuth(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI, scope=SCOPE, cache_handler=self, show_dialog=True, open_browser=True)
        self.spotify = spotipy.Spotify(auth=auth_token, oauth_manager=oauth)

        # Store users
        self.current_user_id: str = ""
        self.users: Dict[User] = {}

    # Cache Handler implementation
    def get_cached_token(self):
        user = self.get_user_by_id(self.current_user_id)
        if not user is None:
            return user.get_auth_token()
        return None
        
    # Cache Handler implementation
    def save_token_to_cache(self, token_info):
        if self.current_user_id in self.users:
            self.get_user_by_id(self.current_user_id).set_auth_token(token_info)
        return None
    
    # Returns a user given their id
    def get_user_by_id(self, user_id) -> User:
        return self.users.get(user_id, None)
    
    # Returns the number of different users in the manager
    def get_user_count(self) -> int:
        return len(self.users)
    
    # Returns the current authenticated user's id
    def get_current_user_id(self):
        return self.current_user_id
    
    # Sets the current authenticated user
    def set_current_user(self, user_id):
        self.current_user_id = user_id
        self.spotify.set_auth(self.get_cached_token())

    # Configures the manager to add a new user, returning the Spotify authentication page
    def configure_spotify(self):
        self.set_current_user("")
        return self.spotify.oauth_manager.get_authorize_url()
    
    # Adds the currently authenticated user to this manager
    def add_user(self, response_code):
        auth_token = self.spotify.oauth_manager.get_access_token(response_code, False, False)
        self.spotify.set_auth(auth_token)
        user_json = self.spotify.current_user()
        self.current_user_id = user_id = str(user_json['id'])
        if not user_id in self.users:
            self.users[user_id] = User(user_json, auth_token)

    # Removes a user from this manager given their id
    def remove_user(self, user_id):
        self.users.pop(user_id, None)

    # Returns the playlists for the current authenticated user
    def get_playlists(self):
        json = self.spotify.current_user_playlists()['items']
        # Ensures playlists are owned by player
        playlists = []
        for p in json:
            if p['owner']['id'] == self.current_user_id and not p['collaborative']:
                playlists.append(p)
        return playlists