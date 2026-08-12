from flask import Flask, request, send_from_directory
from flask_cors import cross_origin
from models.api import convert_text_to_audio
from utils import save_audio

from uuid import uuid4

app = Flask(__name__)

@app.route("/")
@cross_origin()
def hello_world():
    return "Hello, World!"

@app.route("/text-to-audio", methods=["POST"])
@cross_origin()
def text_to_audio():
    text =  request.json["text"]
    audio, sample_rate = convert_text_to_audio(text)
    file_id = str(uuid4())
    save_audio(audio,sample_rate,file_id)
    return [{ "url": f"/audio/{file_id}.wav" }]

@app.route("/audio/<path:audio_file>", methods=["GET"])
@cross_origin()
def get_audio(audio_file):
    return send_from_directory("audio", audio_file)
