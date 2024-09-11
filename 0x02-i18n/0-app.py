#!/usr/bin/env python3
"""
Here the module description file
"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    """ Here the initial root target """
    return render_template("0-index.html")
