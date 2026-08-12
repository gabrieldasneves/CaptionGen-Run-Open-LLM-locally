class Translator {
  static translator = null;

  static async getTranslator() {
    if (!this.translator) {
      const { pipeline } = await await import("@huggingface/transformers");
      this.translator = await pipeline(
        "translation",
        "Xenova/nllb-200-distilled-600M",
        { dtype: "q8" },
      );
    }
    return this.translator;
  }

  static async translate(textToBeTranslated, targetLanguage = 'por_Latn') {
    return this.getTranslator().then((translator) =>
      translator(textToBeTranslated, {
        src_lang: 'eng_Latn',
        tgt_lang: targetLanguage,
      }),
    )
  }
}

exports.Translator = Translator;
