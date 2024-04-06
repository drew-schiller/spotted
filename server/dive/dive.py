class Dive(object):

    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name
        self.color = "#ffffff"
        self.precision = 1.00
        self.queue = []
        self.seed_tracks = set()

    def get_seed_tracks(self):
        return self.seed_tracks
    
    def add_tracks_to_queue(self, tracks: list[str]):
        for t in tracks:
            self.queue.append(t)

    def serialize(self):
        json =  {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "precision": self.precision,
            "queue": []
        }
        for t in self.queue:
            json["queue"].append(t)
        return json