import importlib
import re
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime

try:
    certifi = importlib.import_module('certifi')
except ImportError:
    certifi = None


MONGO_URI = 'mongodb+srv://parkercolby_db_user:Zdqx3XiFtWmxijoj@hibergator.8ngplxl.mongodb.net/'

ADMIN_KEY = 'NeverShareThisKey'
DELETE_KEY = 'NeverShareThisKeyEither'
UPDATE_KEY = "DefinitelyDon'tShareThisKey"

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

        if get_admin_collection().find_one({'username': username, 'password': password}):
            return JsonResponse({'message': 'Admin Login successful', 'role': 'admin'}, status=200)
        elif get_user_collection().find_one({'username': username, 'password': password}):
            return JsonResponse({'message': 'Login successful', 'role': 'user'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=401)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def collect_all_users(request):
    if request.method == 'GET':
        try:
            collection = get_user_collection()
            usernames = list(collection.find({}, {'username': 1}))
            
            users = []
            for user in usernames:
                users.append({'id': str(user['_id']), 'username': user['username']})

            return JsonResponse({'users': users}, status=200)
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
def delete_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)

        username = data.get('username')
        admin_key = data.get('admin_key')
        if admin_key != DELETE_KEY:
            return JsonResponse({'error': 'Invalid admin key'}, status=403)
        if not username:
            return JsonResponse({'error': 'Username required'}, status=400)

        if not admin_key:
            return JsonResponse({'error': 'Admin key required'}, status=400)

        try:
            collection = get_user_collection()
            result = collection.delete_one({'username': username})
            if result.deleted_count == 0:
                return JsonResponse({'error': 'User not found'}, status=404)
            return JsonResponse({'message': 'User deleted successfully'}, status=200)
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
def change_user_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)

        username = data.get('username')
        new_password = data.get('new_password')
        admin_key = data.get('admin_key')

        if admin_key != UPDATE_KEY:
            return JsonResponse({'error': 'Invalid admin key'}, status=403)
        
        if not username or not new_password:
            return JsonResponse({'error': 'Username and new password required'}, status=400)
        
        if not check_proper_password(new_password):
            return JsonResponse({'error': 'Password must be at least 6 characters, contain at least 3 digits and one special character'}, status=400)
        
        if new_password == get_user_collection().find_one({'username': username}, {'password': 1})['password']:
            return JsonResponse({'error': 'New password cannot be the same as the old password'}, status=400)
            
        try:
            collection = get_user_collection()
            result = collection.update_one({'username': username}, {'$set': {'password': new_password}})
            if result.matched_count == 0:
                return JsonResponse({'error': 'User not found'}, status=404)
            return JsonResponse({'message': 'Password changed successfully'}, status=200)
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
def update_profile(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            
            collection = get_user_collection()
            user = collection.find_one({'username': username})

            updated_values = {}

            if 'age' in data:
                updated_values['age'] = data['age']
            if 'sex' in data:
                updated_values['sex'] = data['sex']
            if 'weight' in data:
                updated_values['weight'] = data['weight']
            if 'height' in data:
                updated_values['height'] = data['height']

            if 'new_password' in data and data.get('new_password'):
                new_password = data['new_password']
                if not check_proper_password(new_password):
                    return JsonResponse({'error': 'Password must be at least 6 characters, contain at least 3 digits and one special character'}, status=400)
                if new_password == user['password']:
                    return JsonResponse({'error': 'New password cannot be the same as the old password'}, status=400)
                updated_values['password'] = new_password
            
            if not updated_values:
                return JsonResponse({'error': 'No valid fields to update'}, status=400)
            
            collection.update_one({'username': username}, {'$set': updated_values})
            
            return JsonResponse({'message': 'Profile updated successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def get_profile(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')

            if not username:
                return JsonResponse({'error': 'Username required'}, status=400)

            user = get_user_collection().find_one({'username': username})

            if not user:
                user = get_admin_collection().find_one({'username': username})

            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

            return JsonResponse({
                'username': user['username'],
                'age': user.get('age', ''),
                'sex': user.get('sex', ''),
                'height': user.get('height', ''),
                'weight': user.get('weight', ''),
            }, status=200)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def save_sleep_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            sleep_data = data.get('sleep_data')
            date = data.get('date')
            sleepHours = data.get('sleepHours')

            if not username or not date or  sleepHours is None:
                return JsonResponse({'error': 'Username, date, and sleep hours required'}, status=400)

            try:
                parsed_date = datetime.strptime(date, '%Y-%m-%d')
            except ValueError:
                return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD'}, status=400)

            day_name = parsed_date.strftime('%A')
            collection = get_user_collection()
            user = collection.find_one({'username': username})

            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

            update_field = f"sleep_data.{day_name}.{date}"

            collection.update_one({'username': username}, {'$set': {update_field: sleepHours}})
            
            return JsonResponse({'message': 'Sleep data saved successfully', "day": day_name, "date": date, "sleepHours": sleepHours}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def get_sleep_data(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        username = request.GET.get('username')
        if not username:
            return JsonResponse({'error': 'Username required'}, status=400)

        collection = get_user_collection()
        user = collection.find_one({'username': username})

        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)

        sleep_data = user.get('sleep_data', {})
        formatted_sleep_data = []
        
        for day_name, dates_dict, in sleep_data.items():
            if isinstance(dates_dict, dict):
                for date, hours in dates_dict.items():
                    formatted_sleep_data.append({'day': day_name, 'date': date, 'sleepHours': hours})
        formatted_sleep_data.sort(key=lambda entry: entry['date'])            
        return JsonResponse({'sleep_data': formatted_sleep_data}, status=200)

    except Exception as e:
        return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

def get_sleep_range(age):
    if 13 <= age <= 17:
        return 8, 10
    elif 18 <= age <= 60:
        return 7, None
    elif 61 <= age <= 64:
        return 7, 9
    elif age >= 65:
        return 7, 8
    else:
        return None, None

@csrf_exempt
def generate_recommendation(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)
        username = data.get('username')

        if not username:
            return JsonResponse({'error': 'Username required'}, status=400)

        collection = get_user_collection()
        user = collection.find_one({'username': username})

        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)

        age = user.get('age')
        if age is None:
            return JsonResponse({'error': 'Age information is required to generate recommendations'}, status=400)
        
        try:
            age = int(age)
        except ValueError:
            return JsonResponse({'error': 'Invalid age format. Age must be a number'}, status=400)

        sleep_entries = user.get('sleep_data', [])

        if not sleep_entries:
            return JsonResponse({'error': 'No sleep data available to generate recommendations'}, status=404)
        
        entries = []
        for day_name, date in sleep_entries.items():
            if isinstance(date, dict):
                for date_str, hours in date.items():
                    entries.append({'day': day_name, 'date': date_str, 'sleepHours': hours})
        entries.sort(key=lambda entry: entry['date'])
        week = entries[-7:]
       
        hours = []
        for entry in week:
            sleepHours = entry.get('sleepHours')
            if sleepHours is not None:
                try:
                    hours.append(float(sleepHours))
                except ValueError:
                    continue
        if not hours:
            return JsonResponse({'error': 'No valid sleep hours found in the last week'}, status=404)

        avg_sleep = sum(hours) / len(hours)

        min_sleep, max_sleep = get_sleep_range(age)

        if min_sleep is None and max_sleep is None:
            return JsonResponse({'error': 'No sleep recommendations available for this age'}, status=400)
        
        if max_sleep is None:
            if avg_sleep < min_sleep:
                recommendation = f"Based on your average sleep of {avg_sleep:.1f} hours, we recommend aiming for at least {min_sleep} hours of sleep per night."
            else:
                recommendation = f"Your average sleep of {avg_sleep:.1f} hours meets the recommended minimum of {min_sleep} hours. Keep it up!"

        else:
                if avg_sleep < min_sleep:
                    recommendation = f"Based on your average sleep of {avg_sleep:.1f} hours, we recommend aiming for at least {min_sleep} hours of sleep per night."
                elif avg_sleep > max_sleep:
                    recommendation = f"Based on your average sleep of {avg_sleep:.1f} hours, we recommend aiming for no more than {max_sleep} hours of sleep per night."
                else:
                    recommendation = f"Your average sleep of {avg_sleep:.1f} hours is within the recommended range of {min_sleep}-{max_sleep} hours. Great job!"
        return JsonResponse({'recommendation': recommendation, "avg_sleep": avg_sleep, "entries_used": len(week)}, status=200)            


    except Exception as e:
        return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)