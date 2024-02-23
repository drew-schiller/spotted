from flask import Flask, session, request, jsonify, redirect, url_for
from flask_session import Session
from flask_cors import CORS
from decouple import config
from game import Game
from spotify_manager import SpotifyManager
import uuid
from dive.dive import Dive

app = Flask("Spotted")
app.secret_key = config("FLASK_SECRET_KEY")
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/api/')
def index():
    """
    The API index, which shows session status.

    Returns:
        str: Session status.
    """

    s = ""
    if "manager" not in session:
        session["manager"] = SpotifyManager()
    if "game" in session:
        s += "A game is in session and it is "
        if not session["game"].game_started():
            s += "not "
        s += "started."
    else:
        s += "No game is in session."
    s += " Users: "
    for u in session["manager"].users.values():
        s += u.get_name() + " "
    return s

@app.route('/api/current_user', methods=['GET'])
def current_user():
    """
    Gets the Spotify Manager's current user.

    Returns:
        GET:
            JSON: Current user's id.
    """
    if "manager" not in session:
        session["manager"] = SpotifyManager()

    json = {
        "id": session["manager"].get_current_user_id()
    }
    return jsonify(json)

@app.route('/api/set_current_user', methods=['POST'])
def set_current_user():
    """
    Sets the Spotify Manager's current user.

    JSON Body:
        user_id (string): ID of user to set as current.
    """
    if "manager" not in session:
        session["manager"] = SpotifyManager()
        return "No user is authenticated"

    body = request.json
    session["manager"].set_current_user(body["user_id"])
    return redirect(url_for('index'))

@app.route('/api/create_dive', methods=['POST'])
def create_dive():
    """
    Creates a dive for a given user.

    JSON Body:
        user_id (string): The user ID who is creating this dive.
        name (string): The name of this dive.
        base_song_ids (list): List of IDs of the base songs for this dive.

    Returns:
        dive (JSON): JSON representation of the created dive.
    """
    if "manager" not in session:
        session["manager"] = SpotifyManager()
        return "No users are in the session"
    if "dives" not in session:
        session["dives"] = dict()
    
    body = request.json
    user_id = body["user_id"]
    json = {
        "dive": {}
    }
    if session["manager"].get_user_by_id(user_id):
        if user_id not in session["dives"]:
            session["dives"][user_id] = dict()
        dive_id = uuid.uuid4()
        while dive_id in session["dives"][user_id]:
            dive_id = uuid.uuid4()
        dive_id = str(dive_id)
        session["dives"][user_id][dive_id] = Dive(dive_id, body["name"])
        json["dive"] = session["dives"][user_id][dive_id].serialize()

    return jsonify(json)

@app.route('/api/delete_dive', methods=['POST'])
def delete_dive():
    """
    Deletes a dive from the given user.

    JSON Body:
        user_id (string): The user ID who owns the dive.
        dive_id (string): The dive ID to delete.
    """
    if "manager" not in session:
        session["manager"] = SpotifyManager()
        return "No users are in the session"
    if "dives" not in session:
        session["dives"] = dict()
        return "There are no dives in the session"
    
    body = request.json
    user_id = body["user_id"]
    dive_id = body["dive_id"]
    if user_id not in session["dives"]:
        return "User has not made any dives"
    if dive_id not in session["dives"][user_id]:
        return "User does not have given dive"
    session["dives"][user_id].pop(dive_id)
    return "Dive successfully deleted"

@app.route('/api/get_current_dives', methods=['GET'])
def get_current_dives():
    """
    Gets a list of dives for the current authenticated user.

    Returns:
        GET:
            dives (list): List of dives for the user if present.
            dive_count (int): Number of dives the user has.
            user_present (bool): Whether the user is in this session.

    """
    if "manager" not in session:
        session["manager"] = SpotifyManager()
        return "No user is authenticated"
    if "dives" not in session:
        session["dives"] = dict()
    
    user_id = session["manager"].get_current_user_id()
    user_present = user_id in session["dives"]
    json = {
        "dives": [],
        "dive_count": 0,
        "user_present": user_present
    }
    if user_present:
        for uuid in session["dives"][user_id]:
            json["dives"].append(session["dives"][user_id][uuid].serialize())
            json["dive_count"] += 1

    return jsonify(json)

@app.route('/api/game_exists', methods=['GET'])
def game_exists():
    """
    Gets whether there is a game in the session.

    Returns:
        GET:
            JSON: Whether a game exists or not.
    """
    json = {
        "flag": ("game" in session)
    }
    return jsonify(json)

