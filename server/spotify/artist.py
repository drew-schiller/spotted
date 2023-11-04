from typing import Set
from spotify.spotify_unit import SpotifyUnit

class Artist(SpotifyUnit):

    def __init__(self, artist_json):
        super().__init__(str(artist_json['id']), str(artist_json['name']))
        self.user_listeners = set()
        self.track_count = 0

    # Returns this artist's id
    def get_id(self) -> str:
        return self.id
    
    # Returns this artist's name
    def get_name(self) -> str:
        return self.name
    
    # Returns the ids of users in the game that listen to this artist
    def get_user_listeners(self) -> Set[str]:
        return self.user_listeners
    
    # Adds a user that listens to this artist, given their id
    def add_listener(self, user_id) -> None:
        self.user_listeners.add(user_id)

    # Returns the number of tracks this artist has in the game
    def get_track_count(self) -> int:
        return self.track_count

    # Increases the number of tracks the artist has in the game by 1
    def increment_track_count(self) -> None:
        self.track_count += 1

    def serialize(self):
        json = {
            "id": self.get_id(),
            "name": self.get_name(),
            "listener_ids": [],
            "track_count": self.get_track_count()
        }
        for l in self.get_user_listeners():
            json["listener_ids"].append(l)
        return json