# CaptionGen

App that generates image captions, translates them, and reads them out loud. Everything runs on your machine. No paid APIs.

## What it does

```
Image → Caption (browser) → Translation (Node) → Audio (Python) → Play in app
```

## How it works

```
front/  (port 5173)
  React + Vite
  Creates captions in the browser
  Model: Xenova/vit-gpt2-image-captioning

        POST /translate          POST /text-to-audio
              ↓                          ↓

server_node/ (:3000)          server_python/ (:5001)
  Express                       Flask
  Translates text               Text to speech
  Model: Xenova/nllb-200-       Model: suno/bark-small
         distilled-600M
```

## Stack

| Folder           | Tools                                  |
| ---------------- | -------------------------------------- |
| `front/`         | React, Vite, Hugging Face Transformers |
| `server_node/`   | Node.js, Express, Transformers         |
| `server_python/` | Python, Flask, Transformers, Bark      |
| All backends     | Docker                                 |

## Requirements

- Docker and Docker Compose
- About 4 GB free RAM

Models download on first run.

## Run the project

From the project root:

```bash
docker compose up --build
```

Open [http://localhost:5173](http://localhost:5173)

This starts all 3 services: frontend, translation server, and text-to-speech server.

**Run without Docker (frontend only)**

You still need the two backends running in Docker (or locally):

```bash
cd server_node && docker compose up --build
cd server_python && docker compose up --build
cd front && npm install && npm run dev
```

**Use the app**

1. Add an image (URL, upload, or drag and drop)
2. Pick a language
3. Click Generate
4. Wait for the caption, translation, and audio

First run takes longer while models download.

## Project folders

```
CaptionGen/
├── front/           → front/README.md
├── server_node/     → server_node/README.md
├── server_python/   → server_python/README.md
└── README.md
```

## API

**Translate** — `POST http://localhost:3000/translate`

```json
{
  "textToBeTranslated": "a dog on the beach",
  "targetLanguage": "por_Latn"
}
```

Languages in the UI: `por_Latn`, `eng_Latn`, `spa_Latn`, `fra_Latn`, `deu_Latn`, `ita_Latn`, `jpn_Jpan`, `kor_Hang`, `zho_Hans`, `rus_Cyrl`.

**Text to audio** — `POST http://localhost:5001/text-to-audio`

```json
{
  "text": "A dog on the beach"
}
```

Returns:

```json
[{ "url": "/audio/<uuid>.wav" }]
```

## Models

| Step        | Model                              | Where   |
| ----------- | ---------------------------------- | ------- |
| Caption     | `Xenova/vit-gpt2-image-captioning` | Browser |
| Translation | `Xenova/nllb-200-distilled-600M`   | Node    |
| Speech      | `suno/bark-small`                  | Python  |

## Notes

- Images and text stay on your machine (models download from Hugging Face)
- Caption runs in the browser
- Backend URLs are hardcoded for local dev (`localhost:3000`, `localhost:5001`)
- Captions are in English; translation uses `eng_Latn` as source
