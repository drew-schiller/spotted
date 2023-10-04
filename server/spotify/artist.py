class Artist(object):

    def __init__(self, artist_json):
        self.id = str(artist_json['id'])
        self.name = str(artist_json['name'])
        self.user_listeners = set()
        self.song_count = 0

    # Returns this artist's id
    def get_id(self) -> str:
        return self.id
    
    # Returns this artist's name
    def get_name(self) -> str:
        return self.name
    
    # Returns the ids of users in the game that listen to this artist
    def get_user_listeners(self):
        return self.user_listeners
    
    # Adds a user that listens to this artist, given their id
    def add_listener(self, user_id):
        self.user_listeners.add(user_id)

    # Returns the number of songs this artist has in the game
    def get_song_count(self) -> int:
        return self.song_count

    # Increases the number of songs the artist has in the game by 1
    def increment_song_count(self):
        self.song_count += 1

    def __eq__(self, other):
        return self.id == other.id
    
    def __str__(self):
        return self.name

    def __hash__(self):
        return hash(self.get_id())