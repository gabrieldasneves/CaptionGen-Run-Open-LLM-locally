const express = require("express");
const { Translator } = require("./models/translator");
const app = express();
const cors = require("cors");
const { translate } = require("./models/api");
Translator.getTranslator();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/translate", async (req, res) => {
  const { textToBeTranslated, targetLanguage } = req.body;
  const translatedText = await translate(textToBeTranslated, targetLanguage);
  res.send(translatedText);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
