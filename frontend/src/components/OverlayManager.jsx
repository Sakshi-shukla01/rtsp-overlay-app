import React, { useState, useEffect } from "react";
import { getOverlays, createOverlay, updateOverlay, deleteOverlay } from "../api";
import Overlay from "./Overlay";

const OverlayManager = () => {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    type: "text",
    content: "",
    position: { x: 50, y: 50 },
    size: { width: 200, height: 50 },
  });

  // Load overlays on mount
  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const res = await getOverlays();
      if (res.data.success) setOverlays(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newOverlay.content) return alert("Content cannot be empty!");
    try {
      const res = await createOverlay(newOverlay);
      if (res.data.success) {
        fetchOverlays();
        setNewOverlay({ ...newOverlay, content: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteOverlay(id);
      if (res.data.success) fetchOverlays();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateOverlay(id, data);
      fetchOverlays();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Overlays</h2>

      {/* Add overlay form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Text or Image URL"
          value={newOverlay.content}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, content: e.target.value })
          }
          style={{ marginRight: "10px", width: "250px" }}
        />
        <select
          value={newOverlay.type}
          onChange={(e) => setNewOverlay({ ...newOverlay, type: e.target.value })}
          style={{ marginRight: "10px" }}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
        <button onClick={handleAdd}>Add Overlay</button>
      </div>

      {/* Display overlays */}
      <div style={{ position: "relative", width: "800px", height: "450px" }}>
        {overlays.map((o) => (
          <Overlay
            key={o._id}
            overlay={o}
            onUpdate={(data) => handleUpdate(o._id, data)}
            onDelete={() => handleDelete(o._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default OverlayManager;
