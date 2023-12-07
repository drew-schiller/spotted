from typing import List
from typing import Set
from spotify.spotify_item import SpotifyItem

class Track(SpotifyItem):

    def __init__(self, track_json):
        super().__init__(str(track_json['id']), str(track_json['name']))
        self.artists = track_json['artists']
        self.album = track_json['album']
        self.duration = int(track_json['duration_ms']) / 1000
        self.listener_ids = set()
        self.preview_url = str(track_json['preview_url'])
    
    # Returns this track's album JSON
    def get_album(self):
        return self.album
    
    #Returns this track's artists JSON
    def get_artists(self):
        return self.artists

    # Returns this track's duration in seconds
    def get_duration(self) -> int:
        return self.duration
    
    # Returns the ids of users in the game that listen to this track
    def get_listener_ids(self) -> Set[str]:
        return self.listener_ids
    
    # Adds a user that listens to this track, given their id
    def add_listener(self, user_id) -> None:
        self.listener_ids.add(user_id)

    # Returns the track's 30 second audio preview URL
    def get_preview_url(self) -> str:
        return self.preview_url

    def serialize(self):
        json = {
            "id": self.get_id(),
            "name": self.get_name(),
            "artists": self.get_artists(),
            "album": self.get_album(),
            "duration": self.get_duration(),
            "listener_ids": [],
            "preview_url": self.get_preview_url()
        }
        for l in self.get_listener_ids():
            json["listener_ids"].append(l)
        return json