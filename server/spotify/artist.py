from typing import Set, List
from spotify.spotify_item import SpotifyItem

class Artist(SpotifyItem):

    def __init__(self, artist_json):
        super().__init__(str(artist_json['id']), str(artist_json['name']))
        self.listener_ids = set()
        self.track_count = 0

    # Returns this artist's id
    def get_id(self) -> str:
        return self.id
    
    # Returns this artist's name
    def get_name(self) -> str:
        return self.name
    
    # Returns the ids of users in the game that listen to this artist
    def get_listener_ids(self) -> Set[str]:
        return self.listener_ids
    
    # Adds a user that listens to this artist, given their id
    def add_listener(self, user_id) -> None:
        self.listener_ids.add(user_id)

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
        for l in self.get_listener_ids():
            json["listener_ids"].append(l)
        return json