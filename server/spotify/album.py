from typing import List
from spotify.spotify_item import SpotifyItem

class Album(SpotifyItem):

    def __init__(self, album_json):
        super().__init__(str(album_json['id']), str(album_json['name']))
        self.track_count = int(album_json['total_tracks'])
        self.artists = album_json['artists']
        self.images = album_json['images']
    
    # Returns this album's track count
    def get_track_count(self) -> int:
        return self.track_count
    
    # Returns this album's artists as a JSON
    def get_artists(self):
        return self.artists
    
    # Returns this album's cover images in different sizes
    def get_images(self):
        return self.images
    
    def serialize(self):
        return {
            "id": self.get_id(),
            "name": self.get_name(),
            "track_count": self.get_track_count(),
            "artists": self.get_artists(),
            "images": self.get_images()
        }