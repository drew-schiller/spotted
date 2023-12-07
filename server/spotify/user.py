from spotify.spotify_item import SpotifyItem

class User(SpotifyItem):

    def __init__(self, user_json, token_info):
        super().__init__(str(user_json['id']), str(user_json['display_name']))
        self.profile_pictures = user_json['images']
        self.token_info = token_info
        self.playlists = {}
        self.track_ids = []
        self.artist_ids = []
    
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

    # Adds a track that this user listens to
    def add_track(self, track_id):
        if track_id not in self.track_ids:
            self.track_ids.append(track_id)

    # Returns the IDs of tracks that this user listens to
    def get_track_ids(self):
        return self.track_ids

    # Adds an artist that this user listens to
    def add_artist(self, artist_id):
        if artist_id not in self.artist_ids:
            self.artist_ids.append(artist_id)

    # Returns the IDs of artists that this user listens to
    def get_artist_ids(self):
        return self.artist_ids
    
    def serialize(self):
        return {
            "id": self.get_id(),
            "name": self.get_name(),
            "profile_pictures": self.get_profile_pictures(),
            "playlists": self.get_playlists(),
            "track_ids": self.get_track_ids(),
            "artist_ids": self.get_artist_ids()
        }