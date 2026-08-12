const { Translator } = require("./translator");

async function translate(textToBeTranslated, targetLanguage) {
  return Translator.translate(textToBeTranslated, targetLanguage)
}

exports.translate = translate;
