import 'colors';
import { EventEmitter } from 'events';
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService extends EventEmitter {
  constructor() {
    super();
    this.genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.gemini = this.genai.getGenerativeModel({ model: 'gemini-1.5-flash'});
    console.log('Gemini instance:', this.gemini)
    this.chat = this.gemini.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Oi!" }],
      },
      {
        role: "model",
        parts: [{ text: "Oi, tudo bem? Como posso te ajudar hoje?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
}

  async completion(message) {
 
    let buffer = '';
    let textOrder = 0;

    const context = `Você é uma assistente pessoal que ajuda com perguntas gerais.
                    Gere respostas em frases curtas, mas sem omitir informações importantes.
                    Não inclua nenhuma formatação ou markdown em suas respostas.

              `
    const prompt = context + message.text
    const response = await this.chat.sendMessageStream(prompt)

    let text = '';
    for await (const chunk of response.stream) {
      const chunkText = chunk.text();
      console.log('Partial Gemini answer:', chunkText);
      text += chunkText;
    }

    if (text.length !== 0) {
      const rand = Math.floor(Math.random() * 1000) + 1;
      console.log('Final Gemini answer id:', rand)
      console.log('Final Gemini answer:', text)
      this.emit('geminireply', {
        partialResponse: text,
        partialOrder:0,
         id:'geminianswer' + rand
      })
    }
  }
}

export { GeminiService };