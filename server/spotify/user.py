from spotify.spotify_unit import SpotifyUnit

class User(SpotifyUnit):

    def __init__(self, user_json, token_info):
        super().__init__(str(user_json['id']), str(user_json['display_name']))
        self.profile_pictures = user_json['images']
        self.playlists = None
        self.token_info = token_info
    
    # Returns this user's profile pictures as a JSON
    def get_profile_pictures(self):
        return self.profile_pictures
    
    # Sets this user's playlists given a JSON
    def set_playlists(self, playlists_json):
        self.playlists = playlists_json

    # Returns this user's playlists as a JSON
    def get_playlists(self):
        return self.playlists
    
    # Returns this user's authentication token info
    def get_token_info(self):
        return self.token_info
    
    # Sets this user's authentication token info
    def set_token_info(self, token_info):
        self.token_info = token_info
    
    def serialize(self):
        return {
            "id": self.get_id(),
            "name": self.get_name(),
            "profile_pictures": self.get_profile_pictures(),
            "playlists": self.get_playlists()
        }