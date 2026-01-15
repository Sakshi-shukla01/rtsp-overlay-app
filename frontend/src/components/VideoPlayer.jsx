import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ streamUrl, children }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch((err) => console.error("Play error:", err));
  };

  useEffect(() => {
    let hls;
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
    }

    return () => hls && hls.destroy();
  }, [streamUrl]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "900px",
        aspectRatio: "16 / 9",
        background: "#000",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
      }}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        controls
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* PLAY OVERLAY */}
      {!playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handlePlay}
            style={{
              padding: "18px 40px",
              fontSize: "20px",
              fontWeight: "700",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              background: "#00e5ff",
              color: "#000",
              boxShadow: "0 0 35px rgba(0,229,255,0.7)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            ▶ Play Live Stream
          </button>
        </div>
      )}

      {/* 🔥 OVERLAYS WILL RENDER HERE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default VideoPlayer;
