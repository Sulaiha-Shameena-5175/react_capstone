from flask import Flask, session, request, make_response, jsonify, redirect, url_for
import jwt
from datetime import datetime, timedelta
from functools import wraps
import json
from flask_cors import CORS, cross_origin

api = Flask(__name__)
api.config['SECRET_KEY'] = 'e66f9d380e9843b795ca45c5d9e5835c'
CORS(api)

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request/args.get('token')
        if not token:
            return jsonify({'Alert!': 'Token is missing'})
        try:
            payload = jwt.decode(token, api.config['SECRET_KEY'])
        except:
            return jsonify({'Alert!': 'Token is missing'})
    return decorated


@api.route('/profile')
def my_profile():
    response_body = {
        "name" : "gaz"
    }
    return response_body

@api.route('/')
def home():
    if not session['logged_in']:
        return 'Login'
    else:
        return 'Loggedin already'

@api.route('/public')
def public():
    return 'For Public'

@api.route('/auth')
@token_required
def auth():
    return 'JWT is verified. Welcome to your dashboard'

@api.route('/login', methods=['POST'])
@cross_origin()
def login():
    print("request", request.data, request.json)

    if request.json['email'] and request.json['password'] == '1234':
        session['logged_in'] = True
        token = jwt.encode({
            'user' : request.json['email'],
            'expiration' : str(datetime.utcnow() + timedelta(seconds=120))
        },api.config['SECRET_KEY'])
        return jsonify({'token': token})
    else:
        return make_response('Unable to verify', 403, { 'WWW-Authenticate': 'Basic realm:"Authentication failed!"' })

    return "Login success"

@api.route('/dashboard', methods=['POST'])
def handleDashboard():
    return 'dashboard'