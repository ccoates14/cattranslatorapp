import axios from 'axios';
import * as Speech from 'expo-speech';

export default async function handleTranslate(duration, setResponse) {
    const API_KEY = ''; //place key here
    const GROK_API_URL = "https://api.x.ai/v1/chat/completions";

    let catAnger = ''

    switch (duration) {
        case duration < 300:
            catAnger = 'low or non-existent, keep answer short'
            break;
        case duration < 600:
            catAnger = 'medium, keep answer medium length'
            break;
        default:
            catAnger = 'high'
            break;
    }
  
    const requestData = {
        messages: [
          {
            role: "system",
            content: "You are my cat, always needy, always loud, always annoying, sometimes you have very weird answers, current anger level: " + catAnger
          },
          {
            role: "user",
            content: "Why do you keep meowing? What do you want?"
          }
        ],
        model: "grok-beta",
        stream: false,
        temperature: 0
      };
      

    const response = await axios.post(GROK_API_URL, requestData, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
    });

    const message = response.data['choices'][0]['message']['content']

    setResponse(message);
    Speech.speak(message);
}