#!/usr/bin/env python3
"""
Here the module description file
"""
from flask import Flask, render_template, request
from flask_babel import Babel
from config import Config


def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app, locale_selector=get_locale)


@app.route("/")
def index():
    """ Here the initial root target """
    return render_template("0-index.html")
