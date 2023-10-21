class User(object):

    def __init__(self, user_json, auth_token):
        self.id = str(user_json['id'])
        self.name = str(user_json['display_name'])
        self.profile_pictures = user_json['images']
        self.auth_token = auth_token
    
    # Returns this user's id
    def get_id(self) -> str:
        return self.id
    
    # Returns this user's display name
    def get_name(self) -> str:
        return self.name
    
    # Returns this user's profile pictures as a JSON
    def get_profile_pictures(self) -> str:
        return self.profile_pictures
    
    # Returns this user's authentication token
    def get_auth_token(self) -> str:
        return self.auth_token
    
    # Sets this user's authentication token
    def set_auth_token(self, token_info):
        self.auth_token = token_info
    
    # Returns the user as a JSON object
    def serialize(self):
        return {
            "id": self.get_id(),
            "name": self.get_name(),
            "profile_pictures": self.get_profile_pictures()
        }

    def __eq__(self, other):
        return self.id == other.id
    
    def __str__(self):
        return self.name

    def __hash__(self):
        return hash(self.get_id())