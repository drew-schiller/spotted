from typing import List
from typing import Set

class Track(object):

    def __init__(self, track_json):
        self.id = str(track_json['id'])
        self.name = str(track_json['name'])
        self.artists = []
        for a in track_json['artists']:
            self.artists.append(a['id'])
        self.album = str(track_json['album']['id'])
        self.album_artists = []
        for a in track_json['album']['artists']:
            self.artists.append(a['id'])
        self.duration = int(track_json['duration_ms']) / 1000
        self.user_listeners = set()
        self.preview_url = str(track_json['preview_url'])
    
    # Returns this track's id
    def get_id(self) -> str:
        return self.id
    
    # Returns this track's name
    def get_name(self) -> str:
        return self.name
    
    # Returns this track's artists' ids
    def get_artists(self) -> List[str]:
        return self.artists
    
    # Returns this track's album id
    def get_album(self) -> str:
        return self.album
    
    # Returns this track's album artists' ids
    def get_album_artists(self) -> List[str]:
        return self.album_artists

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
    
    # Returns the track as a JSON object
    def serialize(self):
        json = {
            "id": self.get_id(),
            "name": self.get_name(),
            "artist_ids": [],
            "album_id": self.get_album(),
            "album_artist_ids": [],
            "duration": self.get_duration(),
            "listener_ids": [],
            "preview_url": self.get_preview_url()
        }
        for a in self.get_artists():
            json["artist_ids"].append(a)
        for a in self.get_album_artists():
            json["album_artist_ids"].append(a)
        for l in self.get_user_listeners():
            json["listener_ids"].append(l)
        return json

    def __eq__(self, other):
        return self.id == other.id
    
    def __str__(self):
        return self.name

    def __hash__(self):
        return hash(self.get_id())