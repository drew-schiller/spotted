from flask import Flask, session, request, jsonify, redirect, url_for
from flask_session import Session
from flask_cors import CORS, cross_origin
from decouple import config
from game import Game
from spotify_manager import SpotifyManager

app = Flask("Spotted")
app.secret_key = config("FLASK_SECRET_KEY")
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/')
@cross_origin(supports_credentials=True)
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
    if "manager" not in session:
        session["manager"] = SpotifyManager()
    for u in session["manager"].users.values():
        s += u.get_name() + " "
    return s

@app.route('/api/game_exists', methods=['GET'])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
def add_user():
    """
    Adds a user to the session's Spotify manager, prompting the Spotify authentication page.
    """
    if "manager" not in session:
        session["manager"] = SpotifyManager()

    if "game" in session and session["game"].game_started():
        return 'Cannot add user to a started game'
    return jsonify({
        "url": session["manager"].configure_spotify()
    })

@app.route('/api/callback', methods=['POST'])
@cross_origin(supports_credentials=True)
def callback():
    """
    Do NOT directly call this.

    This function is used as a callback from Spotify's authentication page.
    """

    return jsonify(session["manager"].add_user(request.args["code"]).serialize())

@app.route('/api/remove_user', methods=['POST'])
@cross_origin(supports_credentials=True)
def remove_user():
    """
    Removes a user from the session's game.
    """

    if "manager" in session:
        session["manager"].remove_user(request.args["id"])
    return redirect(url_for('index'))

@app.route('/api/users', methods=['GET'])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
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
        "round_tracks": [],
        "rounds": session["game"].get_rounds()
    }
    for t in session["game"].round_tracks:
        json["round_tracks"].append(t.serialize())
    return jsonify(json)

@app.route('/api/start_game', methods=['POST'])
@cross_origin(supports_credentials=True)
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
    
    for u in session["manager"].users.values():
        for p in u.get_playlists():
            session["game"].add_playlist_tracks(session["manager"].get_spotify(), p['id'])
    session["game"].next_round()

@app.route('/api/create_game', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_game():
    """
    Creates a new game in this session.
    
    Parameters:
        rounds (int): Number of rounds in the game.
        allow_explicit (bool): Allow explicit tracks in the game.

    Returns:
        POST:
            Response: Redirect response object to the game.
    """

    session["game"] = Game(request.args.get("rounds"), request.args.get("allow_explicit"))
    return redirect(url_for('index'))

@app.route('/api/current_track')
@cross_origin(supports_credentials=True)
def current_track():
    """
    Gets the session's game's current track for the round.

    There must be an existing started game otherwise an error message is returned.

    Returns:
        JSON: JSON representation of the track.
    """

    if "game" not in session:
        return 'No game has been created yet'
    if not session["game"].game_started():
        return 'The game has not started yet'

    return jsonify(session["game"].get_current_track().serialize())

@app.route('/api/end_game', methods=['POST'])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
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