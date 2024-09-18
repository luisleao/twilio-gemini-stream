import 'dotenv/config';
import { Buffer } from 'node:buffer';
import { EventEmitter } from 'events';

class TextToSpeechService extends EventEmitter {
  constructor() {
    super();
    this.nextExpectedIndex = 0;
    this.speechBuffer = {};
  }

  async generate(message) {
    const { partialResponse } = message;

    if (!partialResponse) { return; }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}/stream?output_format=ulaw_8000&optimize_streaming_latency=3`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': process.env.ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
            accept: 'audio/wav',
          },
          body: JSON.stringify({
            model_id: process.env.ELEVENLABS_MODEL_ID,
            text: partialResponse,
          }),
        }
      );
      
      if (response.status === 200) {
        const audioArrayBuffer = await response.arrayBuffer();
        this.emit('speech', Buffer.from(audioArrayBuffer).toString('base64'), message);
      } else {
        console.log('Eleven Labs Error:');
        console.log(response);
      }
    } catch (err) {
      console.error('Error occurred in XI LabsTextToSpeech service');
      console.error(err);
    }
  }
}

export { TextToSpeechService };