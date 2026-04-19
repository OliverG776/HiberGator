import importlib
import re
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

try:
    certifi = importlib.import_module('certifi')
except ImportError:
    certifi = None


MONGO_URI = 'mongodb+srv://parkercolby_db_user:Zdqx3XiFtWmxijoj@hibergator.8ngplxl.mongodb.net/'

ADMIN_KEY = 'NeverShareThisKey'

def get_user_collection():
    client_options = {
        'serverSelectionTimeoutMS': 5000,
        'tls': True,
    }

    if certifi is not None:
        client_options['tlsCAFile'] = certifi.where()

    client = MongoClient(MONGO_URI, **client_options)
    client.admin.command('ping')
    db = client['Sleep_Tracker']
    return db['username/password']

@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)

        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)
        
        if not check_proper_username(username):
            return JsonResponse({'error': 'Username must be at least 5 characters'}, status=400)
        
        if not check_proper_password(password):
            return JsonResponse({'error': 'Password must be at least 6 characters, contain at least 3 digits and one special character'}, status=400)
        
        try:
            collection = get_user_collection()
            if collection.find_one({'username': username}) or get_admin_collection().find_one({'username': username}):
                return JsonResponse({'error': 'Username already exists'}, status=400)

            insert_user(username, password)
            return JsonResponse({'message': 'Account created successfully'}, status=201)
        except PyMongoError as e:
            error_message = str(e)
            if 'SSL handshake failed' in error_message:
                return JsonResponse(
                    {
                        'error': 'Database TLS connection failed. Check MongoDB Atlas network access, credentials, and local Python TLS support.'
                    },
                    status=500,
                )
            return JsonResponse({'error': f'Database error: {error_message}'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def check_user_existence(username, password):
    collection = get_user_collection()
    user_existence = collection.find_one({'username': username})
    admin_existence = get_admin_collection().find_one({'username': username})

    if user_existence is None and check_proper_username(username) and check_proper_password(password):
        insert_user(username, password)
        return True
    elif admin_existence is None and check_proper_username(username) and check_proper_password(password):
        insert_admin(username, password)
        return True
    else:
        return False

def check_proper_username(username):
    return len(username)>=5

def check_proper_password(password):
   valid = r'^(?=(?:.*\d){3,})(?=.*[^A-Za-z0-9]).{6,}$'
   return re.match(valid, password)

def check_login_credentials(username, password):
    collection = get_user_collection()
    result = collection.find_one({'username': username, 'password': password})

    return result


def insert_user(username, password):
    collection = get_user_collection()
    result = collection.insert_one({"username": username, "password": password})

def get_admin_collection():
    client_options = {
        'serverSelectionTimeoutMS': 5000,
        'tls': True,
    }

    if certifi is not None:
        client_options['tlsCAFile'] = certifi.where()

    client = MongoClient(MONGO_URI, **client_options)
    client.admin.command('ping')
    db = client['Sleep_Tracker']
    return db['Admin']

def insert_admin(username, password):
    collection = get_admin_collection()
    result = collection.insert_one({"username": username, "password": password})

def check_admin(username, password, admin_key):
   collection = get_admin_collection()
   admin_existence = collection.find_one({'username': username})
   return admin_existence is None and check_proper_username(username) and check_proper_password(password) and admin_key == ADMIN_KEY
    
@csrf_exempt
def create_admin_account(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)

        username = data.get('username')
        password = data.get('password')
        admin_key = data.get('admin_key')
        
        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)
        
        if not check_proper_username(username):
            return JsonResponse({'error': 'Username must be at least 5 characters'}, status=400)
        
        if not check_proper_password(password):
            return JsonResponse({'error': 'Password must be at least 6 characters, contain at least 3 digits and one special character'}, status=400)
        
        if admin_key != ADMIN_KEY:
            return JsonResponse({'error': 'Invalid admin key'}, status=403)

        try:
            collection = get_user_collection()
            admin_collection = get_admin_collection()
            if collection.find_one({'username': username}):
                return JsonResponse({'error': 'Username already exists'}, status=400)
            if admin_collection.find_one({'username': username}):
                return JsonResponse({'error': 'Username already exists'}, status=400)

            insert_admin(username, password)
            return JsonResponse({'message': 'Account created successfully'}, status=201)
        except PyMongoError as e:
            error_message = str(e)
            if 'SSL handshake failed' in error_message:
                return JsonResponse(
                    {
                        'error': 'Database TLS connection failed. Check MongoDB Atlas network access, credentials, and local Python TLS support.'
                    },
                    status=500,
                )
            return JsonResponse({'error': f'Database error: {error_message}'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)

        if get_admin_collection().find_one({'username': username, 'password': password}) or get_user_collection().find_one({'username': username, 'password': password}):
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=401)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)