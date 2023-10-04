import random
import spotipy
import uuid
import json
from spotify import *

def print_json(dump):
    print(json.dumps(dump, indent=4))

class Game(object):

    def __init__(self, credentials):
        self.game_id = uuid.uuid4()
        self.spotify = spotipy.Spotify(client_credentials_manager=credentials)
        self.tracks = {}
        self.albums = {}
        self.users = {}
        self.artists = {}
        self.album_artist_ids = []

    # Returns a track in the game given its id
    def get_track_by_id(self, track_id) -> Track:
        return self.tracks[track_id] 
    
    # Returns an album in the game given its id
    def get_album_by_id(self, album_id) -> Album:
        return self.albums[album_id]
    
    # Returns a user in the game given their id
    def get_user_by_id(self, user_id) -> User:
        return self.users[user_id]
    
    # Returns an artist in the game given their id
    def get_artist_by_id(self, artist_id) -> Artist:
        return self.artists[artist_id]
    
    # Returns whether an artist is an album artist in this game
    def is_album_artist(self, artist_id) -> bool:
        return artist_id in self.album_artist_ids
    
    # Adds a track to this game given the tracks's json and the user who is adding's id
    def add_track(self, track_json, user_id):
        track_id = str(track_json['id'])
        if not track_id in self.tracks:
            self.tracks[track_id] = Track(track_json)
            for a in track_json['album']['artists']:
                self.artists[str(a['id'])].increment_song_count()
        self.tracks[track_id].add_listener(user_id)

    # Adds an album to this game given the albums's json
    def add_album(self, album_json):
        album_id = str(album_json['id'])
        if not album_id in self.albums:
            self.albums[album_id] = Album(album_json)

    # Adds a user to this game given the user's json
    def add_user(self, user_json):
        user_id = str(user_json['id'])
        if not user_id in self.users:
            self.users[user_id] = User(user_json)

    # Adds an artist to this game given the artist's json
    def add_artist(self, artist_json):
        artist_id = str(artist_json['id'])
        if not artist_id in self.artists:
            self.artists[artist_id] = Artist(artist_json)

    # Adds tracks to this game from a given playlist
    def add_playlist_tracks(self, id):
        playlist = self.spotify.playlist(id, fields='owner.display_name,owner.id,tracks.total')
        self.add_user(playlist['owner'])
        
        user_id = str(playlist['owner']['id'])
        track_count = int(playlist['tracks']['total'])
        offset = 0
        while track_count > 0:
            limit = min(100, track_count)
            tracks = self.spotify.playlist_tracks(id, fields='items.is_local,items.track.album.artists,items.track.album.album_type,items.track.album.id,items.track.album.images,items.track.album.name,items.track.album.total_tracks,items.track.artists,items.track.duration_ms,items.track.id,items.track.name', limit=limit, offset=offset, additional_types=['track'])
            
            for t in tracks['items']:
                if t['is_local']: continue
                self.add_album(t['track']['album'])
                for a in t['track']['artists']:
                    self.add_artist(a)
                # Add user as listener to only main artist
                for a in t['track']['album']['artists']:
                    self.add_artist(a)
                    self.album_artist_ids.append(str(a['id']))
                    self.artists[str(a['id'])].add_listener(user_id)
                self.add_track(t['track'], user_id)
            track_count -= limit
            offset += 100 

    # Returns a random song in this game's tracks
    def get_random_song(self) -> Track:
        return random.choice(list(self.tracks.values()))
    
    # Returns a random album in this game's albums
    def get_random_album(self) -> Album:
        return random.choice(list(self.albums.values()))
    
    # Returns a random artist from this game's albums
    def get_random_artist(self) -> Artist:
        return self.artists[self.album_artist_ids[random.randint(0, len(self.album_artist_ids)-1)]]