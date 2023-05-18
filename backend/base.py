from flask import Flask, session, request, make_response, jsonify, redirect, url_for
import jwt
from datetime import datetime, timedelta
from functools import wraps
import json
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import pandas as pd



api = Flask(__name__)
api.config['SECRET_KEY'] = 'e66f9d380e9843b795ca45c5d9e5835c'
CORS(api)

api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mnt/home/sulaiha-shameena/Desktop/react_capstone/flask_react/database.db'
db = SQLAlchemy(api)

conn = sqlite3.connect('/home/sulaiha-shameena/Desktop/react_capstone/flask_react/database.db')
df = pd.read_csv('students.csv')
print(df.head(3))
print("col",df.columns)
print("types", df.dtypes)


df.to_sql(
    name='table1',
    con=conn,
    if_exists='replace',
    index=False,
    dtype={
        'Unnamed: 0' : 'real',
        'Gender' : 'text',
        'EthnicGroup' : 'text',
        'ParentEduc' : 'text',
        'LunchType' : 'text',
        'TestPrep' : 'text',
        'ParentMaritalStatus' : 'text',
        'PracticeSport' : 'text',
        'IsFirstChild' : 'text',
        'NrSiblings' : 'real',
        'TransportMeans' : 'text',
        'WklyStudyHours' : 'text',
        'MathScore' : 'real',
        'ReadingScore' : 'real',
        'WritingScore' : 'real'
   }
)

def connectDB():
    conn = sqlite3.connect('/home/sulaiha-shameena/Desktop/react_capstone/flask_react/database.db')
    return conn

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print("====", request/args)
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
    return "home"
    '''
    if not session['logged_in']:
        return 'Login'
    else:
        return 'Loggedin already'
    '''

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


@api.route('/totalGenderCount')
def getStudentData():
    conn = connectDB()
    totalCount = conn.execute('SELECT COUNT(*) FROM table1').fetchall()
    conn.close()
    return totalCount


@api.route('/genderDataMale')
def getGenderDataMale():
    conn = connectDB()
    totalCount = conn.execute('SELECT COUNT(*) FROM table1 WHERE Gender = "male"').fetchall()
    conn.close()
    return totalCount

@api.route('/genderDataFemale')
def getGenderDataFemale():
    conn = connectDB()
    totalCount = conn.execute('SELECT COUNT(*) FROM table1 WHERE Gender = "female"').fetchall()
    conn.close()
    return totalCount


@api.route('/dataByEthnicGroup', methods=['POST'])
def getDataByEthnicGroup():
    print("request", request.json)

    grouptype = request.json['ethnicGroup']
    conn = connectDB()
    totalCount = conn.execute(f'SELECT COUNT(*) FROM table1 WHERE EthnicGroup = "{grouptype}"').fetchall()
    print('getDataByEthnicGroup', totalCount)
    conn.close()
    return totalCount

@api.route('/scoreByRange', methods=['POST'])
def getScoreByRange():
    print("request", request.json)
    range = ">=" if (request.json['req_range'] == '1') else '<='
    mark = request.json['req_mark']
    conn = connectDB()
    totalCount = conn.execute(f'SELECT Gender, EthnicGroup, ParentMaritalStatus, MathScore FROM table1 WHERE MathScore  {range} "{mark}"').fetchall()
    print('scoreByRange', totalCount)
    conn.close()
    return totalCount