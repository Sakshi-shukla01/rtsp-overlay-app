# routes.py
from flask import Blueprint, request, jsonify
from models import overlays_collection
from bson.objectid import ObjectId
import os
from functools import wraps  # better for decorators

routes = Blueprint("routes", __name__)
API_KEY = os.getenv("SECRET_KEY", "your_default_api_key")  # Default for dev/testing

# Decorator for simple API key authentication
def require_api_key(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        key = request.headers.get("x-api-key")
        if key != API_KEY:
            return jsonify({"success": False, "error": "Unauthorized"}), 401
        return func(*args, **kwargs)
    return wrapper

# Health check
@routes.route("/", methods=["GET"])
def home():
    return jsonify({"success": True, "message": "Backend is running"}), 200

# GET all overlays
@routes.route("/overlays", methods=["GET"])
@require_api_key
def get_overlays():
    try:
        overlays = list(overlays_collection.find())
        for o in overlays:
            o["_id"] = str(o["_id"])
        return jsonify({"success": True, "data": overlays}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# POST new overlay
@routes.route("/overlays", methods=["POST"])
@require_api_key
def create_overlay():
    try:
        data = request.get_json(force=True)
        required_fields = ["type", "content", "position", "size"]

        # Validate required fields
        if not all(field in data for field in required_fields):
            return jsonify({"success": False, "error": "Missing required fields"}), 400

        # Type validation
        if data["type"] not in ["text", "image"]:
            return jsonify({"success": False, "error": "Invalid overlay type"}), 400

        overlay_id = overlays_collection.insert_one(data).inserted_id
        return jsonify({"success": True, "message": "Overlay added successfully!", "_id": str(overlay_id)}), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# PUT update overlay
@routes.route("/overlays/<id>", methods=["PUT"])
@require_api_key
def update_overlay(id):
    try:
        data = request.get_json(force=True)
        result = overlays_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count == 0:
            return jsonify({"success": False, "error": "Overlay not found"}), 404
        return jsonify({"success": True, "message": "Overlay updated successfully!"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# DELETE overlay
@routes.route("/overlays/<id>", methods=["DELETE"])
@require_api_key
def delete_overlay(id):
    try:
        result = overlays_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"success": False, "error": "Overlay not found"}), 404
        return jsonify({"success": True, "message": "Overlay deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
