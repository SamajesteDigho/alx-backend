#!/usr/bin/env python3
"""
Here the module description file
"""
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """ Babel configuraion class """
    LANGUAGES = ["en", "fr"]
    TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route("/")
def index():
    """ Here the initial root target """
    return render_template("1-index.html")
