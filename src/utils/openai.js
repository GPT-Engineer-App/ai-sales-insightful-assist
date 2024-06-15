import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || 'your-default-api-key',
});

const openai = new OpenAIApi(configuration);

export const generateAnalysis = async (text) => {
  if (!configuration.apiKey) {
    console.error('OpenAI API key is not set.');
    return 'Error: OpenAI API key is not set.';
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the following text and provide a detailed report:\n\n${text}`,
      max_tokens: 500,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(`Error generating analysis: ${error}`);
    return 'Error generating analysis';
  }
};