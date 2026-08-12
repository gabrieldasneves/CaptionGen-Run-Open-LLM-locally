import os

from scipy.io.wavfile import write

def save_audio(audio, sample_rate, file_id):
    os.makedirs("audio", exist_ok=True)
    path = f"audio/{file_id}.wav"
    audio = audio.numpy().squeeze()
    write(path, rate=sample_rate, data=audio)