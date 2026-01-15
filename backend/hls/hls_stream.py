# hls_stream.py
import subprocess
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HLS_DIR = os.path.join(BASE_DIR, "output")  # You can change to "hls/output" if preferred

def start_hls(rtsp_url):
    os.makedirs(HLS_DIR, exist_ok=True)

    command = [
        "ffmpeg",
        "-rtsp_transport", "tcp",  # ensures RTSP over TCP
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

    # Run FFmpeg in the background
    subprocess.Popen(
        command,
        stdout=subprocess.DEVNULL,  # suppress logs
        stderr=subprocess.STDOUT
    )
