from typing import List

class Album(object):

    def __init__(self, album_json):
        self.id = str(album_json['id'])
        self.name = str(album_json['name'])
        self.song_count = int(album_json['total_tracks'])
        self.artists = []
        for a in album_json['artists']:
            self.artists.append(a['id'])
        self.images = album_json['images']

    # Returns this album's id
    def get_id(self) -> str:
        return self.id
    
    # Returns this album's name
    def get_name(self) -> str:
        return self.name
    
    # Returns this album's song count
    def get_song_count(self) -> int:
        return self.song_count
    
    # Returns this album's artists' ids
    def get_artists(self) -> List[str]:
        return self.artists
    
    # Returns this album's cover images in different sizes
    def get_images(self):
        return self.images
    
    def __eq__(self, other):
        return self.id == other.id
    
    def __str__(self):
        return self.name

    def __hash__(self):
        return hash(self.get_id())