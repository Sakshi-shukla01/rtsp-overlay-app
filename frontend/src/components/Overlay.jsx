import React, { useState } from "react";
import { Rnd } from "react-rnd";

const Overlay = ({ overlay, onUpdate, onDelete }) => {
  const { type, content, position, size } = overlay;

  const [pos, setPos] = useState(position);
  const [s, setS] = useState(size);

  return (
    <Rnd
      size={s}
      position={pos}
      bounds="parent"
      onDragStop={(e, d) => {
        const newPos = { x: d.x, y: d.y };
        setPos(newPos);
        onUpdate({ position: newPos });
      }}
      onResizeStop={(e, direction, ref, delta, newPos) => {
        const newSize = {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        };
        setS(newSize);
        setPos(newPos);
        onUpdate({ size: newSize, position: newPos });
      }}
      style={{
        zIndex: 20,
        borderRadius: "8px",
        overflow: "hidden",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
        border: "1.5px dashed #00e5ff",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          height: "26px",
          background: "#00e5ff",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
          fontSize: "12px",
          fontWeight: "bold",
          cursor: "move",
        }}
      >
        {type.toUpperCase()} OVERLAY

        <button
          onClick={onDelete}
          title="Delete Overlay"
          style={{
            background: "#ff1744",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            fontSize: "12px",
            cursor: "pointer",
            lineHeight: "18px",
          }}
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div
        style={{
          width: "100%",
          height: "calc(100% - 26px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "6px",
        }}
      >
        {type === "text" ? (
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {content}
          </div>
        ) : (
          <img
            src={content}
            alt="overlay"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </Rnd>
  );
};

export default Overlay;
