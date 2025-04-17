import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message manquant dans la requête.' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "Tu es Léa, l'experte skincare de la marque Byeol. Tu réponds avec bienveillance et clarté aux questions sur les patchs anti-boutons, la livraison et les retours.",
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const response = completion.data.choices[0].message.content;
    res.status(200).json({ response });
  } catch (error) {
    console.error('❌ Erreur OpenAI :', error);
    res.status(500).json({ error: error.message || 'Erreur OpenAI' });
  }
}