@app.route('/api/game_started', methods=['GET'])
def game_started():
    """
    Gets whether the session's game is started.

    There must be an existing game otherwise an error message is returned.

    Returns:
        GET:
            JSON: Whether the game is started or not.
    """
    if "game" not in session:
        return "No game has been created yet"

    return jsonify({
        "flag": session["game"].game_started()
    })

@app.route('/api/add_user', methods=['POST'])
def add_user():
    """
    Adds a user to the session's Spotify manager, prompting the Spotify authentication page.
    """
    if "manager" not in session:
        session["manager"] = SpotifyManager()

    return jsonify({
        "url": session["manager"].configure_spotify()
    })

@app.route('/api/callback', methods=['POST'])
def callback():
    """
    Do NOT directly call this.

    This function is used as a callback from Spotify's authentication page.
    """

    return jsonify(session["manager"].add_user(request.args["code"]).serialize())

@app.route('/api/remove_user', methods=['POST'])
def remove_user():
    """
    Removes a user from the session's game.
    """

    if "manager" in session:
        session["manager"].remove_user(request.args["id"])
    return redirect(url_for('index'))

@app.route('/api/users', methods=['GET'])
def users():
    """
    Gets the users in the session's Spotify manager.

    Returns:
        GET:
            JSON: List of users in the manager.
    """
    
    json = {
        "users": [],
        "count": 0
    }
    if "manager" not in session:
        session["manager"] = SpotifyManager()
    for u in session["manager"].users.values():
        json["users"].append(u.serialize())
        json["count"] += 1
    return jsonify(json)

@app.route('/api/game_data', methods=['GET'])
def game_data():
    """
    Gets the data for the game in this session.

    There must be an existing game otherwise an error message is returned.

    Returns:
        GET:
            JSON: Game data.
    """

    if "game" not in session:
        return "No game has been created yet"
    
    json = {
        "item_type": session["game"].get_item_type(),
        "gamemode": session["game"].get_gamemode(),
        "round_items": [],
        "rounds": session["game"].get_rounds()
    }
    for t in session["game"].round_items:
        json["round_items"].append(session["game"].get_item_by_id(t).serialize())
    return jsonify(json)

@app.route('/api/start_game', methods=['POST'])
def start_game():
    """
    Starts the game in the session.

    There must be an existing unstarted game otherwise an error message is returned.

    Returns:
        POST:
            Response: Redirect response object to the game.
    """
    if "game" not in session:
        return "No game has been created yet"
    if session["game"].game_started():
        return "The game has already been started"
    
    session["game"].next_round()

@app.route('/api/create_game', methods=['POST'])
def create_game():
    """
    Creates a new game in this session.
    
    JSON Body:
        settings:
            allow_explicit (bool): Whether to allow explicit tracks in the game.
            rounds (int): Number of rounds in the game.
        users:
            user_id (string): ID of the user whose tracks will be added.
                saved_tracks (bool): Whether or not the user's saved tracks will be included.
                playlists (list): List of playlists IDs owned by this user to include.

    Returns:
        POST:
            Response: Redirect response object to the game.
    """

    body = request.json
    session["game"] = Game(body['item_type'], body['gamemode'], body['settings'])
    for user in body['users']:
        session["manager"].set_current_user(user)
        if (body['users'][user]['saved_tracks']):
            session["game"].add_saved_tracks(session["manager"])
        for p in body['users'][user]['playlists']:
            session["game"].add_playlist_tracks(session["manager"], p)
        
    session["game"].reset_round_items() # temporary to preset the round tracks
    return redirect(url_for('index'))

@app.route('/api/current_item')
def current_item():
    """
    Gets the session's game's current item for the round.

    There must be an existing started game otherwise an error message is returned.

    Returns:
        JSON: JSON representation of the item.
    """

    if "game" not in session:
        return 'No game has been created yet'
    if not session["game"].game_started():
        return 'The game has not started yet'

    return jsonify(session["game"].get_current_item().serialize())

@app.route('/api/end_game', methods=['POST'])
def end_game():
    """
    Ends the session's game.

    Returns:
        Response: Redirect response object to the index.
    """

    if "game" in session:
        session["game"].end_game()
        session.pop("game", None)
    return redirect(url_for('index'))

@app.route('/api/next_round')
def next_round():
    """
    Advances the session's game to the next round, or ends it it is the last round.

    There must be an existing game otherwise an error message is returned.

    Returns:
        JSON: JSON representation of the new current track.
    """

    if "game" not in session:
        return 'No game has been created yet'
    
    session["game"].next_round()
    return redirect(url_for('current_track'))

if __name__ == "__main__":
    app.run(debug=True)