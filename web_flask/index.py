#!/usr/bin/python3
"""main module of the app"""

from flask import Flask, render_template
from requests import get


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/id/<text>')
def id(text):
    """ function that recieve an id and send to the torre api to
        return the information as a json
    """
    url = "https://bio.torre.co/api/bios/{}".format(text)
    request = get(url)
    #print(request.json())
    return request.json()


app.debug = True
app.run(host='0.0.0.0', port=5000)
app.url_map.strict_slashes = False
