#!/usr/bin/python3
"""main module of the app"""

from flask import Flask, render_template, abort
from requests import get
import json
import math

app = Flask(__name__)

@app.route('/')
def index():
    """ start point of the app """
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
    print(request.status_code)
    if request.status_code != 200:
        abort(404, 'Not Found')
    return request.json()

@app.route('/key/<text>')
def key(text):
    """ function that recieve a key to search in the torre api
        and return a list of coincidences
    """
    url = "https://bio.torre.co/api/people?q={}&limit=10".format(text)
    request = get(url)
    print(request.json())
    if request.status_code != 200 or len(request.json()) < 1:
        abort(404, 'Not Found')
    return json.dumps(request.json())

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
    return json.dumps([principal, secondary])

def get_conections(user_id, limit):
    """ function that get the conections of an user given the id
    """
    url_conect = "https://bio.torre.co/api/people/{}/connections?limit={}".format(user_id, limit)
    request = get(url_conect)
    if request.status_code != 200:
        abort(404, 'Not Found')
    return request.json()

def create_dict(dictionary, user, father, angle, i=0):
    """ handle the data to given by the conections to prepare
        for javascript draw
    """
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
    dictionary[data["id"]] = data.copy()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    app.url_map.strict_slashes = False
