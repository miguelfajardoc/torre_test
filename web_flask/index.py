#!/usr/bin/python3
"""main module of the app"""

from flask import Flask, render_template
from requests import get
import json
import math

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/node')
def node():
    """ return a template of nodes.html """
    return render_template('nodes.html')

@app.route('/id/<text>')
def id(text):
    """ function that recieve an id and send to the torre api to
        return the information as a json
    """
    url = "https://bio.torre.co/api/bios/{}".format(text)
    request = get(url)
    #print(request.json())
    return request.json()

@app.route('/key/<text>')
def key(text):
    """ function that recieve a key to search in the torre api
        and return a list of coincidences
    """
    url = "https://bio.torre.co/api/people?q={}&limit=10".format(text)
    request = get(url).json()
    print(json.dumps(request))
    return json.dumps(request)

@app.route('/conections/<text>')
def conections(text):
    """ recive the id of an user, ask for the conections and
        return the information to draw the nodes
    """
    limit = 6
    url_conect = "https://bio.torre.co/api/people/{}/connections?limit={}".format(text, limit)
    request_conections = get(url_conect).json()
    request_user = id(text)
    angle = 360 / limit
    principal = {}
    secondary = {}
    data = {}
    data["name"] = request_user["person"]["name"]
    data["id"] = request_user["person"]["publicId"]
    data["img"] = request_user["person"]["picture"]
    data["posx"] = 300
    data["posy"] = 200
    data["related_to"] = "self"
    data["angle"] = angle
    principal[data["id"]] = data
    i = 1
    for conection in request_conections:
        data["name"] = conection["person"]["name"]
        data["id"] = conection["person"]["publicId"]
        try:
            data["img"] = conection["person"]["picture"]
        except:
            pass

        data["posx"] = math.cos(math.radians(angle * i))
        data["posy"] = math.sin(math.radians(angle * i))
        data["related_to"] = request_user["person"]["publicId"]
        data["angle"] = angle
        principal[data["id"]] = data

    print(request_conections)
    print(request_user)
    print("principal")
    print(principal)
    return json.dumps(request_conections)


app.debug = True
app.run(host='0.0.0.0', port=5000)
app.url_map.strict_slashes = False
