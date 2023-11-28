from typing import List
from typing import Set
from spotify.spotify_unit import SpotifyUnit

class Track(SpotifyUnit):

    def __init__(self, track_json):
        super().__init__(str(track_json['id']), str(track_json['name']))
        self.artists = []
        for a in track_json['artists']:
            self.artists.append(a['id'])
        self.album = track_json['album']
        self.duration = int(track_json['duration_ms']) / 1000
        self.user_listeners = set()
        self.preview_url = str(track_json['preview_url'])
    
    # Returns this track's artists' ids
    def get_artists(self) -> List[str]:
        return self.artists
    
    # Returns this track's album JSON
    def get_album(self):
        return self.album

    # Returns this track's duration in seconds
    def get_duration(self) -> int:
        return self.duration
    
    # Returns the ids of users in the game that listen to this track
    def get_user_listeners(self) -> Set[str]:
        return self.user_listeners
    
    # Adds a user that listens to this track, given their id
    def add_listener(self, user_id) -> None:
        self.user_listeners.add(user_id)

    # Returns the track's 30 second audio preview URL
    def get_preview_url(self) -> str:
        return self.preview_url

    def serialize(self):
        json = {
            "id": self.get_id(),
            "name": self.get_name(),
            "artist_ids": [],
            "album": self.get_album(),
            "duration": self.get_duration(),
            "listener_ids": [],
            "preview_url": self.get_preview_url()
        }
        for a in self.get_artists():
            json["artist_ids"].append(a)
        for l in self.get_user_listeners():
            json["listener_ids"].append(l)
        return json