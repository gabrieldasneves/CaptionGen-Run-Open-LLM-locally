# server_node

Node.js API that translates image captions to other languages.

Part of [CaptionGen](../README.md).

## What it does

Receives English text from the frontend and returns a translation using a local Hugging Face model.

## Stack

- Node.js 22
- Express
- `@huggingface/transformers`

## Model

| Step | Model |
|------|-------|
| Translation | `Xenova/nllb-200-distilled-600M` |

Source language is fixed to `eng_Latn`.

## Run

From the project root (recommended):

```bash
docker compose up --build
```

Or run only this service:

```bash
docker compose up --build
```

Runs on http://localhost:3000

Without Docker:

```bash
npm install
node index.js
```

## API

### `GET /`

Health check. Returns `Hello World`.

### `POST /translate`

```json
{
  "textToBeTranslated": "a dog on the beach",
  "targetLanguage": "por_Latn"
}
```

Supported target languages in the UI:

`por_Latn`, `eng_Latn`, `spa_Latn`, `fra_Latn`, `deu_Latn`, `ita_Latn`, `jpn_Jpan`, `kor_Hang`, `zho_Hans`, `rus_Cyrl`

## Main files

```
index.js                 # Express server and routes
models/
├── translator.js        # NLLB model wrapper
└── api.js               # translate function
```

## Notes

- Model downloads on first request
- CORS allows requests from `http://localhost:5173`
- Port 3000
