
# RTSP Livestream Overlay Web Application

This web application plays a **livestream video from an RTSP source** and allows users to **add, update, move, resize, and delete overlays** (text or image) on top of the video in real time.

The application demonstrates:

- **RTSP livestream playback** (via HLS conversion using FFmpeg)  
- **Interactive React UI** for overlay management  
- **Flask-based REST APIs** for CRUD operations  
- **MongoDB data persistence** for overlay storage  

---

## Table of Contents

1. [Features](#features)  
2. [Project Structure](#project-structure)  
3. [Running the Application Locally](#running-the-application-locally)  
4. [Providing or Changing the RTSP URL](#providing-or-changing-the-rtsp-url)  
5. [Playing RTSP in VLC](#playing-rtsp-in-vlc)  
6. [API Documentation](#api-documentation-overlay-crud)  
7. [Using the Application](#using-the-application)  

---

## Features

- Play RTSP livestream via **HLS**  
- Add **text and image overlays**  
- Drag and resize overlays interactively  
- Automatic saving of overlay updates to **MongoDB**  
- Delete overlays with a single click  

---

## Project Structure

```

rtsp-livestream-overlay-app/
│
├── backend/
│   ├── app.py                # Flask backend
│   ├── routes.py             # API routes for overlay CRUD
│   ├── models.py             # MongoDB models
│   └── .env                  # Environment variables (DO NOT COMMIT)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoPlayer.jsx
│   │   │   └── Overlay.jsx
│   └── package.json
│
└── README.md

````

---

## Running the Application Locally

1. **Start MongoDB**  
   Make sure MongoDB is running on your system.  

2. **Start Flask backend**  
   ```bash
   cd backend
   python app.py
````

3. **Start RTSP → HLS conversion using FFmpeg**

   ```bash
   ffmpeg -i rtsp://YOUR_RTSP_URL \
-c:v copy -c:a aac \
-f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments \
backend/hls/stream.m3u8
   ```

4. **Start React frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Providing or Changing the RTSP URL

1. **Get an RTSP URL** from:

   * RTSP.me
   * Any IP camera
   * Any RTSP-compatible streaming source

Example RTSP URL:

```
rtsp://127.0.0.1:8554/live
```

2. **Use the HLS URL in frontend**:

```
http://127.0.0.1:5000/hls/stream.m3u8
```

---

## Playing RTSP in VLC

You can also play your RTSP livestream directly in **VLC Media Player**:

1. Open **VLC Media Player**
2. Go to **Media → Open Network Stream** (or press `Ctrl+N`)
3. Enter your RTSP URL, for example:

```
rtsp://127.0.0.1:8554/live
```

4. Click **Play**
5. VLC will start streaming the live video in real-time

---

## API Documentation (Overlay CRUD)

**Base URL:**

```
http://127.0.0.1:5000
```

### Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /overlays     | Fetch all overlays         |
| POST   | /overlays     | Add a new overlay          |
| PUT    | /overlays/:id | Update an existing overlay |
| DELETE | /overlays/:id | Delete an overlay          |

---

## Using the Application

### Playing the Livestream

1. Start RTSP → HLS conversion
2. Open frontend in browser
3. Click **Play Live Stream**
4. Use **Play / Pause / Volume controls**

### Adding Overlays

* **Text Overlay**:

  1. Enter text in input field
  2. Click **Add Text**
  3. Text appears over video

* **Image Overlay**:

  1. Enter image URL (PNG/JPG)
  2. Click **Add Image**
  3. Image appears over video

### Updating Overlays

* Drag overlay to change position
* Resize overlay using corners
* Changes are saved automatically via API

### Deleting Overlays

* Click ✕ button on overlay
* Overlay is removed immediately

video link-https://drive.google.com/file/d/1HsIYNTHGKY9_wemxCspggcvws8NQuJhc/view?usp=sharing

```

