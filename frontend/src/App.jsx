import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import Overlay from "./components/Overlay";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:5000/overlays";
const API_KEY = "supersecretkey123";

function App() {
  const videoRef = useRef(null);
  const [overlays, setOverlays] = useState([]);
  const [newText, setNewText] = useState("");
  const [newImage, setNewImage] = useState("");
  const [streamUrl, setStreamUrl] = useState(
    "http://127.0.0.1:5000/hls/stream.m3u8"
  );
  const [started, setStarted] = useState(false);

  const fetchOverlays = async () => {
    const res = await axios.get(API_URL, {
      headers: { "x-api-key": API_KEY },
    });
    if (res.data.success) setOverlays(res.data.data);
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  const startStream = () => {
    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
    }

    video.play();
    setStarted(true);
  };

  const addOverlay = async (type, content) => {
    if (!content) return;
    await axios.post(
      API_URL,
      {
        type,
        content,
        position: { x: 50, y: 50 },
        size: { width: 160, height: 60 },
      },
      { headers: { "x-api-key": API_KEY } }
    );
    fetchOverlays();
    setNewText("");
    setNewImage("");
  };

  const updateOverlay = async (id, data) => {
    await axios.put(`${API_URL}/${id}`, data, {
      headers: { "x-api-key": API_KEY },
    });
  };

  const deleteOverlay = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { "x-api-key": API_KEY },
    });
    fetchOverlays();
  };

  return (
    <div className="app">
      <header className="header">RTSP Livestream Overlay App</header>

      <div className="main">
        <div className="video-card">
          <div className="video-container">
            <video ref={videoRef} controls />

            {!started && (
              <button className="play-btn" onClick={startStream}>
                ▶ Play Stream
              </button>
            )}

            {overlays.map((o) => (
              <Overlay
                key={o._id}
                overlay={o}
                onUpdate={(data) => updateOverlay(o._id, data)}
                onDelete={() => deleteOverlay(o._id)}
              />
            ))}
          </div>
        </div>

        <div className="control-card">
          <h3>Stream Settings</h3>
          <input
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="Enter RTSP / HLS URL"
          />

          <h3>Add Overlay</h3>
          <input
            placeholder="Text overlay"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={() => addOverlay("text", newText)}>
            Add Text
          </button>

          <input
            placeholder="Image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
          <button onClick={() => addOverlay("image", newImage)}>
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
