import { pipeline } from "@huggingface/transformers";

export default class ImageCaptioner {
  static captioner = null;

  static async getCaptioner() {
    if (!this.captioner) {
      this.captioner = pipeline(
        "image-to-text",
        "Xenova/vit-gpt2-image-captioning",
        {
          dtype: "fp32",
          device: "wasm",
        },
      ).catch((error) => {
        this.captioner = null;
        throw error;
      });
    }

    return this.captioner;
  }

  static async generateCaption(imgSrc) {
    const captioner = await this.getCaptioner();
    const result = await captioner(imgSrc, { do_sample: true });
    return result[0]?.generated_text ?? "";
  }
}
