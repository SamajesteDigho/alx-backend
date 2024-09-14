#!/usr/bin/env python3
"""
Here the module description file
"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """ Babel configuraion class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = 'UTC'


def get_locale():
    """ Get the local """
    lang = request.args.get('locale')
    print("Language")
    if lang:
        return lang
    return request.accept_languages.best_match(app.config['LANGUAGES'])


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app, locale_selector=get_locale)


@app.route("/")
def index():
    """ Here the initial root target """
    return render_template("4-index.html")
