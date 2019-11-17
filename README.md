![N|Solid](https://miro.medium.com/max/567/1*ngG0t_XJvzMop2GhZammKw.png)
# Torre Test!
This project use the api of torre.co with this endpoints:
- GET https://torre.bio/api/bios/$username (gets bio information of $username)
- GET https://torre.bio/api/people/$username/connections?[q=$query&limit=$limit] (lists people sorted by connection degrees relative to $username) 
- GET https://torre.bio/api/people?[q=$query&limit=$limit] (lists people sorted by connection degrees relative to $username) 
## What its does?
Given these endpoints, an flask aplication was builded to retrieve this endpoints and rederised with jinja2, javascript and css.
1. With the first end point, we can get the user information (the profesional headline, a picture, the name and the torre weight)
2. With the second, if we dont have the id of the user, we can pud the name, and the app will shows a list with the first 10 user, in order that we can see the previous information clicking a member of the list.
3. Finally, with the third one, we can see the pictures of the connection of a given user, shown in a node representation.
### How to use
You can visit the app with this link: https://torre-test-miguel.herokuapp.com/
Or clone this repository and run in local:
1. You have to get installed python 3.4 at least
2. Run this command to install the requirements:
```sh
$ pip3 install -r requirements.txt
```
3. Then, you can run locally as developing enviroment with:
```sh
$ python3 -m web_flask.index
```
4. Or run with gunicorn, to production:
```sh
$ gunicorn web_flask.index:app
```
