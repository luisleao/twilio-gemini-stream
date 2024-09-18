import 'dotenv/config';
import { Buffer } from 'node:buffer';
import { EventEmitter } from 'events';
import {TextToSpeechClient} from '@google-cloud/text-to-speech';


class TextToSpeechService extends EventEmitter {
  constructor() {
    super();
    this.client = new TextToSpeechClient();
    this.nextExpectedIndex = 0;
    this.speechBuffer = {};
  }

  async generate(message) {
    const { partialResponse } = message;

    if (!partialResponse) { return; }

    const request = {
      input: {text: partialResponse},
      voice: {languageCode: 'pt-BR', name: 'pt-BR-Wavenet-A'},
      audioConfig: {audioEncoding: 'MULAW'},
    }

    const [response] = await this.client.synthesizeSpeech(request);

    const audioArrayBuffer = response.audioContent;
    console.log('Google Cloud TTS audioarraybuffer:', audioArrayBuffer);
    this.emit('speech', Buffer.from(audioArrayBuffer).toString('base64'), message);
  } catch (err) {
      console.error('Error Google Cloud TTS service');
      console.error(err);
    }
}

export { TextToSpeechService };