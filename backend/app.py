from flask import Flask, send_from_directory
from flask_cors import CORS
from hls.hls_stream import start_hls
from routes import routes  # import your Blueprint
import threading
import os

app = Flask(__name__)

# Full CORS setup to allow preflight requests from React frontend
CORS(
    app,
    resources={r"/*": {"origins": "*"}},  # allow all origins
    supports_credentials=True,
    allow_headers=["Content-Type", "x-api-key"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# Register routes blueprint
app.register_blueprint(routes)

# HLS setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HLS_DIR = os.path.join(BASE_DIR, "hls", "output")
os.makedirs(HLS_DIR, exist_ok=True)

@app.route("/hls/<path:filename>")
def hls_files(filename):
    return send_from_directory(HLS_DIR, filename)

if __name__ == "__main__":
    RTSP_URL = "rtsp://127.0.0.1:8554/live"
    threading.Thread(target=start_hls, args=(RTSP_URL,), daemon=True).start()
    app.run(host="0.0.0.0", port=5000, debug=True)
