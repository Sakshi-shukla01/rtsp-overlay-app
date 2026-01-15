import axios from "axios";

// API key must match your Flask SECRET_KEY
const API_KEY = "supersecretkey123";

// Create an axios instance with base URL and headers
const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

// Get all overlays
export const getOverlays = async () => {
  return api.get("/overlays");
};

// Create a new overlay
export const createOverlay = async (data) => {
  return api.post("/overlays", data);
};

// Update an existing overlay by ID
export const updateOverlay = async (id, data) => {
  return api.put(`/overlays/${id}`, data);
};

// Delete an overlay by ID
export const deleteOverlay = async (id) => {
  return api.delete(`/overlays/${id}`);
};
