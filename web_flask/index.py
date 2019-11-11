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
    request_conections = get_conections(text, limit)
    request_user = id(text)
    angle = 360 / limit
    angle2 = 30
    principal = {}
    secondary = {}
    data = {}
    create_dict(principal, request_user, "self", angle)

    i = 1
    for conection in request_conections:
        create_dict(principal, conection, request_user, angle, i)
        i += 1
        conections_conection = get_conections(conection["person"]["publicId"], limit - 3)
        j = 1
        for conect in conections_conection:
            create_dict(secondary, conect, conection, angle2, j)
            j += 1
    print(request_conections)
    print(request_user)
    print("principal")
    print(principal)
    print("secondary")
    print(secondary)
    return json.dumps([principal, secondary])

def get_conections(user_id, limit):
    url_conect = "https://bio.torre.co/api/people/{}/connections?limit={}".format(user_id, limit)
    return get(url_conect).json()

def create_dict(dictionary, user, father, angle, i=0):
    data = {}
    data["name"] = user["person"]["name"]
    data["id"] = user["person"]["publicId"]
    try:
        data["img"] = user["person"]["picture"]
    except:
        pass
    if father == "self":
        data["posx"] = 0
        data["posy"] = 0
        data["related_to"] = "self"
    else:
        data["posx"] = math.cos(math.radians(angle * i))
        data["posy"] = math.sin(math.radians(angle * i))
        data["related_to"] = father["person"]["publicId"]
    data["angle"] = angle
    print("data[id]")
    print(data["id"])
    dictionary[data["id"]] = data.copy()

app.debug = True
app.run(host='0.0.0.0', port=5000)
app.url_map.strict_slashes = False
