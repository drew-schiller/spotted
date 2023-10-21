from flask import Flask, session, request, abort, redirect, url_for
from flask_session import Session
from decouple import config
from game import Game

app = Flask("Spotted")
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = config("FLASK_SECRET_KEY")
Session(app)

@app.route('/api/')
def index():
    """
    The API index, which shows session status.

    Returns:
        str: Session status.
    """

    s = ""
    if "game" in session:
        s += "A game is in session and it is "
        if not session["game"].game_started():
            s += "not "
        s += "started. Users: "
        for u in session["game"].get_manager().users.values():
            s += u.get_name() + " "
    else:
        s += "No game is in session."
    return s

@app.route('/api/add_user')
def add_user():
    """
    Adds a user to the session's game, prompting the Spotify authentication page.

    There must be an existing unstarted game otherwise an error message is returned.

    """

    if "game" not in session:
        return 'No game has been created yet'
    if session["game"].game_started():
        return 'Cannot add user to a started game'
    
    return redirect(session["game"].get_manager().configure_spotify())

@app.route('/api/callback', methods=['GET', 'POST'])
def callback():
    """
    Do NOT directly call this.

    This function is used as a callback from Spotify's authentication page.
    """

    session["game"].get_manager().add_user(request.args["code"])
    return redirect(url_for('index'))

@app.route('/api/remove_user', methods=['GET', 'POST'])
def remove_user():
    """
    Removes a user from the session's game.

    There must be an existing game otherwise an error message is returned.

    """

    if "game" not in session:
        return 'No game has been created yet'

    if request.method == 'POST':
        session["game"].get_manager().remove_user(request.args["id"])
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input type="submit" value=Remove>
        </form>
    '''

@app.route('/api/user_playlists', methods=['GET', 'POST'])
def user_playlists():
    """
    Gets the authenticated user's playlists.

    There must be an existing game otherwise an error message is returned.

    Returns:
        JSON: JSON list of all playlists created by the user.
    """

    if "game" not in session:
        return 'No game has been created yet'
    
    return session["game"].get_manager().get_playlists() 

@app.route('/api/create_game', methods=['GET', 'POST'])
def create_game():
    """
    Creates a new game in this session.
    
    Parameters:
        rounds (int): Number of rounds in the game.
        allow_explicit (bool): Allow explicit tracks in the game.

    Returns:
        GET:
            HTML: Form to input game settings.
        POST:
            Response: Redirect response object to the game.
    """

    if request.method == 'POST':
        session["game"] = Game(int(request.args["rounds"]), bool(request.args["allow_explicit"]))
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input type="submit" value=Create>
        </form>
    '''

@app.route('/api/current_track')
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

    return session["game"].get_current_track().serialize()

@app.route('/api/end_game')
def end_game():
    """
    Ends the session's game.

    There must be an existing game otherwise an error message is returned.

    Returns:
        Response: Redirect response object to the index.
    """

    if "game" not in session:
        return 'No game has been created yet'
    
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