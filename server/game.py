import random
import uuid
import json
from typing import List
from typing import Dict
from spotify.track import Track
from spotify.album import Album
from spotify.artist import Artist
from spotify_manager import SpotifyManager

def print_json(obj):
    print(json.dumps(obj, indent=2))

class Game(object):

    def __init__(self, item_type, gamemode, settings):
        self.game_id: uuid.UUID = uuid.uuid4()

        # Core game values
        self.item_type: str = item_type if (item_type == "artist" or item_type == "album") else "track"
        self.gamemode: str = gamemode if (gamemode == "guess") else "vote"
        
        # Game rules
        self.rounds: int = settings['rounds']
        self.allow_explicit: bool = settings['allow_explicit']

        # Storage variables
        self.current_round: int = 0
        self.round_items: List[str] = [None] * self.rounds
        self.track_pool: Dict[Track] = {}
        self.album_pool: Dict[Album] = {}
        self.artist_pool: Dict[Artist] = {}
        self.album_artist_ids: List[str] = []

    def get_item_type(self) -> str:
        """
        Gets the item type for this game. Can be either 'artist', 'album', or 'track'.

        Returns:
            str: The item type of the game.
        """

        return self.item_type
    
    def get_gamemode(self) -> str:
        """
        Gets the gamemode for this game. Currently can be either 'vote' or 'guess'.

        Returns:
            str: The gamemode of the game.
        """
        
        return self.gamemode

    def get_rounds(self) -> int:
        """
        Gets the number of rounds in the game.

        Returns:
            int: Number of rounds in the game.
        """

        return self.rounds

    def get_current_round(self) -> int:
        """
        Gets the current round of the game.

        Returns:
            int: The current round number of the game (0 if the game hasn't yet started, or -1 if the game has ended).
        """

        return self.current_round
    
    def get_current_item(self):
        """
        Gets the item for the current round of the game.

        Returns:
            Track: The current item.
        """

        return self.get_item_by_id(self.round_items[self.get_current_round() - 1])

    def get_allow_explicit(self) -> bool:
        """
        Whether or not the game allows explicit tracks.

        Returns:
            bool: True if explicit tracks are allowed, false otherwise.
        """

        return self.allow_explicit
    
    def get_item_by_id(self, item_id):
        """
        Gets an item in the game given its ID.
        The type of item retrieved will depend on this game's item type.

        Parameters:
            string: The item ID.

        Returns:
            SpotifyItem: The corresponding item object.
        """

        if self.item_type == "album":
            return self.get_album_by_id(item_id)
        elif self.item_type == "artist":
            return self.get_artist_by_id(item_id)
        return self.get_track_by_id(item_id)

    def get_track_by_id(self, track_id: str) -> Track:
        """
        Gets a track in the game given its ID.

        Parameters:
            string: The track ID.

        Returns:
            Track: The corresponding Track object.
        """

        return self.track_pool.get(track_id, None) 
    
    def get_album_by_id(self, album_id) -> Album:
        """
        Gets an album in the game given its ID.

        Parameters:
            string: The album ID.

        Returns:
            Track: The corresponding Album object.
        """

        return self.album_pool.get(album_id, None)
    
    def get_artist_by_id(self, artist_id) -> Artist:
        """
        Gets an artist in the game given their ID.

        Parameters:
            string: The artist ID.

        Returns:
            Track: The corresponding Artist object.
        """

        return self.artist_pool.get(artist_id, None)
    
    def is_album_artist(self, artist_id) -> bool:
        """
        Gets whether an artist, given their ID, is the artist of an album in the game.
        This will return false for artists who are only features.

        Parameters:
            string: The artist ID.
        
        Returns:
            bool: True if the artist is an album artist, false otherwise.
        """

        return artist_id in self.album_artist_ids
    
    def add_track(self, manager: SpotifyManager, track_json, user_id):
        """
        Adds a track to the game, given its item JSON and the user whose adding it's ID.
        Not every track is available to be added due to Spotify API behavior, or game rules.
        In these cases, this function will simply return.

        Parameters:
            SpotifyManager: The SpotifyManager object to use.
            JSON: The track item's JSON object.
            string: The ID of the user who is adding this track.
        """

        if track_json['preview_url'] is None: return
        if track_json['explicit'] and not self.allow_explicit: return
        track_id = str(track_json['id'])
        if not track_id in self.track_pool:
            for a in track_json['artists']:
                self.add_artist(manager, a, user_id)
            self.add_album(manager, track_json['album'], user_id)
            self.track_pool[track_id] = Track(track_json)
            for a in track_json['album']['artists']:
                self.artist_pool[str(a['id'])].increment_track_count()
        self.track_pool[track_id].add_listener(user_id)
        manager.get_user_by_id(user_id).add_track(track_id)

    def add_album(self, manager: SpotifyManager, album_json, user_id):
        """
        Adds an album to the game, given its JSON and the user whose adding it's ID.

        Parameters:
            SpotifyManager: The SpotifyManager object to use.
            JSON: The album's JSON object.
            string: The ID of the user who is adding this album.
        """

        album_id = str(album_json['id'])
        if not album_id in self.album_pool:
            self.album_pool[album_id] = Album(album_json)
            # Add user as listener to only album artists
            for a in album_json['artists']:
                self.add_artist(manager, a, user_id)
                artist_id = str(a['id'])
                if not artist_id in self.album_artist_ids:
                    self.album_artist_ids.append(artist_id)

    def add_artist(self, manager: SpotifyManager, artist_json, user_id):
        """
        Adds an artist to the game, given their JSON and the user whose adding them's ID.

        Parameters:
            SpotifyManager: The SpotifyManager object to use.
            JSON: The artist's JSON object.
            string: The ID of the user who is adding this artist.
        """

        artist_id = str(artist_json['id'])
        if not artist_id in self.artist_pool:
            artist = manager.get_spotify().artist(artist_id)
            self.artist_pool[artist_id] = Artist(artist)
        self.artist_pool[artist_id].add_listener(user_id)
        manager.get_user_by_id(user_id).add_artist(artist_id)

    def add_playlist_tracks(self, manager: SpotifyManager, playlist_id):
        """
        Adds the tracks from the given playlist ID and the playlist's owner's authenticated Spotify object from the manager.

        Parameters:
            SpotifyManager: The SpotifyManager object to use.
            string: The ID of the playlist.
        """

        playlist = manager.get_spotify().playlist(playlist_id, fields='owner.display_name,owner.id,tracks.total')
        
        user_id = str(playlist['owner']['id'])
        track_count = int(playlist['tracks']['total'])
        offset = 0
        while track_count > 0:
            limit = min(100, track_count)
            tracks = manager.get_spotify().playlist_tracks(playlist_id, fields='items.is_local,items.track.album.artists.name,items.track.album.artists.id,items.track.album.album_type,items.track.album.id,items.track.album.images,items.track.album.name,items.track.album.total_tracks,items.track.artists.id,items.track.artists.name,items.track.duration_ms,items.track.id,items.track.name,items.track.preview_url,items.track.explicit', limit=limit, offset=offset, additional_types=['track'])

            for t in tracks['items']:
                if t['is_local']: continue
                self.add_track(manager, t['track'], user_id)
            track_count -= limit
            offset += 100
    
    def add_saved_tracks(self, manager: SpotifyManager):
        """
        Adds the manager's Spotify object's authenticated user's saved tracks to this game, limited to 20 tracks.

        Parameters:
            SpotifyManager: The SpotifyManager object to use.
        """

        user_id = str(manager.get_spotify().current_user()['id'])
        offset = 0
        while offset < 100:
            tracks = manager.get_spotify().current_user_saved_tracks(20, offset)
            for t in tracks['items']:
                if t['track']['is_local']: continue
                self.add_track(manager, t['track'], user_id)
            offset += 20

    def get_random_item(self):
        """
        Gets a random item in this game.
        The type of item retrieved will depend on this game's item type.

        Returns:
            SpotifyItem: The random item.
        """

        if self.item_type == "album":
            return self.get_random_album()
        elif self.item_type == "artist":
            return self.get_random_artist()
        return self.get_random_track()

    def get_random_track(self) -> Track:
        """
        Gets a random track in this game.

        Returns:
            Track: The random Track object.
        """

        return random.choice(list(self.track_pool.values()))
    
    def get_random_album(self) -> Album:
        """
        Gets a random album in this game.

        Returns:
            Album: The random Album object.
        """

        return random.choice(list(self.album_pool.values()))
    
    def get_random_artist(self) -> Artist:
        """
        Gets a random album artist in this game.

        Returns:
            Artist: The random Artist object.
        """

        return self.artist_pool[self.album_artist_ids[random.randint(0, len(self.album_artist_ids)-1)]]
    
    def reset_round_items(self):
        """
        Randomly picks the items for this game's rounds from the game's item type's pool.
        """

        self.round_items = [None] * self.rounds
        i = 0
        while i < self.get_rounds():
            t = self.get_random_item()
            if t.get_id() not in self.round_items:
                self.round_items[i] = t.get_id()
                i += 1

    def __start_game(self):
        self.reset_round_items()

    def game_started(self) -> bool:
        """
        Gets whether this game has started yet or not.

        Returns:
            bool: True if this game has started, false otherwise.
        """

        return self.get_current_round() != 0

    def end_game(self):
        """
        Ends this game.
        """

        self.current_round = -1

    def next_round(self):
        """
        Moves this game to the next round. This will also manage starting and ending the game.
        """

        if self.current_round == 0:
            self.__start_game()
        elif self.current_round > self.rounds:
            self.end_game()
            return
        
        self.current_round += 1