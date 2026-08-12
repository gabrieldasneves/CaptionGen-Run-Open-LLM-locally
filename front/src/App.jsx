import "./App.css";
import { useState } from "react";
import { ButtonSpecular } from "./components/atoms/button-specular";
import { Loader } from "./components/atoms/loader";
import { ImageUploadPreview } from "./components/molecules/image-upload-preview";
import { generateCaption, translate } from "./models/api";
import { useRef, useEffect } from "react";
import { convertToAudio } from "./models/api";

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSource, setAudioSource] = useState(null);
  const [caption, setCaption] = useState(null);
  const [captionTranslated, setCaptionTranslated] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState("por_Latn");
  const captionAudio = useRef();

  async function addCaption() {
    if (!imgSrc) return;

    setIsLoading(true);
    setAudioSource(null);

    try {
      const caption = await generateCaption(imgSrc);
      setCaption(caption);
      const captionTranslatedResult = await translate(caption, targetLanguage);
      setCaptionTranslated(captionTranslatedResult[0].translation_text);
      const audioEndpoint = await convertToAudio(captionTranslatedResult);
      const audioUrl = `http://localhost:5001${audioEndpoint[0].url}`;

      setAudioSource(audioUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (captionAudio.current && audioSource) {
      captionAudio.current.pause();
      captionAudio.current.load();
      captionAudio.current.play();
    }
  }, [audioSource]);

  function handleUrlChange(e) {
    setImgSrc(e.target.value || null);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>IMAGE CAPTION GENERATOR</h1>
        <p className="app-subtitle">
          Paste an image URL, upload a file, or drag and drop an image
        </p>
      </header>

      <form className="url-form" onSubmit={(e) => e.preventDefault()}>
        <div className="language-container">
          <p className="result-subtitle">Choose the language</p>
          <select
            className="language-input"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="por_Latn">Portuguese</option>
            <option value="eng_Latn">English</option>
            <option value="spa_Latn">Spanish</option>
            <option value="fra_Latn">French</option>
            <option value="deu_Latn">German</option>
            <option value="ita_Latn">Italian</option>
            <option value="jpn_Jpan">Japanese</option>
            <option value="kor_Hang">Korean</option>
            <option value="zho_Hans">Chinese</option>
            <option value="rus_Cyrl">Russian</option>
          </select>
        </div>

        <input
          type="url"
          className="url-input"
          placeholder="Enter the image URL"
          value={imgSrc?.startsWith("blob:") ? "" : (imgSrc ?? "")}
          onChange={handleUrlChange}
        />
        <ButtonSpecular
          type="submit"
          size="md"
          radius={10}
          textColor="#ffffff"
          lineColor="#ffffff"
          baseColor="#280B0F"
          disabled={!imgSrc}
          onClick={addCaption}
          className="generate-btn"
        >
          Generate
        </ButtonSpecular>
      </form>

      <section className="result">
        <ImageUploadPreview src={imgSrc} onChange={setImgSrc} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className="result-subtitle">{caption}</p>
            <p className="result-subtitle">{captionTranslated}</p>
            <audio controls ref={captionAudio} src={audioSource ?? undefined} />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
