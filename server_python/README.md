# server_python

Python API that converts text to speech audio files.

Part of [CaptionGen](../README.md).

## What it does

Receives translated text from the frontend, generates a WAV file with Bark, and returns a URL to download it.

## Stack

- Python 3.13+
- Flask
- Transformers
- Bark (TTS)
- uv (dependency manager)

## Model

| Step | Model |
|------|-------|
| Text-to-speech | `suno/bark-small` |

Voice preset: `v2/pt_speaker_8`

## Run

From the project root (recommended):

```bash
docker compose up --build
```

Or run only this service:

```bash
docker compose up --build
```

Runs on http://localhost:5001 (host) → 5000 (container)

Without Docker:

```bash
uv sync
uv run flask --app main.py run --host 0.0.0.0 --port 5000
```

Use port 5001 locally if you want to match the frontend config, or update the frontend URL.

## API

### `GET /`

Health check. Returns `Hello, World!`

### `POST /text-to-audio`

```json
{
  "text": "A dog on the beach"
}
```

Response:

```json
[{ "url": "/audio/<uuid>.wav" }]
```

### `GET /audio/<filename>`

Returns the generated WAV file.

## Main files

```
main.py                      # Flask server and routes
models/
├── api.py                   # convert_text_to_audio
└── text_to_audio.py         # Bark model wrapper
utils/
└── __init__.py              # save_audio helper
audio/                       # Generated files (gitignored)
```

## Notes

- Model downloads on first request
- Generated audio files are saved in `audio/` and ignored by git
- Port 5001 on host when using Docker Compose from the project root
