import random
import uuid
from typing import List
from typing import Dict
from spotify.track import Track
from spotify.album import Album
from spotify.artist import Artist
from spotify.user import User
from spotipy import Spotify
from spotify_manager import SpotifyManager

class Game(object):

    def __init__(self, rounds=10, allow_explicit=True):
        self.game_id: uuid.UUID = uuid.uuid4()
        self.spotify_manager = SpotifyManager()
        
        # Game rules
        self.rounds: int = rounds
        self.allow_explicit: bool = allow_explicit

        # Storage variables
        self.current_round: int = 0
        self.round_tracks: List[Track] = [None] * self.rounds
        self.track_pool: Dict[Track] = {}
        self.albums: Dict[Album] = {}
        self.artists: Dict[Artist] = {}
        self.album_artist_ids: List[str] = []

    # Returns the game's spotify manager
    def get_manager(self) -> SpotifyManager:
        return self.spotify_manager
    
    # Returns the game's Spotify object
    def get_spotify(self) -> Spotify:
        return self.spotify_manager.spotify

    # Returns the number of rounds in the game
    def get_rounds(self) -> int:
        return self.rounds

    # Returns the current round (0 means game has not started yet, -1 means game ended)
    def get_current_round(self) -> int:
        return self.current_round
    
    # Returns the track from the current round
    def get_current_track(self) -> Track:
        return self.get_track_by_id(self.round_tracks[self.get_current_round() - 1])

    # Returns whether the game allows explicit tracks
    def allow_explicit_tracks(self) -> bool:
        return self.allow_explicit

    # Returns a track in the game given its id
    def get_track_by_id(self, track_id) -> Track:
        return self.track_pool.get(track_id, None) 
    
    # Returns an album in the game given its id
    def get_album_by_id(self, album_id) -> Album:
        return self.albums.get(album_id, None)
    
    # Returns a user in the game given their id
    def get_user_by_id(self, user_id) -> User:
        return self.get_manager().get_user_by_id(user_id)
    
    # Returns an artist in the game given their id
    def get_artist_by_id(self, artist_id) -> Artist:
        return self.artists.get(artist_id, None)
    
    # Returns whether an artist is an album artist in this game
    def is_album_artist(self, artist_id) -> bool:
        return artist_id in self.album_artist_ids
    
    # Adds a track to this game given the tracks's json and the user who is adding's id
    def add_track(self, track_item_json, user_id):
        if track_item_json['is_local'] or track_item_json['track']['preview_url'] is None: return
        track_json = track_item_json['track']
        track_id = str(track_json['id'])
        if not track_id in self.track_pool:
            for a in track_json['artists']:
                self.add_artist(a, user_id)
            self.add_album(track_json['album'], user_id)
            self.track_pool[track_id] = Track(track_json)
            for a in track_json['album']['artists']:
                self.artists[str(a['id'])].increment_track_count()
        self.track_pool[track_id].add_listener(user_id)

    # Adds an album to this game given the albums's json and the user who is adding's id
    def add_album(self, album_json, user_id):
        album_id = str(album_json['id'])
        if not album_id in self.albums:
            self.albums[album_id] = Album(album_json)
            # Add user as listener to only main artist
            for a in album_json['artists']:
                self.add_artist(a, user_id)
                artist_id = str(a['id'])
                if not artist_id in self.album_artist_ids:
                    self.album_artist_ids.append(artist_id)

    # Adds an artist to this game given the artist's json and the user who is adding's id
    def add_artist(self, artist_json, user_id):
        artist_id = str(artist_json['id'])
        if not artist_id in self.artists:
            self.artists[artist_id] = Artist(artist_json)
        self.artists[artist_id].add_listener(user_id)

    # Adds tracks to this game from a given playlist
    def add_playlist_tracks(self, id):
        playlist = self.get_spotify().playlist(id, fields='owner.display_name,owner.id,tracks.total')
        
        user_id = str(playlist['owner']['id'])
        track_count = int(playlist['tracks']['total'])
        offset = 0
        while track_count > 0:
            limit = min(100, track_count)
            tracks = self.get_spotify().playlist_tracks(id, fields='items.is_local,items.track.album.artists,items.track.album.album_type,items.track.album.id,items.track.album.images,items.track.album.name,items.track.album.total_tracks,items.track.artists,items.track.duration_ms,items.track.id,items.track.name,items.track.preview_url', limit=limit, offset=offset, additional_types=['track'])
            
            for t in tracks['items']:
                self.add_track(t, user_id)
            track_count -= limit
            offset += 100

    # Returns a random track from this game's track pool
    def get_random_track(self) -> Track:
        return random.choice(list(self.track_pool.values()))
    
    # Returns a random album from this game's albums
    def get_random_album(self) -> Album:
        return random.choice(list(self.albums.values()))
    
    # Returns a random artist from this game's albums
    def get_random_artist(self) -> Artist:
        return self.artists[self.album_artist_ids[random.randint(0, len(self.album_artist_ids)-1)]]
    
    # Resets the tracks used in each round
    def reset_round_tracks(self):
        self.round_tracks = [None] * self.rounds
        i = 0
        while i < self.get_rounds():
            t = self.get_random_track()
            if t.get_id() not in self.round_tracks:
                self.round_tracks[i] = t.get_id()
                i += 1

    def __start_game(self):
        self.reset_round_tracks()

    # Returns whether the game can start or not
    def can_start(self) -> bool:
        return self.get_manager().get_user_count() > 0

    # Returns whether the game has started yet
    def game_started(self) -> bool:
        return self.get_current_round() > 0

    # Ends the game
    def end_game(self):
        self.current_round = -1

    # Advances the game to the next round
    def next_round(self):
        if self.current_round == 0:
            self.__start_game()
        elif self.current_round > self.rounds:
            self.end_game()
            return
        
        self.current_round += 1