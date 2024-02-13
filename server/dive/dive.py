import networkx as nx

class Dive(object):

    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name
        self.color = "#ffffff"
        self.popularity = 1.00

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "popularity": self.popularity
        }