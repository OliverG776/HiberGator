import django
import os
from pymongo import MongoClient

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HiberGator.settings')
django.setup()

try:
    client = MongoClient('mongodb+srv://<username>:<Password>@hibergator.8ngplxl.mongodb.net/')
    db = client['Sleep_Tracker']
    collection = db['test_collection']

    test_doc = {"name": "Colby", "status": "Connected!"}
    result = collection.insert_one(test_doc)

    print(f"Inserted document with id: {result.inserted_id}")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
