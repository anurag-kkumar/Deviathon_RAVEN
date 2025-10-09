from pymongo import MongoClient
import os

class MongoDB:
    client = None
    database = None

def connect_to_mongo():
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    database_name = os.getenv("DATABASE_NAME", "raven")
    
    MongoDB.client = MongoClient(mongodb_uri)
    MongoDB.database = MongoDB.client[database_name]
    print("✅ Connected to MongoDB successfully")

def get_database():
    if MongoDB.database is None:
        connect_to_mongo()
    return MongoDB.database