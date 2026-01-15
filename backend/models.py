# models.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get MongoDB URI
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI not found in .env")

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)

# Database and collection
db = client["rtsp_overlays"]  # Database name
overlays_collection = db["overlays"]  # Collection for overlay data
