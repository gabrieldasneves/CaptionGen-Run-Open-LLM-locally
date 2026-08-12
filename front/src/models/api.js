import ImageCaptioner from "./ImgCaptioner";

async function generateCaption(imgSrc) {
  return ImageCaptioner.generateCaption(imgSrc);
}

async function parseJsonResponse(res, label) {
  if (!res.ok) {
    throw new Error(`${label} failed with status ${res.status}`);
  }

  return res.json();
}

async function translate(caption, targetLanguage) {
  const res = await fetch("http://localhost:3000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ textToBeTranslated: caption, targetLanguage }),
  });

  return parseJsonResponse(res, "Translate");
}

async function convertToAudio(caption) {
  const res = await fetch("http://localhost:5001/text-to-audio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: caption[0]["translation_text"] }),
  });

  return parseJsonResponse(res, "Text to audio");
}

export { generateCaption, translate, convertToAudio };
