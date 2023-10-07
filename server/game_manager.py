import random
import spotipy
import uuid
import json
from spotify.track import Track
from spotify.album import Album
from spotify.artist import Artist
from spotify.user import User
from decouple import config
cid = config("SPOTIPY_CLIENT_ID")
csec = config("SPOTIPY_CLIENT_SECRET")

def print_json(dump):
    print(json.dumps(dump, indent=4))

class Game(object):

    def __init__(self, credentials, rounds=10):
        self.game_id = uuid.uuid4()
        self.spotify = spotipy.Spotify(client_credentials_manager=credentials)
        self.rounds = rounds
        self.current_round = 0
        self.round_tracks = [None] * self.rounds
        self.track_pool = {}
        self.albums = {}
        self.users = {}
        self.artists = {}
        self.album_artist_ids = []

    # Returns the number of rounds in the game
    def get_rounds(self) -> int:
        return self.rounds

    # Returns the current round (0 means game has not started yet, -1 means game ended)
    def get_current_round(self) -> int:
        return self.current_round
    
    # Returns the track from the current round
    def get_current_track(self) -> Track:
        return self.get_track_by_id(self.round_tracks[self.get_current_round()])

    # Returns a track in the game given its id
    def get_track_by_id(self, track_id) -> Track:
        return self.track_pool[track_id] 
    
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
        if not track_id in self.track_pool:
            self.track_pool[track_id] = Track(track_json)
            for a in track_json['album']['artists']:
                self.artists[str(a['id'])].increment_song_count()
        self.track_pool[track_id].add_listener(user_id)

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
            tracks = self.spotify.playlist_tracks(id, fields='items.is_local,items.track.album.artists,items.track.album.album_type,items.track.album.id,items.track.album.images,items.track.album.name,items.track.album.total_tracks,items.track.artists,items.track.duration_ms,items.track.id,items.track.name,items.track.preview_url', limit=limit, offset=offset, additional_types=['track'])
            
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
        for i in range(self.get_rounds()):
            t = self.get_random_track()
            if t.get_id() not in self.round_tracks:
                self.round_tracks[i] = t.get_id()
            else:
                i -= 1

    def __start_game(self):
        self.reset_round_tracks()

    def __end_game(self):
        self.current_round = -1

    def next_round(self):
        if self.current_round == 0:
            self.__start_game()
        elif self.current_round > self.rounds:
            self.__end_game()
            return
        
        self.current_round += 1

game = Game(spotipy.SpotifyClientCredentials(client_id=cid, client_secret=csec))
game.add_playlist_tracks("7tgwIMkJSIML6gBYqc4gEb")
game.add_playlist_tracks("4mGvwpeEYVT58nUYhdKG8j")
for i in range(game.get_rounds()):
    game.next_round()
    print("")
    print("------- Round " + str(game.get_current_round()) + "/" + str(game.get_rounds()) + " -------")

    t = game.get_current_track()
    print(t.get_name())
    print(t.get_preview_url())
    guess = str(input("Guess user: "))

    listeners = t.get_user_listeners()
    found = False
    s = ""
    for l in listeners:
        s += " " + game.get_user_by_id(l).get_name()
        if guess == game.get_user_by_id(l).get_name():
            print("Correct! Next round...")
            found = True
            break
    if not found:
        print("Incorrect. Next round...")
    print(s)
    print("")
    print("")