from abc import ABC, abstractmethod

class SpotifyUnit(ABC):

    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name

    def get_id(self) -> str:
        """
        Gets the ID of this unit.

        Returns:
            str: ID of this unit.
        """

        return self.id

    def get_name(self) -> str:
        """
        Gets the name of this unit.

        Returns:
            str: Name of this unit.
        """

        return self.name

    @abstractmethod
    def serialize(self):
        """
        Returns this unit as a serialized JSON object.

        Returns:
            JSON: Serialized JSON of this unit.
        """
        pass

    def __eq__(self, other):
        return self.id == other.id
    
    def __str__(self):
        return self.name

    def __hash__(self):
        return hash(self.get_id())