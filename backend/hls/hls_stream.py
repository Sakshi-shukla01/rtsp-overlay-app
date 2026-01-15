import subprocess
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HLS_DIR = os.path.join(BASE_DIR, "output")

def start_hls(rtsp_url):
    os.makedirs(HLS_DIR, exist_ok=True)

    command = [
        "ffmpeg",
        "-i", rtsp_url,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-g", "50",
        "-sc_threshold", "0",
        "-hls_time", "2",
        "-hls_list_size", "5",
        "-hls_flags", "delete_segments",
        os.path.join(HLS_DIR, "stream.m3u8")
    ]

    print("Starting FFmpeg HLS stream...")
    subprocess.Popen(command)
