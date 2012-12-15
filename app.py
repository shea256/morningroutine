import os
from flask import Flask, render_template, send_from_directory, Response, url_for, request
import json

#----------------------------------------
# initialization
#----------------------------------------

app = Flask(__name__)

app.config.update(
	DEBUG = True,
)

app.config["SECRET_KEY"] = '791c0cde80f7940729fbfa084f30fc6156d7bdbf8edd15bb'

#----------------------------------------
# api
#----------------------------------------

import time
from bson import objectid

@app.route("/api/users")
def get_users():
	with open('users.json', 'r') as f:
		data = json.loads(f.read())
	users = []
	for id, user in data.items():
		users.append(user)
	return Response(json.dumps(users), status=200, mimetype='application/json')

@app.route("/api/user/<id>", methods=['GET', 'PUT', 'DELETE'])
def get_user(id):
	filename = 'users.json'
	with open(filename, 'r') as f:
		users = json.loads(f.read())
	if request.method == 'GET':
		if id in users:
			user = users[id]
		else:
			return Response(json.dumps({ 'error': "user doesn't exist" }), status=404, mimetype='application/json')
		return Response(json.dumps(user), status=200, mimetype='application/json')
	elif request.method == 'PUT':
		if id not in users:
			users[id] = { 'id': id }
		if 'name' in request.values:
			users[id]['name'] = request.values.get('name')
		if 'items' in request.values:
			users[id]['items'] = json.loads(request.values.get('items'))
		with open(filename, 'w') as f:
			f.write(json.dumps(users))
		return Response(json.dumps({ 'success': 1 }), status=200, mimetype='application/json')
	elif request.method == 'DELETE':
		del users[id]
		with open(filename, 'w') as f:
			f.write(json.dumps(users))
		return Response(json.dumps({ 'success': 1 }), status=200, mimetype='application/json')
	else:
		return Response(json.dumps({ 'error': "method not allowed" }), status=405, mimetype='application/json')

@app.route("/api/items")
def get_items():
	with open('items.json', 'r') as f:
		users = json.loads(f.read())
	items = []
	for id, item in users.items():
		items.append(item)
	return Response(json.dumps(items), status=200, mimetype='application/json')

@app.route("/api/item", methods=['POST'])
def create_item():
	filename = 'items.json'
	with open(filename, 'r') as f:
		items = json.loads(f.read())

	data = request.json
	if 'content' not in data or 'type' not in data:
		return Response(json.dumps({ 'error': "incorrect parameters" }), status=400, mimetype='application/json')

	id = str(objectid.ObjectId())

	content = data['content']
	type = data['type']
	author = data['author']
	item = { "id": id, "content": content, "type": type, "author": author }
	items[id] = item
	with open(filename, 'w') as f:
		f.write(json.dumps(items))

	return Response(json.dumps(item), status=200, mimetype='application/json')


@app.route("/api/item/<id>", methods=['GET', 'PUT', 'DELETE'])
def get_item(id):
	filename = 'items.json'
	with open(filename, 'r') as f:
		items = json.loads(f.read())
	if request.method == 'GET':
		if id in items:
			item = items[id]
		else:
			return Response(json.dumps({ 'error': "item doesn't exist" }), status=404, mimetype='application/json')
		return Response(json.dumps(item), status=200, mimetype='application/json')
	elif request.method == 'PUT':
		data = json.loads(request.data)
		if id not in items:
			items[id] = { 'id': id }
		if 'content' in data:
			items[id]['content'] = data.get('content')
		if 'type' in data:
			items[id]['type'] = data.get('type')
		with open(filename, 'w') as f:
			f.write(json.dumps(items))
		return Response(json.dumps({ 'success': 1 }), status=200, mimetype='application/json')
	elif request.method == 'DELETE':
		del items[id]
		with open(filename, 'w') as f:
			f.write(json.dumps(items))
		return Response(json.dumps({ 'success': 1 }), status=200, mimetype='application/json')
	else:
		return Response(json.dumps({ 'error': "method not allowed" }), status=405, mimetype='application/json')

"""@app.route("/api/routines")
def get_routines():
	with open('routines.json', 'r') as f:
		data = json.loads(f.read())
	routines = []
	for id, routine in data.items():
		routine['id'] = id
		routines.append(routine)
	return Response(json.dumps(routines), status=200, mimetype='application/json')

@app.route("/api/routine/<routine_id>", methods=['GET', 'PUT', 'DELETE'])
def get_routine(routine_id):
	with open('routines.json', 'r') as f:
		data = json.loads(f.read())
	if request.method == 'GET':
		if routine_id in data:
			routine = data[routine_id]
		else:
			return Response(json.dumps({ 'error': "routine doesn't exist" }), status=404, mimetype='application/json')
		return Response(json.dumps(routine), status=200, mimetype='application/json')
	elif request.method == 'PUT':
		print request.values
		# data[routine_id] = 
		with open('routines.json', 'w') as f:
			f.write(json.dumps(data))
		return Response(json.dumps({ "success": 1 }), status=200, mimetype='application/json')
	elif request.method == 'DELETE':
		del data[routine_id]
		with open('routines.json', 'w') as f:
			f.write(json.dumps(data))
		return Response(json.dumps({ "success": 1 }), status=200, mimetype='application/json')"""

#----------------------------------------
# controllers
#----------------------------------------

@app.route("/")
def index():
	return render_template('app.html')

@app.route("/routine")
def view_routine():
	return render_template('app.html')

@app.route("/routine/edit")
def edit_routine():
	return render_template('app.html')

#----------------------------------------
# handlers
#----------------------------------------

@app.route('/favicon.ico')
def favicon():
	return send_from_directory(os.path.join(app.root_path, 'static'), 'ico/favicon.ico')

#----------------------------------------
# launch
#----------------------------------------

if __name__ == "__main__":
	port = int(os.environ.get("PORT", 5000))
	app.run(host='0.0.0.0', port=port)