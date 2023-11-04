from typing import List
from spotify.spotify_unit import SpotifyUnit

class Album(SpotifyUnit):

    def __init__(self, album_json):
        super().__init__(str(album_json['id']), str(album_json['name']))
        self.track_count = int(album_json['total_tracks'])
        self.artists = []
        for a in album_json['artists']:
            self.artists.append(a['id'])
        self.images = album_json['images']
    
    # Returns this album's track count
    def get_track_count(self) -> int:
        return self.track_count
    
    # Returns this album's artists' ids
    def get_artists(self) -> List[str]:
        return self.artists
    
    # Returns this album's cover images in different sizes
    def get_images(self):
        return self.images
    
    def serialize(self):
        json = {
            "id": self.get_id(),
            "name": self.get_name(),
            "track_count": self.get_track_count(),
            "artist_ids": [],
            "images": self.get_images()
        }
        for a in self.get_artists():
            json["artist_ids"].append(a)
        return json