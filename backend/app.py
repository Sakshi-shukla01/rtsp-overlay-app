from flask import Flask, send_from_directory
from flask_cors import CORS
from hls.hls_stream import start_hls
from routes import routes
import threading
import os

app = Flask(__name__)

CORS(app, supports_credentials=True)

app.register_blueprint(routes)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HLS_DIR = os.path.join(BASE_DIR, "hls", "output")

@app.route("/hls/<path:filename>")
def hls_files(filename):
    return send_from_directory(HLS_DIR, filename)

if __name__ == "__main__":
    RTSP_URL = "rtsp://127.0.0.1:8554/live"

    threading.Thread(
        target=start_hls,
        args=(RTSP_URL,),
        daemon=True
    ).start()

    app.run(host="0.0.0.0", port=5000, debug=True)
