This web application plays a livestream video from an RTSP source and allows users to add, update, move, resize, and delete overlays (text or image) on top of the video in real time.

The application demonstrates:

RTSP livestream playback (via HLS conversion)

Interactive React UI

Flask-based REST APIs

MongoDB data persistence
Frontend will run at http://localhost:3000

Running the Application Locally
Start MongoDB
Start Flask backend (python app.py)
Start RTSP → HLS conversion (FFmpeg)
Start React frontend (npm start)
Open browser at http://localhost:3000

How to Provide or Change the RTSP URL
Step 1: Get an RTSP URL
You can use:
RTSP.me
Any IP camera
Any RTSP-compatible streaming source

rtsp://127.0.0.1:8554/live

Use the HLS URL in frontend
http://127.0.0.1:5000/hls/stream.m3u8


Use the HLS URL in frontend
http://127.0.0.1:5000/hls/stream.m3u8


API Documentation (Overlay CRUD)
Base URL
http://127.0.0.1:5000


->Playing the Livestream
Start RTSP → HLS conversion
Open frontend in browser
Click Play Live Stream
Use Play / Pause / Volume controls

->Adding Overlays
Add Text Overlay
Enter text in input field
Click Add Text
Text appears over video

Add Image Overlay
Enter image URL (PNG/JPG)
Click Add Image
Image appears over video

Updating Overlays
Drag overlay to change position
Resize overlay using corners
Changes are saved automatically via API

Deleting Overlays
Click ✕ button on overlay
Overlay is removed immediately