from transformers import AutoProcessor, BarkModel

MODEL_NAME = 'suno/bark-small'


def _create_pipeline():
    processor = AutoProcessor.from_pretrained(MODEL_NAME)
    model = BarkModel.from_pretrained(MODEL_NAME)
    sample_rate = model.generation_config.sample_rate

    def pipe(text):
        model_input = processor(text, voice_preset='v2/pt_speaker_8')
        audio = model.generate(**model_input)
        return audio, sample_rate

    return pipe


class TextToAudio:
    _pipe = None

    @classmethod
    def _get_pipe(cls):
        if cls._pipe is None:
            cls._pipe = _create_pipeline()
        return cls._pipe

    @classmethod
    def convert(cls, text):
        return cls._get_pipe()(text)
