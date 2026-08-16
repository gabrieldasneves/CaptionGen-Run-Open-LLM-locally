# front

React app for CaptionGen. Shows the UI, generates image captions in the browser, and calls the backend APIs for translation and audio.

Part of [CaptionGen](../README.md).

## What it does

- Image input by URL, upload, or drag and drop
- Caption generation in the browser (no server needed for this step)
- Language selection
- Shows caption, translation, and plays audio

## Stack

- React 19
- Vite
- `@huggingface/transformers` (WASM)

## Model

| Step | Model | Where |
|------|-------|-------|
| Caption | `Xenova/vit-gpt2-image-captioning` | Browser |

## Run

From the project root (recommended):

```bash
docker compose up --build
```

Open http://localhost:5173

Or run only the frontend:

```bash
npm install
npm run dev
```

The backends must be running on `localhost:3000` and `localhost:5001`. See [server_node](../server_node/README.md) and [server_python](../server_python/README.md).

## Main files

```
src/
├── App.jsx                          # Main UI and flow
├── models/
│   ├── ImgCaptioner.js              # Browser caption model
│   └── api.js                       # Calls to backend APIs
└── components/
    ├── atoms/
    └── molecules/
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Notes

- Caption model downloads in the browser on first use
- Backend URLs are hardcoded in `src/models/api.js`
- CORS on the Node server allows `http://localhost:5173`
