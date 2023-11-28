const { Configuration, OpenAIApi} = require('openai');
const config = new Configuration({ apiKey: '' });  //put your API here
const openai = new OpenAIApi(config);

export async function sendMsgToOpenAI(message) {
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0
    });

    return res.data.choices[0].text;
}