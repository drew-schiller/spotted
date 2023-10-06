class User(object):

    def __init__(self, user_json):
        self.id = str(user_json['id'])
        self.name = str(user_json['display_name'])
    
    # Returns this user's id
    def get_id(self) -> str:
        return self.id
    
    # Returns this user's display name
    def get_name(self) -> str:
        return self.name

    def __eq__(self, other):
        return self.id == other.id
    
    def __str__(self):
        return self.name

    def __hash__(self):
        return hash(self.get_id())