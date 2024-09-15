#!/usr/bin/env python3
"""
Here the module description file
"""
from typing import Dict, Union
from flask import Flask, render_template, request, g, session
from flask_babel import Babel


class Config:
    """ Babel configuraion class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = 'UTC'


def get_locale() -> str:
    """ Get the local """
    lang = request.args.get('locale')
    if lang:
        locale = lang
    elif g.user:
        locale = g.user['locale']
    elif request.accept_languages.best_match(app.config['LANGUAGES']):
        locale = request.accept_languages.best_match(app.config['LANGUAGES'])

    if locale in app.config['LANGUAGES']:
        return locale
    else:
        return app.config['BABEL_DEFAULT_LOCALE']


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app, locale_selector=get_locale)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(login_as: int = None) -> Union[Dict, None]:
    """ Getting the user """
    global users
    if login_as in users.keys():
        return users[login_as]
    return None


@app.before_request
def before_request():
    """ Processed before processing the request """
    id = request.args.get('login_as', type=int)
    user = get_user(login_as=id)
    g.setdefault(name="user", default=user)


@app.route("/")
def index():
    """ Here the initial root target """
    return render_template("5-index.html")
