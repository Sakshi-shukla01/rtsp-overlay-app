import subprocess
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HLS_DIR = os.path.join(BASE_DIR, "output")

def start_hls(rtsp_url):
    os.makedirs(HLS_DIR, exist_ok=True)

    command = [
    "ffmpeg",
    "-fflags", "nobuffer",
    "-flags", "low_delay",
    "-i", rtsp_url,
    "-c:v", "libx264",
    "-preset", "ultrafast",
    "-tune", "zerolatency",
    "-g", "25",
    "-sc_threshold", "0",
    "-hls_time", "1",
    "-hls_list_size", "3",
    "-hls_flags", "delete_segments+append_list",
    "-hls_allow_cache", "0",
    os.path.join(HLS_DIR, "stream.m3u8")
]


    print("Starting FFmpeg HLS stream...")
    subprocess.Popen(command)
